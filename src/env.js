// env.js
// NOTE: These are REQUIRED for the safe operation of your strategy

module.exports = {

	// MARKET DATA AND TRADING ------------------------------------------------------
	
	// Which contract to trade
	// ESU1
	// symbol: 2173694,
	// MESU1
	symbol: 2155088,

	// Warmup prevents submitting an order until the system has had time to process the first few fields / arrays, etc (milliseconds)
	warmup: 10e3,

	// Morning Time: Inject into the `productSession` for reference
	morningTime: { hour: 8, minute: 30 },
	
	// Allowable Trading Hours: Must supply both fields if using them
	minAllowedTradingTime: { hour: 7, minute: 0 }, // 0900
	maxAllowedTradingTime: { hour: 14, minute: 0 }, // 1500
	
	// Overtrading Half Life: How many intervals we want to give to prevent ourselves from overtrading? (integer)
	overtradingHalfLife: 5,

	// Maxmium number of lots ot allow
	maxPosition: 1,

	// Decision interval: How often we allow the system to make decisions to modify orders (milliseconds)
	decisionInterval: 10e3,

	// Max index (integer) that we can store in memory (e.g., for fixed-width bars)
	maxIndex: 1000,

	// Max time (in milliseconds) to store in memory
	maxMilliseconds: 600e3,
	
	// Minimum time (in milliseconds) to enforce delay between API requests
	minMilliseconds: 1e3,

	// Element size for tick or bar subscriptions, e.g., 1-tick or 1-volume
	elementSize: 1,

	// Number of elements to retrieve initially and hold in memory for the market data subscriptions
	asMuchAsElements: 10000,
	
	// Subscribe to quotes
	getQuotes: true,

	// Subscribe to Histogram updates
	getHistograms: true,
	
	// Subscribe to DOM updates
	getDOMs: false,
	
	// Subscribe to a volume chart for order flow
	getVolumes: true,

	// Subscribe to a bar chart (default in minute bars)
	getBars: true,

	// Subscribe to a tick chart
	getTicks: false

}