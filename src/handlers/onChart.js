// onChart.js

/**
 * @function onChart
 * @description Parses the Chart payload
 * @param {Object} params
 * @param {Object} params.state
 * @param {Object} params.payload
 * @returns {Object}
 */
function onChart({state,payload}) {
	
	// Extract the Tradovate `charts` object from the payload
	let { charts } = payload || [];
	let { barSubscription, tickSubscription, volumeSubscription } = state;
	let _bars = state?.bars;
	let _ticks = state?.ticks;
	let _volumes = state?.volumes;

	// Traverse the `charts` array and handle the contents
	// Note: ignoring the `s` data-source parameter to prevent conflict with nested `s` in tick charts
	charts.forEach(({id, td, bars, bp, bt, ts, tks, eoh}) => {

		if ([
			tickSubscription?.realtimeId,
			tickSubscription?.historicalId,
			barSubscription?.realtimeId,
			barSubscription?.historicalId,
			volumeSubscription?.realtimeId,
			volumeSubscription?.historicalId,
			
		].includes(id)) {

			// Handle end of history
			if (eoh) {
				// Historical ticks are loaded
				// Currently we have no additional logic for handling these
			}

			// Handle standard bar chart if the subscription matches our target subscription
			bars?.forEach(obj => {
				
				// Ensure `timestamp` is accessible as a numerical value for simplicity
				let { open, high, low, close, upVolume, downVolume, upTicks, downTicks, bidVolume, offerVolume} = obj;
				let timestamp = new Date(obj?.timestamp).getTime();
				let bar = { ...obj, timestamp };

				// Because bars "grow" with each tick, we need to overwrite bars with new information
				// As an efficiency, we could instead just check the last index, since historical bars should be "complete" when provided
				// and fresh bars should be pushed in a growing manner. However, if we wanted to effectively handle historical bars for a 
				// more complicated chart, we'd need to replace the bar at its found index rather than the final bar.
				// If we are aware of the elementSize, and it's equal to 1 (i.e., we have a 1-volume chart), we may share timestamps.
				// As a result, all bars should be retained, even if timestamps are shared.
				// Conveniently, if we had a 1-sized hourly bar, etc., the timestamps will be different by definition, so there should be no issues here.
				
				if (id === barSubscription?.realtimeId || id === barSubscription?.historicalId) {
					
					const maybe = _bars[_bars.length - 1]?.timestamp === timestamp;
					if (!maybe) {
						_bars.push(bar);
					} else {
						_bars[_bars.length - 1] = bar;
					}

				} else if (id === volumeSubscription?.realtimeId || id === volumeSubscription?.historicalId) {
					
					const maybe = _volumes[_volumes.length - 1]?.timestamp === timestamp;
					if (volumeSubscription?.elementSize === 1 || !maybe) {
						_volumes.push(bar);
					} else {
						_volumes[_volumes.length - 1] = bar;
					}

				}

			})

			// Handle tick chart objects by building a readable tick and storing it
			tks?.forEach(tick => {
				
				let {t, p, s, b, a, bs, as} = tick;

				const timestamp = bt + t;   // Actual tick timestamp
				const price = (bp + p) * ts;   // Tick price as contract price

				// Actual bid price as contract price (if bid size defined)
				const bidPrice = bs && ((bp + b) * ts);   

				// Actual ask price as contract price (if ask size defined)
				const askPrice = as && ((bp + a) * ts);    

				// state.ticks.push({
				_ticks.push({

					id: tick.id,
					timestamp: new Date(timestamp).getTime(),

					price,
					size: s,                       // Tick size (tick volume)

					bidPrice,
					bidSize: bs,

					askPrice,
					askSize: as,

					// Custom parameters to make it easier to post-process market orders
					// Sell market orders are by definition less than the ask, but not necessarily equal to the bid (if this is the final bid before a price level shift)
					// and vice versa for a buy market order
					offerVolume: (price > bidPrice) ? s : 0, // Buy market orders
					bidVolume: (price < askPrice) ? s : 0 // Sell market orders

				});

			})
		}
	});

	return state;

}

module.exports = onChart;