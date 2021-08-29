const { getAccessToken, getAvailableAccounts } = require('../utils/storage.js');

const API = require('./API.js');
const WebSocket       = require('ws');

/**
 * TradovateSocket
 * Subclass of API, so it possesses all of the endpoints
 * Implements the connect() and disconnect() functions
 */
class TradovateSocket extends API {
	
    /**
     * Constructor
     * @param {string} url
     * @param {object} startTimestamp
     */
	constructor(...args) {
        super(...args);
	}

    /**
     * connect
     * @description Connects the WebSocket to the server URL by sending an authorization token, initializes the 
     * heartbeat interval, assigns notional JSON parsing for event messages, and a closure action.
     * 
     * @returns {Promise} Returns the JSON.parsed() of the first message received if resolved, else rejects with an empty response
     */
    async connect() {
        
        if(!this.ws || this.ws.readyState == 3 || this.ws.readyState == 2) {
            this.ws = new WebSocket(this.url);
        }

        let interval;

        return new Promise((res, rej) => {

            this.ws.addEventListener('message', async msg => {
                
                const { type, data } = msg;
                
                const kind = data.slice(0,1);
                
                if (type !== 'message') {
                    console.log('non-message type received')
                    console.log(msg)
                    return
                }
            
                // Message discriminator
                switch (kind) {

                    /**
                     * 'o' Frame
                     * Open frame. Every time a new session is established, the server must immediately send the open frame. 
                     * This is required, as some protocols (mostly polling) can't distinguish between a properly established 
                     * connection and a broken one - we must convince the client that it is indeed a valid URL and it can be 
                     * expecting further messages in the future via that URL.
                     */
                    case 'o':      
                        console.log('Making WS auth request...')
                        const { token } = getAccessToken()
                        this.ws.send(`authorize\n0\n\n${token}`)          
                        interval = setInterval(() => {
                            if(this.ws.readyState == 3 || this.ws.readyState == 2) {
                                clearInterval(interval)
                                return
                            }
                            this.ws.send('[]')
                            console.log(`[] ${(new Date()).toISOString()}`)
                        }, 2500)
                        break;

                    /**
                     * 'h' Frame
                     * Heartbeat frame. Most loadbalancers have arbitrary timeouts on connections. In order to keep connections 
                     * from breaking, the server must send a heartbeat frame every now and then. The server sends a heartbeat 
                     * about every 2.5 seconds, and to keep the connection alive the client must also send a response beat in 
                     * the form of an empty array, stringified ('[]')
                     */
                    case 'h':
                        break;
                    
                    /**
                     * 'a' Frame
                     * Array of JSON-encoded messages. For example: 'a[{"data": "value"}]'.
                     */
                    case 'a':

                        const parsedData = JSON.parse(msg.data.slice(1));
                        const [first] = parsedData;

                        if(first.i === 0 && first.s === 200) {

                            // If a replay timestamp is requested, initialize market replay
                            let { startTimestamp } = this;
                            let speed = 100;
                            let marketReplay = startTimestamp && this.replay.initializeClock({
                                body: { startTimestamp, speed }
                            })

                            res()
                            
                        } else rej()

                        break;

                    /**
                     * 'c' Frame
                     * Close frame. This frame is send to the browser every time the client asks for data on closed connection. 
                     * This may happen multiple times. Close frame contains a code and a string explaining a reason of closure, 
                     * like: c[3000, "Go away!"].
                     */
                    case 'c':
                        console.log('closing websocket')
                        clearInterval(interval)
                        break;

                    
                    default:
                        console.error('Unexpected response token received:')
                        console.error(msg)
                        break
                }
            })

        })    
    }

    /**
     * Disconnect
     * Closes the client websocket, with a 1000ms delay in the event we want to implement any closing actions
     * By default, no special action is taken around closing positions. If you want that functionality, you will
     * need to add it separately
     */
    disconnect() {
        console.log('closing websocket connection')
        this.ws.close(1000, `Client initiated disconnect.`)
    }

}

module.exports = TradovateSocket;