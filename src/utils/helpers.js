// helpers.js
// Implements several Tradovate API specific (and substrategy specific) helper functions to streamline code
const { TdSyncProps } = require('./enum.js');

// Abstracts grabbing the last value in an array
const last = (arr=[]) => arr?.length ? arr[arr.length - 1] : undefined;

/**
 * NaNZero
 * @description Handles instances of NaN, Infinity, and undefined or null to coerce them to zero (or a default value if given), as a means of error handling
 * @param {number} num 
 * @param {number=0} def=0 Default value 
 * @returns {number}
 */
function NaNZero(num,def=0) {
  return (isNaN(num) || !isFinite(num) || !num) ? def : num;
}

function round(value,tail=0.25) {
    return NaNZero(Math.round(value / tail) * tail);
}

// Pause for a moment until a condition is fulfilled, a means of deliberately enforcing an await.then(() => {});
// Can be useful if you need to force synchronicity of the application for a state change to occur
// Warning: Blocking function
// await waitUntil.call(this,() => this.notYetDefinedVariable !== 0);
const WaitUntil = (condition) => {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if (!condition()) return
      clearInterval(interval)
      resolve()
    }, 100)
  })
}

/**
 * @function sigmoid
 * @description Takes in a number `x` and a shape factor `k` and returns a sigmoid valued -1 to 1, with crossover at zero.
 * @param {Number} x 
 * @param {Number} k 
 * @returns {Number}
 */

function sigmoid(x,k=1) {
	let z = isFinite(x) ? x : x > 0 ? 10e8 : -10e8 || 0;
	return 2 / (1 + Math.exp(-z/k)) - 1;
}


// Logging Color Schema
const red = text => `\x1b[31m${text}\x1b[0m`;
const magenta = text => `\x1b[35m${text}\x1b[0m`;
const yellow = text => `\x1b[33m${text}\x1b[0m`;
const green = text => `\x1b[32m${text}\x1b[0m`;



/**
 * @function insertionUpdate
 * @description Used to specifically update a `props` object within a `Strategy.state`
 * @param {Object} params
 * @param {Object} params.state A `Strategy.state` object
 * @param {String} params.entityType
 * @param {Object} params.entity A `props` entity
 * @param {String} params.sharedKey The UID key of a `props` entity 
 */
function insertionUpdate({state,entityType,entity,sharedKey}) {

	// Determine if an `entity` with the `sharedKey` is present in the `entityType` array
	// If present, overwrite it; if not, push it into the array
	const maybe = state[TdSyncProps[entityType]].findIndex((obj) => entity[sharedKey] === obj[sharedKey]);
	if (maybe < 0) {
		state[TdSyncProps[entityType]].push(entity);
	} else {
		state[TdSyncProps[entityType]][maybe] = entity;
	}
}

/**
 * @function latestTimestamp
 * @description Iterates over a list of objects, each containing a `timestamp`, and returns the object with the most recent / latest timestamp
 * @param {Array} arr Array of objects containing a `timestamp` key in ISO 8601 format, e.g., "2018-03-16T18:00:00.000Z"
 * @returns {Object} The object found with the latest timestamp, empty object if none found
 */
 function latestTimestamp(arr=[]) {

	// Reduce the array by assigning the `acc` accumulator to be the actual object within the array
	return arr?.reduce((acc, obj) => 
		acc = (acc?.timestamp > obj?.timestamp) ? acc : obj, 
		undefined
	) || { };
	
}


/**
 * @function getJSON
 * @description Takes in a message string per Tradovate's API and attempts to extract JSON from it
 * We don't want to fail out early and interrupt execution, so if we get an error or a bad message,
 * we return {void} as a fail-safe. Notably, the DOMS returned by md/subscribeDOM occasionally returns
 * null price and size fields, so this is a useful safety feature
 * @param {string} msg Message string from Tradovate WebSocket API
 * @returns {(Object|Array)}
 */
 function getJSON(msg) {
	if(msg.data.slice(0,1) !== 'a') return
	try {
		let res = JSON.parse(msg.data.slice(1));
		if (res) return res;
	} catch(err) {
		console.error(msg.data);
		console.error(err);
		return;
	}
}


module.exports = {
	insertionUpdate,
	latestTimestamp,
	getJSON,
	red,
	magenta,
	yellow,
	green,
	last,
	NaNZero,
	round,
	sigmoid
}