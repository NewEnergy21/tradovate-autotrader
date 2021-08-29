// services.cjs
// Largely adapted from the Tradovate example docs at https://github.com/tradovate/example-api-js/blob/main/tutorial/Access/EX-4-Test-Request/src/services.js
// Provides a Tradovate-specific GET and POST request for interrogating the REST API

// TODO: May fail if `replay`
const { getAccessToken } = require('./storage.js');

// polyfill the browser Fetch API so that we can simplify our REST API requests without much reconfiguration from the Tradovate docs
const fetch = require('node-fetch');

// Tradovate REST API GET request
const tvGet = async ({ baseURL, endpoint, query} ) => {
    const { token } = getAccessToken()
    try {
        let q = ''
        if(query) {
            q = Object.keys(query).reduce((acc, next, i, arr) => {
                acc += next + '=' + query[next]
                if(i !== arr.length - 1) acc += '&'
                return acc
            }, '?')
        }

        let url = query 
            ? baseURL + endpoint + q
            : baseURL + endpoint

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const js = await res.json()

        return js

    } catch(err) {
        console.error(err)
    }
}

// Tradovate REST API POST request
// Only fires if we have a token
const tvPost = async ({baseURL, endpoint, data, _usetoken = true} ) => {
    const { token } = getAccessToken()
    const bearer = _usetoken ? { Authorization: `Bearer ${token}` } : {} 
    try {
        
        const res = await fetch(baseURL + endpoint, {
            method: 'POST',
            headers: {
                ...bearer,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error(res.status);
        }
        const js = await res.json()

        return js

    } catch(err) {
        console.error(err)
    }
}


module.exports = {
    tvGet,
    tvPost
}