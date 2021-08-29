// Define "require"

const onChart = require("./onChart.js");
const onDOM = require("./onDOM.js");
const onHistogram = require("./onHistogram.js");
const onProps = require("./onProps.js");
const onQuote = require("./onQuote.js");
const onUserSync = require("./onUserSync.js");

const { TdMessage } = require("../utils/enum.js");
/**
 * onEvent
 * @description Main event handler; determine whether we have market data or actual `props` type event data, and if so, handle it accordingly in a simple switch statement
 * @param {Object} params
 * @param {Object} params.state The main `Strategy.state` array for purity
 * @param {string} params.event The event code, e.g. {"e": "props"} 
 * @param {Object} params.payload The event data from the WebSocket message, e.g., {"e":"props", "d":{ data } } 
 * @returns {Object} state
 */
function onEvent({state,event,payload}) {	
    switch(event) {
        
		case TdMessage.Chart: {
			return onChart({state, payload});
			break;
		}

		case TdMessage.DOM: {
			return onDOM({state, payload});
			break
		}

		case TdMessage.Histogram: {
			return onHistogram({state, payload});
			break
		}

		case TdMessage.Quote: {
			return onQuote({state, payload});
			break
		}

		case TdMessage.UserSync: {
			return onUserSync({state, payload});
			break
		}

		case TdMessage.Props: {
			return onProps({state, payload});
			break;
		}

		default: {
			return state;
		}

	}

	return state;
}

module.exports = onEvent;