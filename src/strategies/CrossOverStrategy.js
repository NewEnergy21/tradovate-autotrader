// SubStrategy.js
// Write your own custom definition here

// jStat and simple-statistics are two useful modules for some statistical efforts and regressions, if that is a part of your strategy.
// jStat is mainly used for abstracting certain array functions, e.g., min() and max()
const jStat = require('jStat');

const { latestTimestamp, NaNZero, round, red, magenta } = require('../utils/helpers.js');

const Strategy = require('./Strategy.js');
const { decisionInterval } = require('../env.js');
const { OrderAction, OrderType } = require('../utils/enum.js');

/**
 * @class CrossOverStrategy
 * @description General template for a crossover helper strategy, helper functions are abstracted
 * @param {Object} params As injected during the `initialize()` function from `env` and `config`
 */
class CrossOverStrategy extends Strategy {
	constructor(...args) {
		super(...args);
	}

	async update(...args) {
		super.update(...args);
	}

	alpha(...args) {
		super.alpha(...args);

		let { quotes, ticks, bars, doms, volumes, histograms, providerTickSize, productSession, maxMilliseconds, fills, warmup, overtradingHalfLife } = this.state;
		let { bidPrice, askPrice, midPrice, tradePrice, openingPrice } = quotes[quotes.length - 1] || {}
		let { fastMAPeriod, slowMAPeriod } = this.state;

		// Grab the last available price
		let lastPrice = tradePrice || midPrice || openingPrice;
	
		// Example of assessing the histogram
		let prices = Object.values(histograms).map(({price}) => price);
		let histVolumes = Object.values(histograms).map(({volume}) => volume);
		let totalVolume = jStat.sum(histVolumes);

		// Example of assessing the DOMs
		let totalBids = jStat.sum(doms?.bids?.map(({size}) => size) || [0]);
		let weightedBid = jStat.sum(doms?.bids?.map(({price, size}) => price * size) || [0]) / totalBids;
		let totalOffers = jStat.sum(doms?.offers?.map(({size}) => size) || [0]);
		let weightedOffer = jStat.sum(doms?.offers?.map(({price, size}) => price * size) || [0]) / totalOffers;
		
		// Refer to the Tradovate docs and the `onChart.js` file for a detailed explanation of how we process tick & volume charts
		let averageTicks = jStat.mean(ticks?.map(({price}) => price));
		let buyVolume = jStat.sum(volumes?.map(({upVolume}) => upVolume));
		let sellVolume = jStat.sum(volumes?.map(({downVolume}) => downVolume));

		// Example of getting the time elapsed in the session, in case you have time-based signals
		let currentTime = this.timestamp();
		let sessionStart = (new Date(currentTime)).setHours(productSession.morningTime.hour,productSession.morningTime.minute,0,0);
		let sessionEnd = (new Date(currentTime)).setHours(productSession.stopTime.hour,productSession.stopTime.minute,0,0);
		let sessionTotal = sessionEnd - sessionStart;
		let elapsedSession = (currentTime - sessionStart);

		// Example of calculating the simple moving averages via bars
		let fastMovingAverage = jStat.mean(
			bars?.slice(-fastMAPeriod)?.map(({close}) => close)
		)

		let slowMovingAverage = jStat.mean(
			bars?.slice(-slowMAPeriod)?.map(({close}) => close)
		)

		// Example of estimating the time since our last fill, if we wanted to enforce an overtrading timeout or similar
		let lastFill = (new Date( 
			NaNZero(
				Math.max(
					warmup,
					latestTimestamp(fills)?.timestamp
				),
				warmup
			)
		)).getTime();
		let timeSince = this.timestamp() - lastFill;
		let overtradingTime = timeSince / decisionInterval;

		// Actual spread model
		this.state.buySignal = fastMovingAverage && slowMovingAverage && fastMovingAverage > slowMovingAverage;
		this.state.sellSignal = fastMovingAverage && slowMovingAverage && fastMovingAverage < slowMovingAverage;
		
	}

	async manageOrders(...args) {
		super.manageOrders(...args);
		// We call this simply to ensure it gets called, no more
	}

	async trimPosition(qty) {
		super.trimPosition(...arguments);
		// It really doesn't matter what happens. We absolutely do NOT want to be overleveraged. So, trim down to the max position or liquidate, and KILL.
		
		// Extract the required parameters for the liquidatePosition request
		let { accountSpec, accountId, symbol, allowOrders } = this.state;

		// Send a OSO order to limit buy to enter at the risk premium below bid, and limit sell to exit at the profit target over bid
		let request = {
			body: {
                accountId,
                contractId: symbol,
                admin: false
            }
		}
		
		// If we have a request built, prepare to send it
		if (allowOrders && request) {

			// Write a log for awareness
			this.pending = true;
			const data = await this.socket.order.liquidatePosition(request);
			console.log(red(`liquidatePosition ${JSON.stringify(data)}`));
			this.hesitations.liquidatePosition.push(data);
			this.pending = false;

			// Kill the strategy.
			this.killed = true;

		}
		
	}

	async workingNetPos(workingOrders) {
		super.workingNetPos(...arguments);
		// In this scenario, we're either long or short, and the moving averages have crossed (i.e., we have a signal) so we need to send the opposite order.

		// Extract the alpha-defined `buySignal` and `sellSignal` from the state
		let { accountSpec, accountId, positions, symbol, buySignal, sellSignal, allowOrders } = this.state;
		// Find our current active position and grab the `netPos` and `netPrice` fields
		let { 
			netPos = undefined, 
			netPrice = undefined 
		} = positions.find(({contractId}) => contractId === symbol);

		// Specify order parameters to be re-used on both the buy and sell side of the OSO bracket
		let orderQty = Math.abs(netPos), orderType = OrderType.Market;

		// Send a OSO order to limit buy to enter at the risk premium below bid, and limit sell to exit at the profit target over bid
		let request = ((buySignal && netPos < 0) || (sellSignal && netPos > 0)) && {
			body: {
                accountSpec,
                accountId,
                action: (buySignal) ? OrderAction.Buy : OrderAction.Sell,
                symbol,
                orderQty,
                orderType,
                isAutomated: true
            }
		}
		
		// If we have a request built, prepare to send it
		if (allowOrders && request) {

			// Write a log for awareness
			this.pending = true;
			const data = await this.socket.order.placeOrder(request);
			console.log(magenta(`placeOrder ${JSON.stringify(data)}`));
			this.hesitations.placeOrder.push(data);
			this.pending = false;

		}
	}
    
    async workingNoPos(workingOrders=[]) {
		super.workingNoPos(...arguments);
		// If we've been waiting too long on the order and price information has changed, we need to modify it.
		// Note, this example strategy uses market orders, so this shouldn't really apply, but it's helpful to see an example nonetheless if your system uses limit orders.
		
		// Unwrap some time-based state information
		let { decisionInterval, allowOrders } = this.state;

		// Determine our number of intervals elapsed, if we have waited too long for a fill, do we want to cancel and replace orders
		// (mainly applies for limit order based systems)
		let maxTimestamp = jStat.max(workingOrders?.map(({timestamp}) => (new Date(timestamp)).getTime()));
		let currentTime = this.timestamp();
		let intervalsElapsed = Math.floor((currentTime - maxTimestamp) / decisionInterval);
		let shouldReplace = false;

		// If we've passed a full interval (in terms of market state / information), then proceed to cancel orders
		if (allowOrders && intervalsElapsed >= 1 && shouldReplace) { // && Date.now() >= delays.workingNoPos) {
			
			// Iterate through our working orders to cancel them
			workingOrders.forEach(async ({id}) => {
			
				// Build a closing order request
				let request = {
					body: {
						orderId: id
					}
				}
				
				// Keep track of state via the `orderSingleton` and send `cancelOrder` requests
				this.pending = true;
				const data = await this.socket.order.cancelOrder(request)
				console.log(magenta(`cancelOrder: ${JSON.stringify(data)}`));
				this.hesitations.cancelOrder.push(data); 
				this.pending = false; 

			})
		}

    }

    async inactiveNetPos(...args) {
		super.inactiveNetPos(...args);
		// This code is just to show how you might "protect" an "unprotected" order, i.e., add a profitable limit order to exit if you have a simple working contract open but no working orders.
		// because our example strategy relies on market orders, this isn't super relevant, so it's currently designed to default to no action taken. However, it's useful to have the example
		// if you decided to use a limit order based strategy, and something happened to your exit orders (e.g., market closed before they could fill and orders were canceled, there was an error submitting the order, etc).
		
		// Extract positions and account information from the `state`
		let { positions, providerTickSize, accountSpec, accountId, symbol, allowOrders } = this.state;
		
		// Find our current active position and grab the `netPos` and `netPrice` fields
		let { 
			netPos = undefined, 
			netPrice = undefined 
		} = positions.find(({contractId}) => contractId === symbol);
		
		// Assign a recovery price for a closing order to ensure profitable exit
		let price = round(netPrice / netPos + providerTickSize, providerTickSize)

		// Place a profitable closing order
		let request = netPos && netPrice && {
			body: {
				accountSpec, 
				accountId, 
				action: (netPos > 0) ? OrderAction.Sell : OrderAction.Buy,
				symbol, 
				orderQty: netPos, 
				orderType: 'Limit', 
				price,
				isAutomated: true
			}
		}

		let shouldProtect = false;

		// If we have a request built, prepare to send it
		if (allowOrders && request && shouldProtect) {
			
			// Keep track of state via the `orderSingleton` and send the `placeOrder` request
			this.pending = true; 
			const data = await this.socket.order.placeOrder(request);
			console.log(magenta(`placeOrder ${JSON.stringify(data)}`));
			this.hesitations?.placeOrder.push(data);
			this.pending = false;

		}
		
    }

	/**
	 * @function inactiveNoPos
	 * @description Overrides the parent `inactiveNoPos` method to submit a `placeOrder` order if one is not working or if we don't have any existing promise.
	 * @param  {...any} args Any arguments needed for the function, however, none should be necessary as everything is transmitted through `this.state`
	 */
	async inactiveNoPos(...args) {
		super.inactiveNoPos(...args);
		
		// Extract the alpha-defined `buySignal` and `sellSignal` from the state
		let { accountSpec, accountId, symbol, buySignal, sellSignal, allowOrders } = this.state;

		// Specify order parameters to be re-used on both the buy and sell side of the OSO bracket
		let orderQty = 1, orderType = OrderType.Market;

		// Send a OSO order to limit buy to enter at the risk premium below bid, and limit sell to exit at the profit target over bid
		let request = (buySignal || sellSignal) && {
			body: {
                accountSpec,
                accountId,
                action: (buySignal) ? OrderAction.Buy : OrderAction.Sell,
                symbol,
                orderQty,
                orderType,
                isAutomated: true
            }
		}
		
		// If we have a request built, prepare to send it
		if (allowOrders && request) {

			// Write a log for awareness
			this.pending = true;
			const data = await this.socket.order.placeOrder(request);
			console.log(magenta(`placeOrder ${JSON.stringify(data)}`));
			this.hesitations.placeOrder.push(data);
			this.pending = false;

		}
    }

	// Add any additional helper class extension methods if you want to, so long as you don't override existing ones

}	

module.exports = CrossOverStrategy;