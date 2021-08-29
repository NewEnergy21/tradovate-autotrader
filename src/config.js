// config.js

//CUSTOM CONFIG
// Specify any custom fields you'd like to add to your strategy, e.g., if you run an SMA Crossover Strategy, you might add a slowPeriod, and a fastPeriod field.
// These parameters will be accessible under your `Strategy.state` field.

const crossOverStrategy = require('./strategies/CrossOverStrategy.js');
const myStrategy = require('./strategies/MyStrategy.js');
const threeSigmaStrategy = require('./strategies/ThreeSigmaStrategy.js');


module.exports = {

	// Note: We recommend requiring any strategies you want to use here, but since only one can be run at a time, identify it in the `strategy` field
	Strategy: threeSigmaStrategy,
	
	// Identify any other special configuration parameters you need for the strategy, they will be accessible under `Strategy.state`
	// For example, moving average periods
	config: {
		slowMAPeriod: 21,
		fastMAPeriod: 14,
		plannedDivingIn: { hour: 9, minute: 30 }, // 1030
	}

}
