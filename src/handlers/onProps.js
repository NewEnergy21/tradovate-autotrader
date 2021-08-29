// onProps.js

// We need the `TdProps` enumerated object to understand the type of props we received, and `insertionUpdate` helps us to append or overwrite the `props` entity in our `Strategy.state` object arrays
const { TdProps, TdSyncProps } = require('../utils/enum.js');
const { insertionUpdate } = require('../utils/helpers.js');

/**
 * @function onProps
 * @description Parses the Props payload.
 * NOTE: We only have a few of the `props` types defined here, only a sufficient number to account for VERY BASIC order handling logic.
 * Anything more complex will need to be extended.
 * @param {Object} params
 * @param {Object} params.state
 * @param {Object} params.payload
 * @returns {Object}
 */
function onProps({state,payload}) {
	
	// Extract the generic Tradovate `props` entity metadata from the payload
	let { entity, entityType, eventType } = payload;

	// We need to determine what `entityType` we are dealing with and handle it accordingly 
	switch (entityType) {
		
		// Update an entities via their `id` parameter
		// TODO: there may be other `props` with a similar `id` parameter
		case TdProps.command:
		case TdProps.commandReport:
		case TdProps.executionReport:
		case TdProps.order:
		case TdProps.orderVersion:
		case TdProps.orderStrategy:
		case TdProps.orderStrategyLink:
		case TdProps.position:
		case TdProps.fill:
		case TdProps.fillPair:
			insertionUpdate({state, entityType, entity, sharedKey: 'id'})
			break;
		
		default:
			break;
	}

	return state;
}

module.exports = onProps;