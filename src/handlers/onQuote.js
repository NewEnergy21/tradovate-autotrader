// onQuote.js

/**
 * @function onQuote
 * @description Parses the Quote payload
 * @param {Object} params
 * @param {Object} params.state
 * @param {Object} params.payload
 * @returns {Object}
 */
function onQuote({state,payload}) {
	
	// Extract the Tradovate `quotes` object from the payload
	let { quotes } = payload || [];

	// Traverse the `quotes` array and handle the contents
	quotes.forEach(obj => {

		let { id, contractId, entries, timestamp } = obj;
		let {
			Bid,
			HighPrice,
			LowPrice,
			Offer,
			OpenInterest,
			OpeningPrice,
			SettlementPrice,
			TotalTradeVolume,
			Trade
		} = entries;
		
		// Spread the entries into camelCase fields so that it is easier to work with the quote as a flat object
		let quote = {
			id, 
			contractId,
			timestamp,
			
			// Unwrap the `entries` in a more useful manner
			bidPrice: Bid?.price,
			bidSize: Bid?.size,
			askPrice: Offer?.price,
			askSize: Offer?.size,
			highPrice: HighPrice?.price,
			lowPrice: LowPrice?.price,
			openingPrice: OpeningPrice?.price,
			openInterest: OpenInterest?.size,
			settlementPrice: SettlementPrice?.price,
			totalTradeVolume: TotalTradeVolume?.size,
			tradePrice: Trade?.price,
			tradeSize: Trade?.size,
			midPrice: ((Bid?.price + Offer?.price) / 2.0 || undefined)
		};

		// If the quote received is for our state `symbol`, append the quote data into the `state.quotes` array
		if (contractId === state?.symbol) state.quotes?.push(quote);

	})

	return state;
}

module.exports = onQuote;