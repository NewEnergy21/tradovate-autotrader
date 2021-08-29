// Socket.js
// Implements the main infrastructure for a class-based Tradovate-protocol WebSocket


const $param = require('jquery-param');
const { getJSON } = require('../utils/helpers.js');
const { getAccessToken, getAvailableAccounts } = require('../utils/storage.js');

/**
 * Constructor for the Socket superclass
 * @param {string} url
 * @param {string} startTimestamp optional, only if attempting to run a replay
 */
class Socket {
    constructor({url, startTimestamp}) {
        this.ws = null
        this.counter = new Counter()
        this.url = url;
        this.startTimestamp = startTimestamp;
    }

    /**
     * Makes a request and returns a promise that will resolve with the response JSON data
     */
    request({url, query, body}) {
        
        const ws = this.ws
        const id = this.counter.increment()
    
        // Pre-emptive
        const { token } = getAccessToken()
        if(!token) {
            console.error('No access token found. Please acquire a token and try again.')
            return
        }
        
        const promise = new Promise((res, rej) => {
            
            const resSubscription = msg => {
    
                const rejSubscription = () => rej(`Connection closed before request ${id} could be resolved.`)
                ws.addEventListener('close', rejSubscription)
    
                const data = getJSON(msg);

                data?.forEach(item => {
    
                    if(item.i === id) {
    
                        // Handle P-Tickets
                        if(item.d['p-ticket']) {
                            const ticket    = item.d['p-ticket'],
                              time      = item.d['p-time'],
                              captcha   = item.d['p-captcha'];
                        console.log(ticket, time);
                        
                        if(captcha) {
                            console.error('Captcha present, cannot retry auth request via third party application. Please try again in an hour.')
                            res(item.d);
                            return
                        }
                        
                        console.log(`Time Penalty present. Retrying operation in ${time}s`);
                        
                        setTimeout(() => {
                            this.ws.send(`${url}\n${id}\n${query ? query : ''}\n${body ? JSON.stringify({ ...body, 'p-ticket': ticket}) : JSON.stringify({'p-ticket': ticket})}`)
                        }, time * 1000)
                    
                        } else {
        
                            // Resolve message, no penalty ticket in response.
                            res(item.d)
                            ws.removeEventListener('close', rejSubscription)
                            ws.removeEventListener('message', resSubscription)

                        }
    
                    }
                })
            } 
            ws.addEventListener('message', resSubscription)
        })

        this.ws.send(`${url}\n${id}\n${Object.keys(query).length && $param(query) || ''}\n${Object.keys(body).length && JSON.stringify(body) || ''}`)
        return promise
    }    
}


function Counter() {
	this.current = 0;
    this.received = 0;
	this.increment = () => {
		this.current += 1
		return this.current
	}
}

module.exports = Socket;