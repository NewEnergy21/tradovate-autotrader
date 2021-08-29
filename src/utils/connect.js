// connect.cjs
// Establishes some logic for initially connecting to the Tradovate REST API and retrieving a token.
// Note, this logic is largely adapted from the Tradovate example documentation at 
// https://github.com/tradovate/example-api-js/tree/main/tutorial/Access

// The Tradovate example application uses the npm 'device-uuid' module for a client side web application.
// Node.js doesn't give access to the `window`, `navigator` or `browser` objects since it is server-side,
// so we use the npm 'uuid' module instead to generate a device identifier for authentication.
const { v4 } = require('uuid');
const DeviceUUID = v4;

// Retrieve the necessary auth parameters from a separate auth file.
// Ensure you modify the auth-template provided and rename it appropriately!
const { USER, PASS, CID, SEC, APPID, APPVERSION, DEVICEID } = require('../auth.js');
const { URLs } = require('./enum.js');

// Grab some helper functions from supporting files
const { setDeviceId, getDeviceId, setAccessToken, getAccessToken, tokenIsValid, setAvailableAccounts, getAvailableAccounts } = require('./storage.js');
const { tvPost, tvGet } = require('./services.js');

//set device ID, behaves differently for browser and mobile device.
const deviceID = function() {
	let DEVICE_ID;
	const device = getDeviceId()
    DEVICE_ID = device || DeviceUUID()
    setDeviceId(DEVICE_ID)
	return DEVICE_ID;
}

// Tradovate uses p-tickets and captchas for throttling, refer to https://api.tradovate.com/#section/Server-Frames and 
// https://github.com/tradovate/example-api-js/tree/main/tutorial/Access/EX-3-Time-Penalty
const handleRetry = async (data, json) => {
    const ticket    = json['p-ticket'],
          time      = json['p-time'],
          captcha   = json['p-captcha']

    if(captcha) {
        console.error('Captcha present, cannot retry auth request via third party application. Please try again in an hour.')
        return
    }

    console.log(`Time Penalty present. Retrying operation in ${time}s`)

    await waitForMs(time * 1000) 
    await connect({ ...data, 'p-ticket': ticket })   
}

// Attempt to asynchronously connect to the REST API
const connect = async (cliArgs) => {

    let data = {
        name:       USER,
        password:   PASS,
        appId:      APPID,
        appVersion: APPVERSION,
        cid:        CID,
        sec:        SEC,
        deviceId:   DEVICEID // deviceID(),
    }

    // Retrieve our current token and expiration, if we have one
    let { token, expiration } = getAccessToken()

    // TODO
    // console.log(cliArgs);

    const baseURL = URLs?.[cliArgs?.env]?.url;

    console.log(baseURL);

    // If we have a token, get our accounts and return out early
    if(token && tokenIsValid(expiration)) {
        const accounts = await tvGet({baseURL, endpoint: '/account/list'})
        console.log(accounts);
        setAvailableAccounts(accounts)
        
        // Make sure we reconnect if we hit expiration
        let reconnect = (new Date(expiration) - Date.now()) - 5e3; // connect 5 seconds before time is up


        setTimeout(() => {
            connect(cliArgs);
        }, reconnect);
        
        console.log(`Already connected with valid token. Reconnecting in ${(reconnect / 6e4).toFixed(2)}min`); 
        
        return
    }

    // If we didn't have a token or valid expiration, proceed to request a new one
    const authResponse = await tvPost({baseURL, endpoint: '/auth/accesstokenrequest', data, _usetoken: false})

    // Handle a p-ticket or error if encountered, else store token, accounts, etc
    if(authResponse['p-ticket']) {
        return await handleRetry(data, authResponse) 
    } else {
        const { errorText, accessToken, userId, userStatus, name, expirationTime } = authResponse

        if(errorText) {
            console.error(errorText)
            return
        }
        
        setAccessToken(accessToken, expirationTime)

        const accounts = await tvGet({baseURL, endpoint: '/account/list'})

        setAvailableAccounts(accounts)

        console.log(`Successfully stored access token ${accessToken} for user {name: ${name}, ID: ${userId}, status: ${userStatus}}.`)
    }
}

// Helper function to enforce a timeout if we encounter time penalties
const waitForMs = t => {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, t)
    })
}

// The only critical function to export here is connect()
module.exports = connect;