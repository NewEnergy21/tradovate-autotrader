const { OrdStatus, TdData } = require("../utils/enum.js");
const { last, yellow, latestTimestamp } = require("../utils/helpers.js");
const onEvent = require("../handlers/onEvent.js");

/**
 * @class Strategy
 * @description General template for a strategy, helper functions are abstracted
 * Recommend implementing overrides for `workingNoPos`, `workingNetPos`, `inactiveNoPos`, `inactiveNetPos`, `trimPosition`, and `alpha`.
 * Please DO NOT OVERRIDE other functions in your subclass.
 * 
 * Calls the `update` function on every message received, determines how to handle it, and determines our current state (hesitating, or free to act
 * and manage orders).
 * 
 * Single-instance class for order management, mainly used to determine the state of a hesitation as 
 * the system waits for pending or critical asynchronous information after an API endpoint request.
 * 
 * Typically, a request (e.g., `socket.order.placeOrder()`) will receive a near-immediate response (e.g., `200: { orderId: 123456 }`),
 * but additional information is required for followthrough (e.g., `e{props<order>,entity<orderStatus>}`). Other messages (e.g., `quotes`
 * or other `events`) may be received before the followthrough is completely finished. The `Singleton` attempts to keep track of these 
 * criteria and returns a boolean `isHesitant = true` if the system should wait for additional information, and `isHesitant = false` if 
 * all the critical information is available and we are at liberty to place new orders.
 * 
 * Although we enforce that API requests are `async/await`, ***because*** they are `async`, it's still possible that multiple calls are 
 * received in an overlapping `await` time period. To counter this, prior to entering the `await`, the `pending` array (hacky, but effective)
 * is used to ensure we are not `pending` an `await` in a parallel `async` call. It's a bit of a race condition manager.
 * @param {Object} params
 * @param {Object} params.socket Tradovate WebSocket class
 * @param {number} params.symbol Fixed symbol for trading against, typically an integery
 * @param {string} params.accountSpec The Tradovate account specification, notionally a string, e.g. DEMO123456 or ABC123456
 * @param {number} params.accountId The Tradovate account id, typically a number like 123456
 */
class Strategy {
    constructor({socket, symbol, accountSpec, accountId}) {
        
        let now = Date.now();
        // Initialize the `state` object, with some internal parameters for tracking market data
        this.state = {
            doms: {},
            histograms: {},
            bars: [],
            ticks: [],
            quotes: [],
			volumes: [],
            barSubscription: {},
            tickSubscription: {},
			volumeSubscription: {},
            ...arguments?.[0]
        };
        
        // State array for specifically pending (i.e., awaiting initial Promise.then()) `async` information
		this.pending = false;
		
		// State object for state arrays for each critical order management endpoint
		this.hesitations = {

			// Important, stateful `order` endpoints
			cancelOrder: [],
			liquidatePosition: [],
			modifyOrder: [],
			placeOCO: [],
			placeOrder: [],
			placeOSO: [],

			// Unimportant `order` endpoints
			orderDependents: [],
			orderItem: [],
			orderItems: [],
			orderLDependents: [],
			orderList: []

		};

		// If an error is encountered, aims to kill the iteration
		this.killed = false;

        // Ensure that the socket is accessible to the top level strategy
        this.socket = socket;

    }

    /**
     * update
     * @description **DO NOT OVERRIDE** Inspired by the Tradovate spec, takes a reference to the current `state`, the `event` string, and the event `payload`
     * and calls subhandlers to handle the `payload`, update the alpha / signal if appropriate in the case of a data `event`, and 
     * further manage orders and perform any garbage-collection type housekeeping optimizations
     * 
     * Note: Tradovate defines this in the `next(state, [event, payload])` syntax
     * 
     * @param {Object} params
     * @param {Object} params.state A reference to `Strategy.state`, which can (and will) be modified by the event handlers
     * @param {String} params.event The event type from the WebSocket message, e.g., histograms, doms, usersync, props
     * @param {Object} params.payload The actual message body
     */
    async update({state, event, payload}) {
        
		let start = Date.now();

        // Update the state based on event handling
        this.state = onEvent({state, event, payload});
        
        // If we have a market data event
        if (event in TdData) {
            
            // Market data is the impetus to update update our signal / alpha
            this.alpha();

            // Because market data changes our signal (and thus the reason for a new order), we only worry
            // about hesitations from the market data socket. In a normal market, the pace of order changes
            // will be the only driving factor for how we update belief and orders. 
            // This should mitigate the cross-flow of market data messages and event messages which mangles
            // the order management logic and can dangerously impair the integrity of the asynchronous flow
            // if messages arrive simultaneously.
            let hesitation = this.isHesitant();
			let allowHours = this.isAllowedTradingTime();
			let allowOrders = this.state?.allowOrders;
			let warmup = this.state?.warmup;

			// Manage any defined order logic, and enforce `await` to ensure that the `hesitation` can 
            // appropriately accommodate any `socket.order` API endpoint requests
            if (!hesitation && !this.killed && allowHours && allowOrders && Date.now() > warmup) {
                await this.manageOrders();
            }

            // Perform any housekeeping to purge old quotes, bars, and ticks to keep our alpha calculations
            // efficient
            this.housekeeping();
        
        }

		if (Date.now() - start > 5) console.warn(`WARNING: Slow performance, ${Date.now() - start}ms`);
		
    }

    /**
     * alpha
     * @description **IMPLEMENT OVERRIDE** Takes in the current state, attempts to infer meaning from the current market data, and determine order signals 
     * This function is intended to be extended in the child class, but deliberately has no definition in the parent class
     * in order to ensure purity of logic
     */
    alpha() {

    }


    /**
     * manageOrders
     * @description **DO NOT OVERRIDE** Takes in the current state, attempts to infer meaning from the current 
     * order state and custom parameters, and act on order signals
     * The assumption is that we only have ONE contract to deal with, so the navigational logic
     * for determining order state is lightweight
     */
    async manageOrders() {
        
        let { orders, orderVersions, orderStrategies, orderStrategyLinks, orderStrategyTypes, positions, commands, commandReports, executionReports } = this.state;
        let { maxPosition } = this.state;

        // We need a way to determine the current STATE of orders, for all independent or strategy-linked orders.
        // In theory, if a strategy links orders, if the strategy is working, at least one of the orders should be in a working state
        // As an edge case, if a bracket is filled, we may get the fill for one order before the cancellation is issued for the other(s), and thus still be working.
        let workingOrders = this.workingOrders();

        // Because we only operate ONE contract at a time, the latest timestamp observed in the `positions` array should represent the latest state of our position
		// TODO: At all times, because of `insertionUpdate`, the ***1*** position in `positions` should be our current position
        let { netPos } = latestTimestamp(positions);
        
        if (Math.abs(netPos) > Math.abs(maxPosition)) {
            // We are in a risky position which is a bit overleveraged, so we need to trim our position
            await this.trimPosition(netPos);

        } else if (workingOrders?.length && netPos) {
            // We have (a) working order(s), and are currently holding a net position
            // e.g., +1 net position, working sell order (or working bracket TP & SL)
            await this.workingNetPos(workingOrders);

        } else if (workingOrders?.length && !netPos) {
            // We have (a) working order(s), but are not holding a net position
            // e.g., 0 net position, working buy order to enter (or multiple buy orders in a grid)
            await this.workingNoPos(workingOrders);

        } else if (!(workingOrders?.length) && netPos) {
            // We have no working orders, but are holding a net position
            // e.g., +1 net position, no active sell orders due to market close auto-cancellation of unfilled orders
            await this.inactiveNetPos();

        } else if (!(workingOrders?.length) && !netPos) {
			// We have no working orders, and are not holding a net position
            // e.g., 0 net position, no working orders and generally flat on market, waiting for a signal
            await this.inactiveNoPos();

        }
    
    }

    /**
     * housekeeping
     * @description Custom efficiency function, attempts to optimize search and filtering by splicing out
     * old data and dead orders.
     * 
     * Note: Makes use of the `state.maxMilliseconds` field, so ensure they are defined on the `Strategy` class.
     * 
     */
    housekeeping() {

        let { maxMilliseconds, maxIndex } = this.state;
        let minimumTimestamp = this.timestamp() - maxMilliseconds;
        let minimumISOString = new Date(minimumTimestamp).toISOString();
        
        // Custom market data arrays
        let { quotes, ticks, bars, volumes } = this.state;

        // Clear out stale quotes that are older than the minimum timestamp
        while (quotes?.length && quotes[0].timestamp < minimumISOString) {
            quotes.shift();
        }

        // Clear out stale ticks that are older than the minimum timestamp
        while (ticks?.length && ticks[0].timestamp < minimumTimestamp) {
            ticks.shift();
        }

		// Clear out stale ticks that are older than the minimum timestamp
        while (volumes?.length && volumes[0].timestamp < minimumTimestamp) {
            volumes.shift();
        }

        // Clear out stale bars that exceed the maximum index
        while (bars?.length > maxIndex) {
			bars.sort((a,b) => a.timestamp - b.timestamp);
            bars.shift();
        }

    }

	/**
	 * trimPosition
	 * @description **IMPLEMENT OVERRIDE** Safety function to trim any quantity over the max position limit you define
	 * We are in a risky position which is a bit overleveraged, so we need to trim our position  
	 * @param {number} qty 
	 */
    async trimPosition(qty) {
        this.state.log && console.log('over max positions, trimming');
    }

	/**
	 * workingNetPos
	 * @description **IMPLEMENT OVERRIDE** We have (a) working order(s), and are currently holding a net position
	 * e.g., +1 net position, working sell order (or working bracket TP & SL)      
	 */
    async workingNetPos() {
        this.state.log && console.log('working, position');
    }
    
	/**
	 * workingNoPos
	 * @description **IMPLEMENT OVERRIDE** We have (a) working order(s), but are not holding a net position
	 * e.g., 0 net position, working buy order to enter (or multiple buy orders in a grid)
	 */
    async workingNoPos() {
        this.state.log && console.log('working, no position');
    }

	/**
	 * inactiveNetPos
	 * @description **IMPLEMENT OVERRIDE** We have no working orders, but are holding a net position
     * e.g., +1 net position, no active sell orders due to market close auto-cancellation of unfilled orders     
	 */
    async inactiveNetPos() {
        this.state.log && console.log('inactive, position');
    }
	/**
	 * inactiveNoPos
	 * @description **IMPLEMENT OVERRIDE** Triggered if we determine we have no working orders, and are not holding a net position
     * e.g., 0 net position, no working orders and generally flat on market, waiting for a signal    
	 */
    async inactiveNoPos() {
        this.state.log && console.log('inactive, no position');
    }

    /**
     * timestamp
     * @returns {number} **DO NOT OVERRIDE** timestamp in milliseconds, either relative to the replay session or based on the current moment
     */
    timestamp() {
        let { clock } = this.state;
        return (clock && (clock.replay + (Date.now() - clock.current))) || Date.now();
    }

	/**
	 * isAllowedTradingTime
	 * @description **DO NOT OVERRIDE** checks if the clock is within the allowable trading session hours, if the hours are given
	 * @returns {boolean}
	 */
	isAllowedTradingTime() {
		let currentTime = new Date(this.timestamp()); // (clock && (clock.replay + (Date.now() - clock.current))) || Date.now();
		let hour = currentTime.getHours();
		let minute = currentTime.getMinutes();

		let { minAllowedTradingTime, maxAllowedTradingTime } = this.state;
		
		if (minAllowedTradingTime && maxAllowedTradingTime) {

			let inRange = (hour > minAllowedTradingTime?.hour && hour < maxAllowedTradingTime?.hour);

			let aboveMin = (hour === minAllowedTradingTime?.hour && minute >= minAllowedTradingTime?.minute);

			let belowMax = (hour === maxAllowedTradingTime?.hour && minute <= maxAllowedTradingTime?.minute);
			
			return (inRange || (aboveMin && belowMax));
		}

		return true;
	
	}

    workingOrders() {
        
        // We need a way to determine the current STATE of orders, for all independent or strategy-linked orders.
        // In theory, if a strategy links orders, if the strategy is working, at least one of the orders should be in a working state
        // As an edge case, if a bracket is filled, we may get the fill for one order before the cancellation is issued for the other(s), and thus still be working.
        // TODO: How to handle?
        
        let { orders } = this.state;
    
        return (orders || []).filter(({ ordStatus }) => workingOrder(ordStatus));

    }

	/** 
	 * isCancelOrder
	 * @description **DO NOT OVERRIDE** checks if a cancellation is still pending, but if complete, it splices out the cancellation object from the `cancelOrder` `hesitation` array
	 * @returns {Boolean} 
	 */
	isCancelOrder() {

        // Grab orders from the state
        let { orders, commands } = this.state;

		// Assign an external counter so that we can iterate through the array and splice from it if necessary
		let externalCounter = 0;

		return this.hesitations?.cancelOrder.some(data => {

			// If we don't have any data in the state array, then we have no issue
			if (!data) return false;
			
			// Destructure the last `placeOrder` Promise.resolved()
			let { failureReason, failureText, commandId } = data;
			
			// If we encounter a failure, throw an error
			let catchall = this.handleError({failureReason, failureText});

			// If the command to cancel the order isn't present yet, we are still pending
			let command = commandId && commands.find(({id}) => id === commandId);
			if (!command) return true;

			// If the actual order does not exist, we have an error
			let { orderId } = command;
			let order = orderId && orders.find(({id}) => id === orderId);
			if (!order) return true;
			
			let { ordStatus } = order;
			if (ordStatus === OrdStatus.Canceled || catchall) {
				// If the actual order exists, and is successfully cancelled, we no longer need to keep track of the Promise result
				this.hesitations?.cancelOrder.splice(externalCounter,1);

			} else {
				// If the actual order exists, but isn't yet canceled, we are still pending or could have an issue
				externalCounter += 1;
				return true;
			}
		
			// Return the catchall
			return catchall; // this.handleError({failureReason, failureText});
			
		})
		
	}
		
	/**
	 * isLiquidatePosition
	 * @description **DO NOT OVERRIDE** Checks `liquidatePosition` requests against `orders` and `commands` to determine if we need to hesitate
	 * 
	 * NOTE: only processes the ***last*** `liquidatePosition` request, so not intended to manage multiple brackets 
	 * concurrently.
	 * 
	 * NOTE: Does not yet verify that the liquidation was appropriately executed, e.g., with no open `orders`.
	 * 
	 * @returns {Boolean}
	 */
	isLiquidatePosition() {

        // Grab orders and commands from the state
        let { orders, commands } = this.state;

		// Grab the last `placeOrder` object
		let data = last(this.hesitations?.liquidatePosition);

		// If we don't have any data in the state array, then we have no issue
		if (!data) return false;
		
		// Destructure the last `placeOrder` Promise.resolved()
		let { failureReason, failureText, orderId } = data;
		
		// If the actual order does not exist, we have an error
		// TODO
		// let { orderId } = command;
		// let order = orderId && orders.find(({id}) => id === orderId);
		// if (!order) return true;

		// TODO
		
		// If we encounter a failure, throw an error
		return this.handleError({failureReason, failureText});

	}

	/**
	 * isModifyOrder
	 * @description **DO NOT OVERRIDE** Checks `modifyOrder` requests against `orders` and `commands` to determine if we need to hesitate
	 * 
	 * NOTE: only processes the ***last*** `modifyOrder` request, so not intended to manage multiple brackets 
	 * concurrently.
	 * 
	 * NOTE: Ensures that the `order` ***exists***, but does not ensure that it has been successfully modified,
	 * e.g., with new `orderVersion` information.
	 * 
	 * @returns {Boolean}
	 */
	isModifyOrder() {

        // Grab orders and commands from the state
        let { orders, commands } = this.state;

		// Grab the last `modifyOrder` object
		let data = last(this.hesitations?.modifyOrder);

		// If we don't have any data in the state array, then we have no issue
		if (!data) return false;

		// Destructure the last `placeOrder` Promise.resolved()
		let { failureReason, failureText, commandId } = data;
		
		// If the command to modify the order isn't present yet, we are still pending
		let command = commandId && commands.find(({id}) => id === commandId);
		if (!command) return true;

		// If the actual order does not exist, we have an error
		let { orderId } = command;
		let order = orderId && orders.find(({id}) => id === orderId);
		if (!order) return true;

		// If the actual order exists, but isn't yet modified, we are still pending
		let { ordStatus } = order;
		// TODO
		// if (ordStatus !== OrdStatus.Canceled) return true;
		
		// If we encounter a failure, throw an error
		return this.handleError({failureReason, failureText});
		
	}

	/**
	 * isPlaceOCO
	 * @description **DO NOT OVERRIDE** Checks `placeOCO` requests against `orders` to determine if we need to hesitate
	 * NOTE: only processes the ***last*** `placeOCO` request, so not intended to manage multiple brackets 
	 * concurrently.
	 * @returns {Boolean}
	 */
	isPlaceOCO() {
		
        // Grab orders from the state
        let { orders } = this.state;

		// Grab the last `placeOCO` object
		let data = last(this.hesitations?.placeOCO);

		// If we don't have any data in the state array, then we have no issue
		if (!data) return false;
		
		// Destructure the last `placeOrder` Promise.resolved()
		let { failureReason, failureText, orderId, ocoId } = data;
		
		// If the order is present in our `orders` object, we're fine; if not, we have an issue
		if (orderId && !(orders?.find(({id}) => id === orderId))) return true;
		if (ocoId && !(orders?.find(({id}) => id === ocoId))) return true;

		// If we encounter a failure, throw an error
		return this.handleError({failureReason, failureText});

	}

	/**
	 * isPlaceOrder
	 * @description **DO NOT OVERRIDE** Checks `placeOrder` requests against `orders` to determine if we need to hesitate
	 * NOTE: only processes the ***last*** `placeOrder` request, so not intended to manage multiple brackets 
	 * concurrently.
	 * @returns {Boolean}
	 */
	isPlaceOrder() { 

        // Grab orders from the state
        let { orders } = this.state;

		// Grab the last `placeOrder` object
		let data = last(this.hesitations?.placeOrder);

		// If we don't have any data in the state array, then we have no issue
		if (!data) return false;
		
		// Destructure the last `placeOrder` Promise.resolved()
		let { failureReason, failureText, orderId } = data;
		
		// If the order is present in our `orders` object, we're fine; if not, we have an issue
		if (orderId && !(orders?.find(({id}) => id === orderId))) return true;

		// If we encounter a failure, throw an error
		return this.handleError({failureReason, failureText});

	}

	/**
	 * isPlaceOSO
	 * @description **DO NOT OVERRIDE** Checks `placeOSO` requests against `orders` to determine if we need to hesitate
	 * NOTE: only processes the ***last*** `placeOSO` request, so not intended to manage multiple brackets 
	 * concurrently.
	 * @returns {Boolean}
	 */
	 isPlaceOSO() {
		
        // Grab orders from the state
        let { orders } = this.state;

		// Grab the last `placeOSO` object
		let data = last(this.hesitations?.placeOSO);

		// If we don't have any data in the state array, then we have no issue
		if (!data) return false;
		
		// Destructure the last `placeOrder` Promise.resolved()
		let { failureReason, failureText, orderId, oso1Id, oso2Id } = data;
		
		// If the order is present in our `orders` object, we're fine; if not, we have an issue
		if (orderId && !(orders?.find(({id}) => id === orderId))) return true;
		if (oso1Id && !(orders?.find(({id}) => id === oso1Id))) return true;
		if (oso2Id && !(orders?.find(({id}) => id === oso2Id))) return true;
		
		// If we encounter a failure, throw an error
		return this.handleError({failureReason, failureText});

	}

	/**
	 * handleError
	 * @description **DO NOT OVERRIDE** Checks if we received an error and if so, safely handles it via logging.
	 * If we have an error, the truthy return keeps us trapped in a hesitation, so while the algorithm won't fail on an error,
	 * no further action will be taken
	 * @param {Object} param 
	 * @param {string} param.failureReason
	 * @param {string} param.failureText
	 * @returns {boolean}
	 */
	handleError({failureReason, failureText}) {
		
		// If we encounter a failure, throw an error
		if (failureReason || failureText) {
			failureReason && console.error(failureReason);
			failureText && console.error(failureText);
			return true;
		}
		return false;

	}

	/**
	 * isHesitant
	 * @description **DO NOT OVERRIDE** Takes in the `orders` and `commands` arrays, and evaluates them against various endpoint `hesitation` checks 
	 * to ensure we have received all the critical data from an `async` WebSocket API request before allowing additional order
	 * management behavior to take place.
	 * @returns {Boolean}
	 */
	isHesitant() {

		// TODO: Timestamp =====> if not after 30 seconds, consider it a bust

		let a = this.isCancelOrder();
		let b = this.isLiquidatePosition();
		let c = this.isModifyOrder();
		let d = this.isPlaceOCO();
		let e = this.isPlaceOSO();
		let f = this.isPlaceOrder();

		let g = this.pending;
		
		let h = this.state.socket.counter.current !== this.state.socket.counter.received;

		// If any of our `hesitation` fields give us cause to hesitate, return a truthy condition
		let hesitation = a || b || c || d || e || f || g || h;

		if (hesitation) console.log(yellow(`Hesitating C${this.state.socket.counter.current} R${this.state.socket.counter.received}${a && ' cancelOrder' || ''}${b && ' liquidatePosition' || ''}${c && ' modifyOrder' || ''}${d && ' placeOCO' || ''}${e && ' placeOSO' || ''}${f && ' placeOrder' || ''}${g && ' Pending' || ''}${h && ' Lagging' || ''}`));
		return hesitation;

	}
}


function workingOrder(ordStatus) {
    return [
        OrdStatus.PendingCancel,
        OrdStatus.PendingNew,
        OrdStatus.PendingReplace,
        OrdStatus.Suspended,
        OrdStatus.Working
    ].includes(ordStatus);
}

module.exports = Strategy;