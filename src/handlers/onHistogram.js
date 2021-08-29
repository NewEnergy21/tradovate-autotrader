// onHistogram.js

/**
 * @function onHistogram
 * @description Parses the Histogram payload
 * @param {Object} params
 * @param {Object} params.state
 * @param {Object} params.payload
 * @returns {Object}
 */
function onHistogram({state,payload}) {
		
	// Extract the Tradovate `histograms` object from the payload
	let { histograms } = payload || [];

	// Traverse the `histograms` array and handle the contents
	histograms.forEach(({base, contractId, items, refresh, timestamp, tradeDate}) => {

		let { year, month, day } = tradeDate;
		
		if (contractId === state?.symbol) {

			// Process the `items` object to get the index/offset volume profile
			Object.entries(items).forEach(([idx, volume]) => {
				
				let offset = Number(idx);
				let price = base + offset * (state?.providerTickSize || 0);

				// Inject the price and volume as an object within the `state.histograms` object
				// This is to ensure that we preserve the price as a Number, if we relied on it
				// as the index directly, it would be stringified and need to be reconverted to a number.
				state.histograms[price] = {volume, price};
			
			})
		
		}
		
	})

	return state;
}

module.exports = onHistogram;