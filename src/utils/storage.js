// storage.cjs
// Node.js adaptation of the Tradovate docs at https://github.com/tradovate/example-api-js/tree/main/tutorial/Access/EX-2-Storing-A-Token
// Main intent is to create a local file for storing session variables, to mirror a browser `sessionStorage` or cookies
// In a way, this acts much like pickling in Python
// NOTE: the `accounts` returned by this could be more than one depending on your Tradovate configuration.
// For purpose of this autotrader, we only want to deal with ONE account. Keep this in mind.

// Grab some helper codebits (green and red will let us color code logging statements) and grab the `fs` module for reading and writing files
const { red, green } = require('./helpers.js');
const fs = require('fs');
// const path = require('path');

// Set some constant key names for key-value lookup in our `sessionStorage`
const STORAGE_KEY       = 'tradovate-api-access-token'
const EXPIRATION_KEY    = 'tradovate-api-access-expiration'
const DEVICE_ID_KEY     = 'tradovate-device-id'
const AVAIL_ACCTS_KEY   = 'tradovate-api-available-accounts'

// Set our sessionFilePath to be the working directory, but feel free to modify this
// TODO: It may make more sense to import this from the `auth` or `env` fields.
const sessionFilePath = `${process.cwd()}/sessionFile.json`;

// Ensure that sessionStorage is globally accessible in the Node.js environment
global.sessionStorage = {}

// Update the global sessionStorage with an existing `sessionFile` if one exists
if (fs.existsSync(sessionFilePath)) {
    let sessionFile = fs.readFileSync(sessionFilePath,"utf8");
    if (sessionFile) global.sessionStorage = JSON.parse(sessionFile);
}

// Overwrites the `sessionFile` (or de facto writes a new one if one does not yet exist) with the `global.sessionStorage`
// This will enable us to minimize requests for tokens by reusing unexpired tokens between reloads
const writeSession = function() {
    fs.writeFile(sessionFilePath, JSON.stringify(global.sessionStorage), 'utf8', (err) => { 
        if (err) {
            console.log(red('Error writing session file')); 
        } else {
            console.log(green('Wrote new session file')); 
        }
    });
}

// Set the accounts in `sessionStorage`
const setAvailableAccounts = accounts => {
    global.sessionStorage[AVAIL_ACCTS_KEY] = accounts;
    writeSession();
}

/**
 * Returns and array of available accounts or undefined.
 * @returns Account[]
 */
const getAvailableAccounts = () => {
    return global.sessionStorage[AVAIL_ACCTS_KEY];
}

// Set the device id in `sessionStorage`
const setDeviceId = (id) => {
    global.sessionStorage[DEVICE_ID_KEY] = id;
    writeSession();
}

// Get the device id from `sessionStorage`
const getDeviceId = () => {
    return  global.sessionStorage[DEVICE_ID_KEY];
}

// Set the access token in `sessionStorage`, if it is valid.
const setAccessToken = (token, expiration) => {
    
    if(!token || !expiration) throw new Error('attempted to set undefined token');

    global.sessionStorage[STORAGE_KEY] = token;
    global.sessionStorage[EXPIRATION_KEY] = expiration;
    writeSession();

}

// Get the access token from `sessionStorage`, if it exists.
const getAccessToken = () => {

    const token = global.sessionStorage[STORAGE_KEY];
    const expiration = global.sessionStorage[EXPIRATION_KEY];

    if(!token) {
        console.warn('No access token retrieved. Please request an access token.')
    }
    return { token, expiration }
}

// Helper function to check if the token is unexpired
const tokenIsValid = expiration => new Date(expiration) - new Date() > 0 

module.exports = {
    setAvailableAccounts,
    getAvailableAccounts,
    setDeviceId,
    getDeviceId,
    setAccessToken,
    getAccessToken,
    tokenIsValid,
    writeSession
}