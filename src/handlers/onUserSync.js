// onUserSync.js

/**
 * @function onUserSync
 * @description Parses the UserSync payload
 * @param {Object} params
 * @param {Object} params.state
 * @param {Object} params.payload
 * @returns {Object}
 */
function onUserSync({state,payload}) {
	
	// Extract the Tradovate `props` parent objects from the payload
	let { 
		users,
		accounts,
		accountRiskStatuses,
		marginSnapshots,
		userAccountAutoLiqs,
		cashBalances,
		currencies,
		positions,
		fillPairs,
		orders,
		contracts,
		contractMaturities,
		products,
		exchanges,
		spreadDefinitions,
		commands,
		commandReports,
		executionReports,
		orderVersions,
		fills,
		orderStrategies,
		orderStrategyLinks,
		userProperties,
		properties,
		userPlugins,
		userReadStatuses,
		contractGroups,
		orderStrategyTypes
	} = payload;

	// Overwrite the current state tracking of the object
	Object.entries(payload).forEach(([key, value]) => {

		state[key] = value;

	})

	// Generalize some key parameters of the main contract for ease of access
	if (contracts?.length) {
		let { providerTickSize } = state.contracts.find(({id}) => id === state?.symbol) || {};
		if (providerTickSize) state.providerTickSize = providerTickSize;
	}

	// In the event we are dealing with Market Replay, etc, overwrite the account that we are trading against.
	if (accounts?.length) {
		let account = accounts[0];
		let { id, name } = account;
		state.accountSpec = name;
		state.accountId = id;
	}

	return state;
}

module.exports = onUserSync;