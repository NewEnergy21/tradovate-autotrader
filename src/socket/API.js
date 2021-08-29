// API.cjs


// Require the parent Socket superclass
const Socket = require('./Socket.js');

/**
 * @class API
 * @description Extends the Socket class with API functional endpoints
 * We extend the generic `Socket` class and give it access to all of the Tradovate API endpoints, as defined in https://api.tradovate.com/ 
 * Because the API structure is generally '/endpointFamilyName/actualEndpointName/', we give the Socket (API) class additional class properties
 * at the endpointFamilyName level (e.g., order/, command/, md/), with nested functional properties containing the actual endpoints (e.g., order/placeOrder)
 * This allows us to make calls rather simply as socket.family.endpoint({ query: data, body: data }) as appropriate
 * Where available, JSDoc has been attempted for each endpoint, but HIGHLY recommend looking at the official API docs for detailed explanations
 * of endpoints in the event documentation here is incomplete or improperly formatted due to templatting issues
 *
 * Note: All endpoints will be defined as <API Class>.<familyName>.<endpoint>({ query: data, body: data }) and 
 * will call the <Socket Class>.request() function with an embedded URL and the query / body as applicable
 * @param {Object} args The Socket superclass arguments
 */
class API extends Socket {

	// Call the constructor and embed the additional API endpoint fields in the class `this`
    constructor(...args) {

		// Call the super to ensure we carry any appropriate properties
        super(...args);

		// Assign a pointer by reference to `this`, so that we can access it within the function definitions
		// (if not, the `this` scope changes to this.<familyName>.<functionName> scope or else is undefined)
        let API = this;

		// Start adding families and endpoints

		this.md = {

			subscribeQuote: async function(params={
				query: {
				},
				body: {
					symbol: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'md/subscribeQuote', query: query || {}, body: body || {} })
			},

			unsubscribeQuote: async function(params={
				query: {
				},
				body: {
					symbol: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'md/unsubscribeQuote', query: query || {}, body: body || {} })
			},

			subscribeDOM: async function(params={
				query: {
				},
				body: {
					symbol: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'md/subscribeDOM', query: query || {}, body: body || {} })
			},

			unsubscribeDOM: async function(params={
				query: {
				},
				body: {
					symbol: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'md/unsubscribeDOM', query: query || {}, body: body || {} })
			},

			subscribeHistogram: async function(params={
				query: {
				},
				body: {
					symbol: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'md/subscribeHistogram', query: query || {}, body: body || {} })
			},

			unsubscribeHistogram: async function(params={
				query: {
				},
				body: {
					symbol: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'md/unsubscribeHistogram', query: query || {}, body: body || {} })
			},

			/**
			 * ## GET /md/getChart
			 * 
			 * @description Client may have multiple charts for the same contract, so response for md/getChart request contains subscription ID to properly cancel real-time chart subscription.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.symbol
			 * @param {Object} body.chartDescription
			 * @param {String} body.chartDescription.underlyingType // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
			 * @param {Integer} body.chartDescription.elementSize
			 * @param {String} body.chartDescription.elementSizeUnit // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
    		 * @param {Boolean} body.chartDescription.withHistogram
			 * @param {Object} body.timeRange // All fields in "timeRange" are optional, but at least anyone is required
    		 * @param {String} body.timeRange.closestTimestamp //":"2017-04-13T11:33Z",
    		 * @param {Integer} body.timeRange.closestTickId //":123,
    		 * @param {String} body.timeRange.asFarAsTimestamp //":"2017-04-13T11:33Z",
    		 * @param {Integer} body.timeRange.asMuchAsElements //":66
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			getChart: async function(params={
				query: {
				},
				body: {
					symbol: undefined,
					chartDescription: undefined,
					timeRange: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'md/getchart', query: query || {}, body: body || {} })
			},

			cancelChart: async function(params={
				query: {
				},
				body: {
					subscriptionId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'md/cancelChart', query: query || {}, body: body || {} })
			},


		}

		this.auth = {
			/**
			 * ## POST /auth/accesstokenrequest
			 * 
			 * @description ### Request an access token using your user credentials and API Key. 
See the [Access](/#tag/Access) section for more details. For a comprehensive guide on how to acquire and use an access token in the JavaScript language, see out [JavaScript tutorial](https://github.com/tradovate/example-api-js) repository. For usage examples using the C# language, see the [C# example](https://github.com/tradovate/example-api-csharp-trading) repository.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.name 
			 * @param {String} body.password 
			 * @param {String} body.appId 
			 * @param {String} body.appVersion 
			 * @param {String} body.deviceId 
			 * @param {String} body.cid 
			 * @param {String} body.sec 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.accessToken 
			 * @return {String} res.expirationTime 
			 * @return {String} res.passwordExpirationTime 
			 * @return {String} res.userStatus Active, Closed, Initiated, TemporaryLocked, UnconfirmedEmail
			 * @return {Integer} res.userId 
			 * @return {String} res.name 
			 * @return {Boolean} res.hasLive 
			 */
			accessTokenRequest: async function (params={
				query: {
				},
				body: {
					name: undefined,
					password: undefined,
					appId: undefined,
					appVersion: undefined,
					deviceId: undefined,
					cid: undefined,
					sec: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'auth/accesstokenrequest', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /auth/me
			 * 
			 * @description ### Shows Basic user data for the calling user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Integer} res.userId 
			 * @return {String} res.name 
			 * @return {String} res.fullName 
			 * @return {String} res.email 
			 * @return {Boolean} res.emailVerified 
			 * @return {Boolean} res.isTrial 
			 */
			me: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'auth/me', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /auth/oauthtoken
			 * 
			 * @description ### Used to exchange your OAuth code for an access token.
Using the OAuth authorization delegation flow, we can send a request to verify that our users are who they say they are. For more information on using OAuth with the Tradovate API see our [OAuth JavaScript tutorial](https://github.com/tradovate/example-api-oauth).
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.grant_type 
			 * @param {String} body.code 
			 * @param {String} body.redirect_uri 
			 * @param {String} body.client_id 
			 * @param {String} body.client_secret 
			 * @param {String} body.httpAuth 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.access_token 
			 * @return {String} res.token_type 
			 * @return {Integer} res.expires_in 
			 * @return {String} res.error 
			 * @return {String} res.error_description 
			 */
			oAuthToken: async function (params={
				query: {
				},
				body: {
					grant_type: undefined,
					code: undefined,
					redirect_uri: undefined,
					client_id: undefined,
					client_secret: undefined,
					httpAuth: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'auth/oauthtoken', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /auth/renewaccesstoken
			 * 
			 * @description ### Request a renewal for an existing access token.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.accessToken 
			 * @return {String} res.expirationTime 
			 * @return {String} res.passwordExpirationTime 
			 * @return {String} res.userStatus Active, Closed, Initiated, TemporaryLocked, UnconfirmedEmail
			 * @return {Integer} res.userId 
			 * @return {String} res.name 
			 * @return {Boolean} res.hasLive 
			 */
			renewAccessToken: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'auth/renewaccesstoken', query: query || {}, body: body || {} })
			},
		};
		this.contract = {
			/**
			 * ## GET /contract/deps
			 * 
			 * @description Retrieves all entities of Contract type related to ContractMaturity entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of ContractMaturity entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contract/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contract/find
			 * 
			 * @description Retrieves an entity of Contract type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {Integer} res.contractMaturityId 
			 */
			contractFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contract/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /contract/getproductfeeparams
			 * 
			 * @description ### Query the a product&#x27;s fee parameters.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Array} body.productIds 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Array} res.params 
			 */
			getProductFeeParams: async function (params={
				query: {
				},
				body: {
					productIds: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contract/getproductfeeparams', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contract/item
			 * 
			 * @description Retrieves an entity of Contract type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {Integer} res.contractMaturityId 
			 */
			contractItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contract/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contract/items
			 * 
			 * @description Retrieves multiple entities of Contract type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contract/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contract/ldeps
			 * 
			 * @description Retrieves all entities of Contract type related to multiple entities of ContractMaturity type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of ContractMaturity entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contract/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /contract/rollcontract
			 * 
			 * @description ### Request the best upcoming maturity date for a given contract.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.name 
			 * @param {Boolean} body.forward 
			 * @param {Boolean} body.ifExpired 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.contract 
			 */
			rollContract: async function (params={
				query: {
				},
				body: {
					name: undefined,
					forward: undefined,
					ifExpired: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contract/rollcontract', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contract/suggest
			 * 
			 * @description Retrieves entities of Contract type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contract/suggest', query: query || {}, body: body || {} })
			},
		};
		this.contractGroup = {
			/**
			 * ## GET /contractGroup/find
			 * 
			 * @description Retrieves an entity of ContractGroup type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 */
			contractGroupFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractGroup/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractGroup/item
			 * 
			 * @description Retrieves an entity of ContractGroup type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 */
			contractGroupItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractGroup/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractGroup/items
			 * 
			 * @description Retrieves multiple entities of ContractGroup type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractGroupItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractGroup/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractGroup/list
			 * 
			 * @description Retrieves all entities of ContractGroup type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractGroupList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractGroup/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractGroup/suggest
			 * 
			 * @description Retrieves entities of ContractGroup type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractGroupSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractGroup/suggest', query: query || {}, body: body || {} })
			},
		};
		this.contractMaturity = {
			/**
			 * ## GET /contractMaturity/deps
			 * 
			 * @description Retrieves all entities of ContractMaturity type related to Product entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Product entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractMaturityDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractMaturity/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractMaturity/item
			 * 
			 * @description Retrieves an entity of ContractMaturity type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.productId 
			 * @return {Integer} res.expirationMonth 
			 * @return {String} res.expirationDate 
			 * @return {String} res.firstIntentDate 
			 * @return {Integer} res.underlyingId Underlying
			 * @return {Boolean} res.isFront 
			 */
			contractMaturityItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractMaturity/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractMaturity/items
			 * 
			 * @description Retrieves multiple entities of ContractMaturity type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractMaturityItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractMaturity/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractMaturity/ldeps
			 * 
			 * @description Retrieves all entities of ContractMaturity type related to multiple entities of Product type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Product entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractMaturityLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractMaturity/ldeps', query: query || {}, body: body || {} })
			},
		};
		this.currency = {
			/**
			 * ## GET /currency/find
			 * 
			 * @description Retrieves an entity of Currency type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.symbol 
			 */
			currencyFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currency/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /currency/item
			 * 
			 * @description Retrieves an entity of Currency type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.symbol 
			 */
			currencyItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currency/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /currency/items
			 * 
			 * @description Retrieves multiple entities of Currency type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			currencyItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currency/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /currency/list
			 * 
			 * @description Retrieves all entities of Currency type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			currencyList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currency/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /currency/suggest
			 * 
			 * @description Retrieves entities of Currency type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			currencySuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currency/suggest', query: query || {}, body: body || {} })
			},
		};
		this.currencyRate = {
			/**
			 * ## GET /currencyRate/deps
			 * 
			 * @description Retrieves all entities of CurrencyRate type related to Currency entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Currency entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			currencyRateDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currencyRate/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /currencyRate/item
			 * 
			 * @description Retrieves an entity of CurrencyRate type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.timestamp 
			 * @return {Number} res.rate 
			 */
			currencyRateItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currencyRate/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /currencyRate/items
			 * 
			 * @description Retrieves multiple entities of CurrencyRate type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			currencyRateItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currencyRate/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /currencyRate/ldeps
			 * 
			 * @description Retrieves all entities of CurrencyRate type related to multiple entities of Currency type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Currency entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			currencyRateLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currencyRate/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /currencyRate/list
			 * 
			 * @description Retrieves all entities of CurrencyRate type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			currencyRateList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'currencyRate/list', query: query || {}, body: body || {} })
			},
		};
		this.exchange = {
			/**
			 * ## GET /exchange/find
			 * 
			 * @description Retrieves an entity of Exchange type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 */
			exchangeFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'exchange/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /exchange/item
			 * 
			 * @description Retrieves an entity of Exchange type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 */
			exchangeItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'exchange/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /exchange/items
			 * 
			 * @description Retrieves multiple entities of Exchange type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			exchangeItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'exchange/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /exchange/list
			 * 
			 * @description Retrieves all entities of Exchange type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			exchangeList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'exchange/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /exchange/suggest
			 * 
			 * @description Retrieves entities of Exchange type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			exchangeSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'exchange/suggest', query: query || {}, body: body || {} })
			},
		};
		this.product = {
			/**
			 * ## GET /product/deps
			 * 
			 * @description Retrieves all entities of Product type related to Exchange entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Exchange entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'product/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /product/find
			 * 
			 * @description Retrieves an entity of Product type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {Integer} res.currencyId 
			 * @return {String} res.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @return {String} res.description 
			 * @return {Integer} res.exchangeId 
			 * @return {Integer} res.contractGroupId 
			 * @return {Integer} res.riskDiscountContractGroupId 
			 * @return {String} res.status Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @return {String} res.months 
			 * @return {Boolean} res.isSecured 
			 * @return {Number} res.valuePerPoint 
			 * @return {String} res.priceFormatType Decimal, Fractional
			 * @return {Integer} res.priceFormat 
			 * @return {Number} res.tickSize Product Tick Size
			 */
			productFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'product/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /product/item
			 * 
			 * @description Retrieves an entity of Product type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {Integer} res.currencyId 
			 * @return {String} res.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @return {String} res.description 
			 * @return {Integer} res.exchangeId 
			 * @return {Integer} res.contractGroupId 
			 * @return {Integer} res.riskDiscountContractGroupId 
			 * @return {String} res.status Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @return {String} res.months 
			 * @return {Boolean} res.isSecured 
			 * @return {Number} res.valuePerPoint 
			 * @return {String} res.priceFormatType Decimal, Fractional
			 * @return {Integer} res.priceFormat 
			 * @return {Number} res.tickSize Product Tick Size
			 */
			productItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'product/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /product/items
			 * 
			 * @description Retrieves multiple entities of Product type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'product/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /product/ldeps
			 * 
			 * @description Retrieves all entities of Product type related to multiple entities of Exchange type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Exchange entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'product/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /product/list
			 * 
			 * @description Retrieves all entities of Product type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'product/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /product/suggest
			 * 
			 * @description Retrieves entities of Product type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'product/suggest', query: query || {}, body: body || {} })
			},
		};
		this.productSession = {
			/**
			 * ## GET /productSession/deps
			 * 
			 * @description Retrieves all entities of ProductSession type related to Product entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Product entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productSessionDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productSession/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /productSession/item
			 * 
			 * @description Retrieves an entity of ProductSession type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {} res.openTime 
			 * @return {} res.startTime 
			 * @return {} res.stopTime 
			 * @return {} res.closeTime 
			 * @return {} res.sundayOpenTime 
			 */
			productSessionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productSession/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /productSession/items
			 * 
			 * @description Retrieves multiple entities of ProductSession type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productSessionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productSession/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /productSession/ldeps
			 * 
			 * @description Retrieves all entities of ProductSession type related to multiple entities of Product type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Product entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productSessionLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productSession/ldeps', query: query || {}, body: body || {} })
			},
		};
		this.spreadDefinition = {
			/**
			 * ## GET /spreadDefinition/item
			 * 
			 * @description Retrieves an entity of SpreadDefinition type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.timestamp 
			 * @return {String} res.spreadType Bundle, BundleSpread, Butterfly, CalendarSpread, Condor, Crack, DoubleButterfly, General, IntercommoditySpread, LaggedIntercommoditySpread, Pack, PackButterfly, PackSpread, ReducedTickCalendarSpread, ReverseIntercommoditySpread, ReverseSpread, Strip, TreasuryIntercommoditySpread
			 * @return {Boolean} res.uds 
			 */
			spreadDefinitionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'spreadDefinition/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /spreadDefinition/items
			 * 
			 * @description Retrieves multiple entities of SpreadDefinition type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			spreadDefinitionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'spreadDefinition/items', query: query || {}, body: body || {} })
			},
		};
		this.command = {
			/**
			 * ## GET /command/deps
			 * 
			 * @description Retrieves all entities of Command type related to Order entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Order entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			commandDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'command/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /command/item
			 * 
			 * @description Retrieves an entity of Command type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.orderId 
			 * @return {String} res.timestamp 
			 * @return {String} res.clOrdId 
			 * @return {String} res.commandType Cancel, Modify, New
			 * @return {String} res.commandStatus AtExecution, ExecutionRejected, ExecutionStopped, ExecutionSuspended, OnHold, Pending, PendingExecution, Replaced, RiskPassed, RiskRejected
			 * @return {Integer} res.senderId 
			 * @return {Integer} res.userSessionId 
			 * @return {String} res.activationTime 
			 * @return {String} res.customTag50 
			 * @return {Boolean} res.isAutomated 
			 */
			commandItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'command/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /command/items
			 * 
			 * @description Retrieves multiple entities of Command type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			commandItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'command/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /command/ldeps
			 * 
			 * @description Retrieves all entities of Command type related to multiple entities of Order type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Order entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			commandLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'command/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /command/list
			 * 
			 * @description Retrieves all entities of Command type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			commandList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'command/list', query: query || {}, body: body || {} })
			},
		};
		this.commandReport = {
			/**
			 * ## GET /commandReport/deps
			 * 
			 * @description Retrieves all entities of CommandReport type related to Command entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Command entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			commandReportDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'commandReport/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /commandReport/item
			 * 
			 * @description Retrieves an entity of CommandReport type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.commandId 
			 * @return {String} res.timestamp 
			 * @return {String} res.commandStatus AtExecution, ExecutionRejected, ExecutionStopped, ExecutionSuspended, OnHold, Pending, PendingExecution, Replaced, RiskPassed, RiskRejected
			 * @return {String} res.rejectReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.text 
			 * @return {String} res.ordStatus Canceled, Completed, Expired, Filled, PendingCancel, PendingNew, PendingReplace, Rejected, Suspended, Unknown, Working
			 */
			commandReportItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'commandReport/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /commandReport/items
			 * 
			 * @description Retrieves multiple entities of CommandReport type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			commandReportItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'commandReport/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /commandReport/ldeps
			 * 
			 * @description Retrieves all entities of CommandReport type related to multiple entities of Command type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Command entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			commandReportLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'commandReport/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /commandReport/list
			 * 
			 * @description Retrieves all entities of CommandReport type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			commandReportList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'commandReport/list', query: query || {}, body: body || {} })
			},
		};
		this.executionReport = {
			/**
			 * ## GET /executionReport/deps
			 * 
			 * @description Retrieves all entities of ExecutionReport type related to Command entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Command entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			executionReportDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'executionReport/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /executionReport/find
			 * 
			 * @description Retrieves an entity of ExecutionReport type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.commandId 
			 * @return {String} res.name 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.contractId 
			 * @return {String} res.timestamp 
			 * @return {} res.tradeDate 
			 * @return {Integer} res.orderId 
			 * @return {String} res.execType Canceled, Completed, DoneForDay, Expired, New, OrderStatus, PendingCancel, PendingNew, PendingReplace, Rejected, Replaced, Stopped, Suspended, Trade, TradeCancel, TradeCorrect
			 * @return {String} res.execRefId 
			 * @return {String} res.ordStatus Canceled, Completed, Expired, Filled, PendingCancel, PendingNew, PendingReplace, Rejected, Suspended, Unknown, Working
			 * @return {String} res.action Buy, Sell
			 * @return {Integer} res.cumQty 
			 * @return {Number} res.avgPx 
			 * @return {Integer} res.lastQty 
			 * @return {Number} res.lastPx 
			 * @return {String} res.rejectReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.text 
			 * @return {String} res.exchangeOrderId 
			 */
			executionReportFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'executionReport/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /executionReport/item
			 * 
			 * @description Retrieves an entity of ExecutionReport type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.commandId 
			 * @return {String} res.name 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.contractId 
			 * @return {String} res.timestamp 
			 * @return {} res.tradeDate 
			 * @return {Integer} res.orderId 
			 * @return {String} res.execType Canceled, Completed, DoneForDay, Expired, New, OrderStatus, PendingCancel, PendingNew, PendingReplace, Rejected, Replaced, Stopped, Suspended, Trade, TradeCancel, TradeCorrect
			 * @return {String} res.execRefId 
			 * @return {String} res.ordStatus Canceled, Completed, Expired, Filled, PendingCancel, PendingNew, PendingReplace, Rejected, Suspended, Unknown, Working
			 * @return {String} res.action Buy, Sell
			 * @return {Integer} res.cumQty 
			 * @return {Number} res.avgPx 
			 * @return {Integer} res.lastQty 
			 * @return {Number} res.lastPx 
			 * @return {String} res.rejectReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.text 
			 * @return {String} res.exchangeOrderId 
			 */
			executionReportItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'executionReport/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /executionReport/items
			 * 
			 * @description Retrieves multiple entities of ExecutionReport type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			executionReportItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'executionReport/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /executionReport/ldeps
			 * 
			 * @description Retrieves all entities of ExecutionReport type related to multiple entities of Command type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Command entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			executionReportLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'executionReport/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /executionReport/list
			 * 
			 * @description Retrieves all entities of ExecutionReport type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			executionReportList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'executionReport/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /executionReport/suggest
			 * 
			 * @description Retrieves entities of ExecutionReport type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			executionReportSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'executionReport/suggest', query: query || {}, body: body || {} })
			},
		};
		this.fill = {
			/**
			 * ## GET /fill/deps
			 * 
			 * @description Retrieves all entities of Fill type related to Order entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Order entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fill/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fill/item
			 * 
			 * @description Retrieves an entity of Fill type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.orderId 
			 * @return {Integer} res.contractId 
			 * @return {String} res.timestamp 
			 * @return {} res.tradeDate 
			 * @return {String} res.action Buy, Sell
			 * @return {Integer} res.qty 
			 * @return {Number} res.price 
			 * @return {Boolean} res.active 
			 * @return {Integer} res.finallyPaired 
			 */
			fillItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fill/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fill/items
			 * 
			 * @description Retrieves multiple entities of Fill type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fill/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fill/ldeps
			 * 
			 * @description Retrieves all entities of Fill type related to multiple entities of Order type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Order entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fill/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fill/list
			 * 
			 * @description Retrieves all entities of Fill type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fill/list', query: query || {}, body: body || {} })
			},
		};
		this.fillFee = {
			/**
			 * ## GET /fillFee/deps
			 * 
			 * @description Retrieves all entities of FillFee type related to Fill entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Fill entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillFeeDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillFee/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fillFee/item
			 * 
			 * @description Retrieves an entity of FillFee type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Number} res.clearingFee 
			 * @return {Integer} res.clearingCurrencyId 
			 * @return {Number} res.exchangeFee 
			 * @return {Integer} res.exchangeCurrencyId 
			 * @return {Number} res.nfaFee 
			 * @return {Integer} res.nfaCurrencyId 
			 * @return {Number} res.brokerageFee 
			 * @return {Integer} res.brokerageCurrencyId 
			 * @return {Number} res.ipFee 
			 * @return {Integer} res.ipCurrencyId 
			 * @return {Number} res.commission 
			 * @return {Integer} res.commissionCurrencyId 
			 * @return {Number} res.orderRoutingFee 
			 * @return {Integer} res.orderRoutingCurrencyId 
			 */
			fillFeeItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillFee/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fillFee/items
			 * 
			 * @description Retrieves multiple entities of FillFee type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillFeeItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillFee/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fillFee/ldeps
			 * 
			 * @description Retrieves all entities of FillFee type related to multiple entities of Fill type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Fill entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillFeeLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillFee/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fillFee/list
			 * 
			 * @description Retrieves all entities of FillFee type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillFeeList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillFee/list', query: query || {}, body: body || {} })
			},
		};
		this.order = {
			/**
			 * ## POST /order/cancelorder
			 * 
			 * @description ### Make a request to cancel an order.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.orderId 
			 * @param {String} body.clOrdId 
			 * @param {String} body.activationTime 
			 * @param {String} body.customTag50 
			 * @param {Boolean} body.isAutomated 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.failureReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.failureText 
			 * @return {Integer} res.commandId 
			 */
			cancelOrder: async function (params={
				query: {
				},
				body: {
					orderId: undefined,
					clOrdId: undefined,
					activationTime: undefined,
					customTag50: undefined,
					isAutomated: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/cancelorder', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /order/deps
			 * 
			 * @description Retrieves all entities of Order type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /order/item
			 * 
			 * @description Retrieves an entity of Order type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.contractId 
			 * @return {Integer} res.spreadDefinitionId 
			 * @return {String} res.timestamp Create Time
			 * @return {String} res.action Buy, Sell
			 * @return {String} res.ordStatus Canceled, Completed, Expired, Filled, PendingCancel, PendingNew, PendingReplace, Rejected, Suspended, Unknown, Working
			 * @return {Integer} res.executionProviderId 
			 * @return {Integer} res.ocoId 
			 * @return {Integer} res.parentId 
			 * @return {Integer} res.linkedId 
			 * @return {Boolean} res.admin 
			 */
			orderItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /order/items
			 * 
			 * @description Retrieves multiple entities of Order type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /order/ldeps
			 * 
			 * @description Retrieves all entities of Order type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /order/liquidateposition
			 * 
			 * @description ### Send a request to cancel orders for a specific contract and close that position for the given account.
This request initiates the cancellation process of open orders for an existing position held by this account.
&gt; Note: This is a request to cancel orders and close a position, not a guarantee. Any operation could fail for a number of reasons, ranging from Exchange rejection to incorrect parameterization.

			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.contractId 
			 * @param {Boolean} body.admin 
			 * @param {String} body.customTag50 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.failureReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.failureText 
			 * @return {Integer} res.orderId 
			 */
			liquidatePosition: async function (params={
				query: {
				},
				body: {
					accountId: undefined,
					contractId: undefined,
					admin: undefined,
					customTag50: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/liquidateposition', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /order/list
			 * 
			 * @description Retrieves all entities of Order type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /order/modifyorder
			 * 
			 * @description ### Make a request to modify the parameters of an order.
You can request changes to an order, such as the trigger price for a Stop or Limit order.
&gt; Note: This is no guarantee that the order can be modified in a given way. Market and exchange rules apply.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.orderId 
			 * @param {String} body.clOrdId 
			 * @param {Integer} body.orderQty 
			 * @param {String} body.orderType Limit, MIT, Market, QTS, Stop, StopLimit, TrailingStop, TrailingStopLimit
			 * @param {Number} body.price 
			 * @param {Number} body.stopPrice 
			 * @param {Integer} body.maxShow 
			 * @param {Number} body.pegDifference 
			 * @param {String} body.timeInForce Day, FOK, GTC, GTD, IOC
			 * @param {String} body.expireTime 
			 * @param {String} body.text 
			 * @param {String} body.activationTime 
			 * @param {String} body.customTag50 
			 * @param {Boolean} body.isAutomated 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.failureReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.failureText 
			 * @return {Integer} res.commandId 
			 */
			modifyOrder: async function (params={
				query: {
				},
				body: {
					orderId: undefined,
					clOrdId: undefined,
					orderQty: undefined,
					orderType: undefined,
					price: undefined,
					stopPrice: undefined,
					maxShow: undefined,
					pegDifference: undefined,
					timeInForce: undefined,
					expireTime: undefined,
					text: undefined,
					activationTime: undefined,
					customTag50: undefined,
					isAutomated: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/modifyorder', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /order/placeoco
			 * 
			 * @description ### Place a Order Cancels Order order strategy.
OCO order strategies link 2 orders together such that if one order is filled, the other order is cancelled. You must provide an &#x60;other&#x60; parameter pertaining to the order linked to this one. The &#x60;other&#x60; must specify an &#x60;action&#x60; and an &#x60;orderType&#x60; which determines the other parameters that must be set. For example a Limit or Stop order must use the &#x60;price&#x60; parameter, but a Stop-Limit will require a &#x60;price&#x60; and a &#x60;stopPrice&#x60;. Below is an example of an OCO that either sells to take profit at 4200 points, or sells to stop loss at 4100 points.

&#x60;&#x60;&#x60;js
const URL &#x3D; &#x27;demo.tradovateapi.com/v1&#x27;
const limit &#x3D; {
    action: &#x27;Sell&#x27;,
    orderType: &#x27;Limit&#x27;,
    price: 4200.00
}
const oco &#x3D; {
    accountSpec: yourUserName,
    accountId: yourAcctId,
    action: &quot;Buy&quot;,
    symbol: &quot;MESM1&quot;,
    orderQty: 1,
    orderType: &quot;Stop&quot;,
    price: 4100.00
    isAutomated: true, //must be true if this isn&#x27;t an order made directly by a human
    other: limit
}

const response &#x3D; await fetch(URL + &#x27;/order/placeoco&#x27;, {
    method: &#x27;POST&#x27;,
    headers: {
        &#x27;Accept&#x27;: &#x27;application/json&#x27;,
        &#x27;Authorization&#x27;: &#x60;Bearer ${myAccessToken}&#x60;,
    },
    body: JSON.stringify(oco)
})

const json &#x3D; await response.json() // { orderId: 0000000, ocoId: 0000000 }
&#x60;&#x60;&#x60;
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.accountSpec 
			 * @param {Integer} body.accountId 
			 * @param {String} body.clOrdId 
			 * @param {String} body.action Buy, Sell
			 * @param {String} body.symbol 
			 * @param {Integer} body.orderQty 
			 * @param {String} body.orderType Limit, MIT, Market, QTS, Stop, StopLimit, TrailingStop, TrailingStopLimit
			 * @param {Number} body.price 
			 * @param {Number} body.stopPrice 
			 * @param {Integer} body.maxShow 
			 * @param {Number} body.pegDifference 
			 * @param {String} body.timeInForce Day, FOK, GTC, GTD, IOC
			 * @param {String} body.expireTime 
			 * @param {String} body.text 
			 * @param {String} body.activationTime 
			 * @param {String} body.customTag50 
			 * @param {Boolean} body.isAutomated 
			 * @param {} body.other 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.failureReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.failureText 
			 * @return {Integer} res.orderId 
			 * @return {Integer} res.ocoId 
			 */
			placeOCO: async function (params={
				query: {
				},
				body: {
					accountSpec: undefined,
					accountId: undefined,
					clOrdId: undefined,
					action: undefined,
					symbol: undefined,
					orderQty: undefined,
					orderType: undefined,
					price: undefined,
					stopPrice: undefined,
					maxShow: undefined,
					pegDifference: undefined,
					timeInForce: undefined,
					expireTime: undefined,
					text: undefined,
					activationTime: undefined,
					customTag50: undefined,
					isAutomated: undefined,
					other: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/placeoco', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /order/placeorder
			 * 
			 * @description ### Make a request to place an order. 
Depending on the order type, the parameters vary. In the Trader application, you can see the details of placing a standard order ticket by adding the Order Ticket module to your workspace.

#### *Market Order*
&#x60;&#x60;&#x60;js
const URL &#x3D; &#x27;demo.tradovateapi.com/v1&#x27;
const body &#x3D; {
    accountSpec: yourUserName,
    accountId: yourAcctId,
    action: &quot;Buy&quot;,
    symbol: &quot;MYMM1&quot;,
    orderQty: 1,
    orderType: &quot;Market&quot;,
    isAutomated: true //must be true if this isn&#x27;t an order made directly by a human
}

const response &#x3D; await fetch(URL + &#x27;/order/placeorder&#x27;, {
    method: &#x27;POST&#x27;,
    headers: {
        &#x27;Accept&#x27;: &#x27;application/json&#x27;,
        &#x27;Authorization&#x27;: &#x60;Bearer ${myAccessToken}&#x60;,
    },
    body: JSON.stringify(body)
})

const json &#x3D; await response.json() // { orderId: 0000000 }

&#x60;&#x60;&#x60;

#### *Sell Limit*
&#x60;&#x60;&#x60;js
const URL &#x3D; &#x27;demo.tradovateapi.com/v1&#x27;
const body &#x3D; {
    accountSpec: yourUserName,
    accountId: yourAcctId,
    action: &quot;Sell&quot;,
    symbol: &quot;MYMM1&quot;,
    orderQty: 1,
    orderType: &quot;Limit&quot;,
    price: 35000, //use for single value like limit or stop
    isAutomated: true //must be true if this isn&#x27;t an order made directly by a human
}

const response &#x3D; await fetch(URL + &#x27;/order/placeorder&#x27;, {
    method: &#x27;POST&#x27;,
    headers: {
        &#x27;Accept&#x27;: &#x27;application/json&#x27;,
        &#x27;Authorization&#x27;: &#x60;Bearer ${myAccessToken}&#x60;,
    },
    body: JSON.stringify(body)
})

const json &#x3D; await response.json() // { orderId: 0000000 }

&#x60;&#x60;&#x60;

			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.accountSpec 
			 * @param {Integer} body.accountId 
			 * @param {String} body.clOrdId 
			 * @param {String} body.action Buy, Sell
			 * @param {String} body.symbol 
			 * @param {Integer} body.orderQty 
			 * @param {String} body.orderType Limit, MIT, Market, QTS, Stop, StopLimit, TrailingStop, TrailingStopLimit
			 * @param {Number} body.price 
			 * @param {Number} body.stopPrice 
			 * @param {Integer} body.maxShow 
			 * @param {Number} body.pegDifference 
			 * @param {String} body.timeInForce Day, FOK, GTC, GTD, IOC
			 * @param {String} body.expireTime 
			 * @param {String} body.text 
			 * @param {String} body.activationTime 
			 * @param {String} body.customTag50 
			 * @param {Boolean} body.isAutomated 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.failureReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.failureText 
			 * @return {Integer} res.orderId 
			 */
			placeOrder: async function (params={
				query: {
				},
				body: {
					accountSpec: undefined,
					accountId: undefined,
					clOrdId: undefined,
					action: undefined,
					symbol: undefined,
					orderQty: undefined,
					orderType: undefined,
					price: undefined,
					stopPrice: undefined,
					maxShow: undefined,
					pegDifference: undefined,
					timeInForce: undefined,
					expireTime: undefined,
					text: undefined,
					activationTime: undefined,
					customTag50: undefined,
					isAutomated: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/placeorder', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /order/placeoso
			 * 
			 * @description ### Place an Order Sends Order order strategy.
In the Trader application, the details of OSO orders can be viewed by adding the Order Ticket module to your workspace and selecting the Advanced workspace options with Brackets enabled. OSO orders allow for the most complex multi-bracket trading strategies. As an example, imagine MESM1 is trading around 4175.00 points. You want to place a Buy order for 4150.00 points, buying below market. We place an OSO to take profits at 4200.00 points. If the initial order is filled, the &#x60;bracket1&#x60; order will be sent. Below is an example in JavaScript:

&#x60;&#x60;&#x60;js
const URL &#x3D; &#x27;demo.tradovateapi.com/v1&#x27;

const oso &#x3D; {
    action: &#x27;Sell&#x27;,
    orderType: &#x27;Limit&#x27;,
    price: 4200.00,
}

const initial &#x3D; {
    accountSpec: yourUserName,
    accountId: yourAcctId,
    action: &quot;Buy&quot;,
    symbol: &quot;MESM1&quot;,
    orderQty: 1,
    orderType: &quot;Limit&quot;,
    price: 4150.00,
    isAutomated: true //must be true if this isn&#x27;t an order made directly by a human
    bracket1: oso
}

const response &#x3D; await fetch(URL + &#x27;/order/placeorder&#x27;, {
    method: &#x27;POST&#x27;,
    headers: {
        &#x27;Accept&#x27;: &#x27;application/json&#x27;,
        &#x27;Authorization&#x27;: &#x60;Bearer ${myAccessToken}&#x60;,
    },
    body: JSON.stringify(initial)
})

const json &#x3D; await response.json() // { orderId: 0000000 }
&#x60;&#x60;&#x60;
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.accountSpec 
			 * @param {Integer} body.accountId 
			 * @param {String} body.clOrdId 
			 * @param {String} body.action Buy, Sell
			 * @param {String} body.symbol 
			 * @param {Integer} body.orderQty 
			 * @param {String} body.orderType Limit, MIT, Market, QTS, Stop, StopLimit, TrailingStop, TrailingStopLimit
			 * @param {Number} body.price 
			 * @param {Number} body.stopPrice 
			 * @param {Integer} body.maxShow 
			 * @param {Number} body.pegDifference 
			 * @param {String} body.timeInForce Day, FOK, GTC, GTD, IOC
			 * @param {String} body.expireTime 
			 * @param {String} body.text 
			 * @param {String} body.activationTime 
			 * @param {String} body.customTag50 
			 * @param {Boolean} body.isAutomated 
			 * @param {} body.bracket1 
			 * @param {} body.bracket2 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.failureReason AccountClosed, AdvancedTrailingStopUnsupported, AnotherCommandPending, BackMonthProhibited, ExecutionProviderNotConfigured, ExecutionProviderUnavailable, InvalidContract, InvalidPrice, LiquidationOnly, LiquidationOnlyBeforeExpiration, MaxOrderQtyIsNotSpecified, MaxOrderQtyLimitReached, MaxPosLimitMisconfigured, MaxPosLimitReached, MaxTotalPosLimitReached, MultipleAccountPlanRequired, NoQuote, NotEnoughLiquidity, OtherExecutionRelated, ParentRejected, RiskCheckTimeout, SessionClosed, Success, TooLate, TradingLocked, TrailingStopNonOrderQtyModify, Unauthorized, UnknownReason, Unsupported
			 * @return {String} res.failureText 
			 * @return {Integer} res.orderId 
			 * @return {Integer} res.oso1Id 
			 * @return {Integer} res.oso2Id 
			 */
			placeOSO: async function (params={
				query: {
				},
				body: {
					accountSpec: undefined,
					accountId: undefined,
					clOrdId: undefined,
					action: undefined,
					symbol: undefined,
					orderQty: undefined,
					orderType: undefined,
					price: undefined,
					stopPrice: undefined,
					maxShow: undefined,
					pegDifference: undefined,
					timeInForce: undefined,
					expireTime: undefined,
					text: undefined,
					activationTime: undefined,
					customTag50: undefined,
					isAutomated: undefined,
					bracket1: undefined,
					bracket2: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'order/placeoso', query: query || {}, body: body || {} })
			},
		};
		this.orderStrategy = {
			/**
			 * ## GET /orderStrategy/deps
			 * 
			 * @description Retrieves all entities of OrderStrategy type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategy/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /orderStrategy/interruptorderstrategy
			 * 
			 * @description ### Stop a running multi-bracket strategy.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.orderStrategyId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.orderStrategy 
			 */
			interruptOrderStrategy: async function (params={
				query: {
				},
				body: {
					orderStrategyId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategy/interruptorderstrategy', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategy/item
			 * 
			 * @description Retrieves an entity of OrderStrategy type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.accountId 
			 * @return {String} res.timestamp 
			 * @return {Integer} res.contractId 
			 * @return {Integer} res.orderStrategyTypeId 
			 * @return {Integer} res.initiatorId 
			 * @return {String} res.action Buy, Sell
			 * @return {String} res.params 
			 * @return {String} res.uuid 
			 * @return {String} res.status ActiveStrategy, ExecutionFailed, ExecutionFinished, ExecutionInterrupted, InactiveStrategy, NotEnoughLiquidity, StoppedByUser
			 * @return {String} res.failureMessage 
			 * @return {Integer} res.senderId 
			 * @return {String} res.customTag50 
			 */
			orderStrategyItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategy/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategy/items
			 * 
			 * @description Retrieves multiple entities of OrderStrategy type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategy/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategy/ldeps
			 * 
			 * @description Retrieves all entities of OrderStrategy type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategy/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategy/list
			 * 
			 * @description Retrieves all entities of OrderStrategy type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategy/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /orderStrategy/modifyorderstrategy
			 * 
			 * @description ### Modify the order strategy used for an existing order.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.orderStrategyId 
			 * @param {String} body.command 
			 * @param {String} body.customTag50 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.orderStrategy 
			 */
			modifyOrderStrategy: async function (params={
				query: {
				},
				body: {
					orderStrategyId: undefined,
					command: undefined,
					customTag50: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategy/modifyorderstrategy', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /orderStrategy/startorderstrategy
			 * 
			 * @description ### Start a multi-bracket trading strategy.
You can create any number of brackets and add them to &#x60;bracket&#x60; field on the &#x60;params&#x60; object as a JSON string.
&#x60;&#x60;&#x60;js

const URL &#x3D; &#x27;demo.tradovateapi.com/v1&#x27;

const bracket1 &#x3D; {
    qty: 1,
    profitTarget: -30,
    stopLoss: 5.5,
    trailingStop: false
}

const bracket2 &#x3D; {
    qty: 1,
    profitTarget: 40.75,
    stopLoss: -5.5,
    trailingStop: false
}

const params &#x3D; {
    entryVersion: {
        orderQty: 1,
        orderType: &quot;Stop&quot;,
        stopPrice: 4174.50,
    },
    brackets: [bracket1, bracket2]
}

const body &#x3D; {
    accountId: id,
    accountSpec: name,
    symbol: &#x27;MESM1&#x27;,
    action: &#x27;Sell&#x27;,
    orderStrategyTypeId: 2,
    params: JSON.stringify(params)
}

const response &#x3D; await fetch(URL + &#x27;/orderStrategy/startOrderStrategy&#x27;, {
    method: &#x27;POST&#x27;,
    headers: {
        &#x27;Accept&#x27;: &#x27;application/json&#x27;,
        &#x27;Authorization&#x27;: &#x60;Bearer ${myAccessToken}&#x60;,
    },
    body: JSON.stringify(body)
})

const json &#x3D; await response.json() 

&#x60;&#x60;&#x60;

For more details about working with advanced order types, see [placeOrder](/#operation/placeOrder), [placeOCO](/#operation/placeOCO), and [placeOSO](/#operation/placeOSO). 

			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.accountId 
			 * @param {String} body.accountSpec 
			 * @param {String} body.symbol 
			 * @param {Integer} body.orderStrategyTypeId 
			 * @param {String} body.action Buy, Sell
			 * @param {String} body.params 
			 * @param {String} body.uuid 
			 * @param {String} body.customTag50 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.orderStrategy 
			 */
			startOrderStrategy: async function (params={
				query: {
				},
				body: {
					accountId: undefined,
					accountSpec: undefined,
					symbol: undefined,
					orderStrategyTypeId: undefined,
					action: undefined,
					params: undefined,
					uuid: undefined,
					customTag50: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategy/startorderstrategy', query: query || {}, body: body || {} })
			},
		};
		this.orderStrategyLink = {
			/**
			 * ## GET /orderStrategyLink/deps
			 * 
			 * @description Retrieves all entities of OrderStrategyLink type related to OrderStrategy entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of OrderStrategy entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyLinkDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyLink/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategyLink/item
			 * 
			 * @description Retrieves an entity of OrderStrategyLink type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.orderStrategyId 
			 * @return {Integer} res.orderId 
			 * @return {String} res.label 
			 */
			orderStrategyLinkItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyLink/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategyLink/items
			 * 
			 * @description Retrieves multiple entities of OrderStrategyLink type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyLinkItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyLink/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategyLink/ldeps
			 * 
			 * @description Retrieves all entities of OrderStrategyLink type related to multiple entities of OrderStrategy type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of OrderStrategy entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyLinkLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyLink/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategyLink/list
			 * 
			 * @description Retrieves all entities of OrderStrategyLink type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyLinkList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyLink/list', query: query || {}, body: body || {} })
			},
		};
		this.orderVersion = {
			/**
			 * ## GET /orderVersion/deps
			 * 
			 * @description Retrieves all entities of OrderVersion type related to Order entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Order entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderVersionDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderVersion/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderVersion/item
			 * 
			 * @description Retrieves an entity of OrderVersion type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.orderId 
			 * @return {Integer} res.orderQty 
			 * @return {String} res.orderType Limit, MIT, Market, QTS, Stop, StopLimit, TrailingStop, TrailingStopLimit
			 * @return {Number} res.price 
			 * @return {Number} res.stopPrice 
			 * @return {Integer} res.maxShow 
			 * @return {Number} res.pegDifference 
			 * @return {String} res.timeInForce Day, FOK, GTC, GTD, IOC
			 * @return {String} res.expireTime 
			 * @return {String} res.text 
			 */
			orderVersionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderVersion/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderVersion/items
			 * 
			 * @description Retrieves multiple entities of OrderVersion type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderVersionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderVersion/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderVersion/ldeps
			 * 
			 * @description Retrieves all entities of OrderVersion type related to multiple entities of Order type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Order entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderVersionLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderVersion/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderVersion/list
			 * 
			 * @description Retrieves all entities of OrderVersion type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderVersionList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderVersion/list', query: query || {}, body: body || {} })
			},
		};
		this.fillPair = {
			/**
			 * ## GET /fillPair/deps
			 * 
			 * @description Retrieves all entities of FillPair type related to Position entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Position entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillPairDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillPair/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fillPair/item
			 * 
			 * @description Retrieves an entity of FillPair type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.positionId 
			 * @return {Integer} res.buyFillId 
			 * @return {Integer} res.sellFillId 
			 * @return {Integer} res.qty 
			 * @return {Number} res.buyPrice 
			 * @return {Number} res.sellPrice 
			 * @return {Boolean} res.active 
			 */
			fillPairItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillPair/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fillPair/items
			 * 
			 * @description Retrieves multiple entities of FillPair type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillPairItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillPair/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fillPair/ldeps
			 * 
			 * @description Retrieves all entities of FillPair type related to multiple entities of Position type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Position entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillPairLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillPair/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /fillPair/list
			 * 
			 * @description Retrieves all entities of FillPair type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			fillPairList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'fillPair/list', query: query || {}, body: body || {} })
			},
		};
		this.position = {
			/**
			 * ## GET /position/deps
			 * 
			 * @description Retrieves all entities of Position type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			positionDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'position/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /position/find
			 * 
			 * @description Retrieves an entity of Position type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.contractId 
			 * @return {String} res.timestamp 
			 * @return {} res.tradeDate 
			 * @return {Integer} res.netPos 
			 * @return {Number} res.netPrice 
			 * @return {Integer} res.bought 
			 * @return {Number} res.boughtValue 
			 * @return {Integer} res.sold 
			 * @return {Number} res.soldValue 
			 * @return {Integer} res.prevPos 
			 * @return {Number} res.prevPrice 
			 */
			positionFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'position/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /position/item
			 * 
			 * @description Retrieves an entity of Position type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.contractId 
			 * @return {String} res.timestamp 
			 * @return {} res.tradeDate 
			 * @return {Integer} res.netPos 
			 * @return {Number} res.netPrice 
			 * @return {Integer} res.bought 
			 * @return {Number} res.boughtValue 
			 * @return {Integer} res.sold 
			 * @return {Number} res.soldValue 
			 * @return {Integer} res.prevPos 
			 * @return {Number} res.prevPrice 
			 */
			positionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'position/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /position/items
			 * 
			 * @description Retrieves multiple entities of Position type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			positionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'position/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /position/ldeps
			 * 
			 * @description Retrieves all entities of Position type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			positionLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'position/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /position/list
			 * 
			 * @description Retrieves all entities of Position type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			positionList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'position/list', query: query || {}, body: body || {} })
			},
		};
		this.account = {
			/**
			 * ## GET /account/deps
			 * 
			 * @description Retrieves all entities of Account type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'account/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /account/find
			 * 
			 * @description Retrieves an entity of Account type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {Integer} res.userId 
			 * @return {String} res.accountType Customer, Giveup, House, Omnibus, Wash
			 * @return {Boolean} res.active 
			 * @return {Integer} res.clearingHouseId 
			 * @return {Integer} res.riskCategoryId 
			 * @return {Integer} res.autoLiqProfileId 
			 * @return {String} res.marginAccountType Hedger, Speculator
			 * @return {String} res.legalStatus Corporation, GP, IRA, Individual, Joint, LLC, LLP, LP, Trust
			 * @return {Boolean} res.readonly 
			 */
			accountFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'account/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /account/item
			 * 
			 * @description Retrieves an entity of Account type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {Integer} res.userId 
			 * @return {String} res.accountType Customer, Giveup, House, Omnibus, Wash
			 * @return {Boolean} res.active 
			 * @return {Integer} res.clearingHouseId 
			 * @return {Integer} res.riskCategoryId 
			 * @return {Integer} res.autoLiqProfileId 
			 * @return {String} res.marginAccountType Hedger, Speculator
			 * @return {String} res.legalStatus Corporation, GP, IRA, Individual, Joint, LLC, LLP, LP, Trust
			 * @return {Boolean} res.readonly 
			 */
			accountItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'account/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /account/items
			 * 
			 * @description Retrieves multiple entities of Account type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'account/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /account/ldeps
			 * 
			 * @description Retrieves all entities of Account type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'account/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /account/list
			 * 
			 * @description Retrieves all entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'account/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /account/suggest
			 * 
			 * @description Retrieves entities of Account type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'account/suggest', query: query || {}, body: body || {} })
			},
		};
		this.cashBalance = {
			/**
			 * ## GET /cashBalance/deps
			 * 
			 * @description Retrieves all entities of CashBalance type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			cashBalanceDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalance/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /cashBalance/getcashbalancesnapshot
			 * 
			 * @description ### Get a snapshot of an account&#x27;s current cash balance.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.accountId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Number} res.totalCashValue 
			 * @return {Number} res.totalPnL 
			 * @return {Number} res.initialMargin 
			 * @return {Number} res.maintenanceMargin 
			 * @return {Number} res.netLiq 
			 * @return {Number} res.openPnL 
			 * @return {Number} res.realizedPnL 
			 * @return {Number} res.weekRealizedPnL 
			 */
			getCashBalanceSnapshot: async function (params={
				query: {
				},
				body: {
					accountId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalance/getcashbalancesnapshot', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /cashBalance/item
			 * 
			 * @description Retrieves an entity of CashBalance type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.accountId 
			 * @return {String} res.timestamp 
			 * @return {} res.tradeDate 
			 * @return {Integer} res.currencyId 
			 * @return {Number} res.amount 
			 * @return {Number} res.realizedPnL 
			 * @return {Number} res.weekRealizedPnL 
			 */
			cashBalanceItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalance/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /cashBalance/items
			 * 
			 * @description Retrieves multiple entities of CashBalance type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			cashBalanceItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalance/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /cashBalance/ldeps
			 * 
			 * @description Retrieves all entities of CashBalance type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			cashBalanceLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalance/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /cashBalance/list
			 * 
			 * @description Retrieves all entities of CashBalance type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			cashBalanceList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalance/list', query: query || {}, body: body || {} })
			},
		};
		this.cashBalanceLog = {
			/**
			 * ## GET /cashBalanceLog/deps
			 * 
			 * @description Retrieves all entities of CashBalanceLog type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			cashBalanceLogDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalanceLog/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /cashBalanceLog/item
			 * 
			 * @description Retrieves an entity of CashBalanceLog type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.accountId 
			 * @return {String} res.timestamp 
			 * @return {} res.tradeDate 
			 * @return {Integer} res.currencyId 
			 * @return {Number} res.amount 
			 * @return {Number} res.realizedPnL 
			 * @return {Number} res.weekRealizedPnL 
			 * @return {String} res.cashChangeType AutomaticReconciliation, BrokerageFee, CancelledPairedTrade, ClearingFee, Commission, DeskFee, EntitlementSubscription, ExchangeFee, FundTransaction, FundTransactionFee, IPFee, LiquidationFee, ManualAdjustment, MarketDataSubscription, NewSession, NfaFee, OptionsTrade, OrderRoutingFee, TradePaired, TradovateSubscription
			 * @return {Integer} res.fillPairId 
			 * @return {Integer} res.fillId 
			 * @return {Integer} res.fundTransactionId 
			 * @return {String} res.comment 
			 * @return {Number} res.delta 
			 */
			cashBalanceLogItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalanceLog/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /cashBalanceLog/items
			 * 
			 * @description Retrieves multiple entities of CashBalanceLog type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			cashBalanceLogItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalanceLog/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /cashBalanceLog/ldeps
			 * 
			 * @description Retrieves all entities of CashBalanceLog type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			cashBalanceLogLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'cashBalanceLog/ldeps', query: query || {}, body: body || {} })
			},
		};
		this.marginSnapshot = {
			/**
			 * ## GET /marginSnapshot/deps
			 * 
			 * @description Retrieves all entities of MarginSnapshot type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marginSnapshotDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marginSnapshot/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marginSnapshot/item
			 * 
			 * @description Retrieves an entity of MarginSnapshot type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.timestamp 
			 * @return {Integer} res.riskTimePeriodId 
			 * @return {Number} res.initialMargin 
			 * @return {Number} res.maintenanceMargin 
			 * @return {Number} res.autoLiqLevel 
			 * @return {Number} res.liqOnlyLevel 
			 * @return {Number} res.totalUsedMargin 
			 * @return {Number} res.fullInitialMargin 
			 */
			marginSnapshotItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marginSnapshot/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marginSnapshot/items
			 * 
			 * @description Retrieves multiple entities of MarginSnapshot type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marginSnapshotItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marginSnapshot/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marginSnapshot/ldeps
			 * 
			 * @description Retrieves all entities of MarginSnapshot type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marginSnapshotLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marginSnapshot/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marginSnapshot/list
			 * 
			 * @description Retrieves all entities of MarginSnapshot type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marginSnapshotList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marginSnapshot/list', query: query || {}, body: body || {} })
			},
		};
		this.tradingPermission = {
			/**
			 * ## GET /tradingPermission/deps
			 * 
			 * @description Retrieves all entities of TradingPermission type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradingPermissionDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradingPermission/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradingPermission/item
			 * 
			 * @description Retrieves an entity of TradingPermission type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {Integer} res.accountId 
			 * @return {String} res.accountHolderContact 
			 * @return {String} res.accountHolderEmail 
			 * @return {String} res.ctaContact 
			 * @return {String} res.ctaEmail 
			 * @return {String} res.status Accepted, Approved, Declined, Requested, Revoked
			 * @return {String} res.updated 
			 * @return {Integer} res.approvedById 
			 */
			tradingPermissionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradingPermission/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradingPermission/items
			 * 
			 * @description Retrieves multiple entities of TradingPermission type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradingPermissionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradingPermission/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradingPermission/ldeps
			 * 
			 * @description Retrieves all entities of TradingPermission type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradingPermissionLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradingPermission/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradingPermission/list
			 * 
			 * @description Retrieves all entities of TradingPermission type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradingPermissionList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradingPermission/list', query: query || {}, body: body || {} })
			},
		};
		this.accountRiskStatus = {
			/**
			 * ## GET /accountRiskStatus/deps
			 * 
			 * @description Retrieves all entities of AccountRiskStatus type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountRiskStatusDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'accountRiskStatus/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /accountRiskStatus/item
			 * 
			 * @description Retrieves an entity of AccountRiskStatus type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.adminAction AgreedOnLiqOnlyModeByAutoLiq, AgreedOnLiquidationByAutoLiq, DisableAutoLiq, LiquidateImmediately, LiquidateOnlyModeImmediately, LockTradingImmediately, Normal, PlaceAutoLiqOnHold
			 * @return {String} res.adminTimestamp 
			 * @return {String} res.liquidateOnly 
			 * @return {Boolean} res.userTriggeredLiqOnly 
			 */
			accountRiskStatusItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'accountRiskStatus/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /accountRiskStatus/items
			 * 
			 * @description Retrieves multiple entities of AccountRiskStatus type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountRiskStatusItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'accountRiskStatus/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /accountRiskStatus/ldeps
			 * 
			 * @description Retrieves all entities of AccountRiskStatus type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountRiskStatusLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'accountRiskStatus/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /accountRiskStatus/list
			 * 
			 * @description Retrieves all entities of AccountRiskStatus type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			accountRiskStatusList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'accountRiskStatus/list', query: query || {}, body: body || {} })
			},
		};
		this.contractMargin = {
			/**
			 * ## GET /contractMargin/deps
			 * 
			 * @description Retrieves all entities of ContractMargin type related to Contract entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Contract entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractMarginDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractMargin/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractMargin/item
			 * 
			 * @description Retrieves an entity of ContractMargin type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Number} res.initialMargin 
			 * @return {Number} res.maintenanceMargin 
			 * @return {String} res.timestamp 
			 */
			contractMarginItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractMargin/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractMargin/items
			 * 
			 * @description Retrieves multiple entities of ContractMargin type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractMarginItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractMargin/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contractMargin/ldeps
			 * 
			 * @description Retrieves all entities of ContractMargin type related to multiple entities of Contract type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Contract entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contractMarginLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contractMargin/ldeps', query: query || {}, body: body || {} })
			},
		};
		this.productMargin = {
			/**
			 * ## GET /productMargin/deps
			 * 
			 * @description Retrieves all entities of ProductMargin type related to Product entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Product entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productMarginDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productMargin/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /productMargin/item
			 * 
			 * @description Retrieves an entity of ProductMargin type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Number} res.initialMargin 
			 * @return {Number} res.maintenanceMargin 
			 * @return {String} res.timestamp 
			 */
			productMarginItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productMargin/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /productMargin/items
			 * 
			 * @description Retrieves multiple entities of ProductMargin type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productMarginItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productMargin/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /productMargin/ldeps
			 * 
			 * @description Retrieves all entities of ProductMargin type related to multiple entities of Product type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Product entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productMarginLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productMargin/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /productMargin/list
			 * 
			 * @description Retrieves all entities of ProductMargin type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			productMarginList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'productMargin/list', query: query || {}, body: body || {} })
			},
		};
		this.userAccountAutoLiq = {
			/**
			 * ## POST /userAccountAutoLiq/create
			 * 
			 * @description Creates a new entity of UserAccountAutoLiq
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Boolean} body.changesLocked Changes Locked
			 * @param {Number} body.marginPercentageAlert Margin % for an Alert
			 * @param {Number} body.dailyLossPercentageAlert Daily Loss % for an Alert
			 * @param {Number} body.dailyLossAlert $ Daily Loss for an Alert
			 * @param {Number} body.marginPercentageLiqOnly Margin % for an Liq Only
			 * @param {Number} body.dailyLossPercentageLiqOnly Daily Loss % for an Liq Only
			 * @param {Number} body.dailyLossLiqOnly $ Daily Loss for an Liq Only
			 * @param {Number} body.marginPercentageAutoLiq Margin % for an Auto-Liq
			 * @param {Number} body.dailyLossPercentageAutoLiq Daily Loss % for an AutoLiq
			 * @param {Number} body.dailyLossAutoLiq $ Daily Loss for an Auto-Liq
			 * @param {Number} body.weeklyLossAutoLiq $ Weekly Loss for an Auto-Liq
			 * @param {String} body.flattenTimestamp Flatten &amp;amp; Cancel
			 * @param {Number} body.trailingMaxDrawdown $ Trailing Max Drawdown
			 * @param {Number} body.trailingMaxDrawdownLimit $ Trailing Max Drawdown Limit
			 * @param {Number} body.dailyProfitAutoLiq $ Daily Profit for an Auto-Liq
			 * @param {Number} body.weeklyProfitAutoLiq $ Weekly Profit for an Auto-Liq
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Boolean} res.changesLocked Changes Locked
			 * @return {Number} res.marginPercentageAlert Margin % for an Alert
			 * @return {Number} res.dailyLossPercentageAlert Daily Loss % for an Alert
			 * @return {Number} res.dailyLossAlert $ Daily Loss for an Alert
			 * @return {Number} res.marginPercentageLiqOnly Margin % for an Liq Only
			 * @return {Number} res.dailyLossPercentageLiqOnly Daily Loss % for an Liq Only
			 * @return {Number} res.dailyLossLiqOnly $ Daily Loss for an Liq Only
			 * @return {Number} res.marginPercentageAutoLiq Margin % for an Auto-Liq
			 * @return {Number} res.dailyLossPercentageAutoLiq Daily Loss % for an AutoLiq
			 * @return {Number} res.dailyLossAutoLiq $ Daily Loss for an Auto-Liq
			 * @return {Number} res.weeklyLossAutoLiq $ Weekly Loss for an Auto-Liq
			 * @return {String} res.flattenTimestamp Flatten &amp;amp; Cancel
			 * @return {Number} res.trailingMaxDrawdown $ Trailing Max Drawdown
			 * @return {Number} res.trailingMaxDrawdownLimit $ Trailing Max Drawdown Limit
			 * @return {Number} res.dailyProfitAutoLiq $ Daily Profit for an Auto-Liq
			 * @return {Number} res.weeklyProfitAutoLiq $ Weekly Profit for an Auto-Liq
			 */
			userAccountAutoLiqCreate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					changesLocked: undefined,
					marginPercentageAlert: undefined,
					dailyLossPercentageAlert: undefined,
					dailyLossAlert: undefined,
					marginPercentageLiqOnly: undefined,
					dailyLossPercentageLiqOnly: undefined,
					dailyLossLiqOnly: undefined,
					marginPercentageAutoLiq: undefined,
					dailyLossPercentageAutoLiq: undefined,
					dailyLossAutoLiq: undefined,
					weeklyLossAutoLiq: undefined,
					flattenTimestamp: undefined,
					trailingMaxDrawdown: undefined,
					trailingMaxDrawdownLimit: undefined,
					dailyProfitAutoLiq: undefined,
					weeklyProfitAutoLiq: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountAutoLiq/create', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountAutoLiq/deps
			 * 
			 * @description Retrieves all entities of UserAccountAutoLiq type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountAutoLiqDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountAutoLiq/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountAutoLiq/item
			 * 
			 * @description Retrieves an entity of UserAccountAutoLiq type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Boolean} res.changesLocked Changes Locked
			 * @return {Number} res.marginPercentageAlert Margin % for an Alert
			 * @return {Number} res.dailyLossPercentageAlert Daily Loss % for an Alert
			 * @return {Number} res.dailyLossAlert $ Daily Loss for an Alert
			 * @return {Number} res.marginPercentageLiqOnly Margin % for an Liq Only
			 * @return {Number} res.dailyLossPercentageLiqOnly Daily Loss % for an Liq Only
			 * @return {Number} res.dailyLossLiqOnly $ Daily Loss for an Liq Only
			 * @return {Number} res.marginPercentageAutoLiq Margin % for an Auto-Liq
			 * @return {Number} res.dailyLossPercentageAutoLiq Daily Loss % for an AutoLiq
			 * @return {Number} res.dailyLossAutoLiq $ Daily Loss for an Auto-Liq
			 * @return {Number} res.weeklyLossAutoLiq $ Weekly Loss for an Auto-Liq
			 * @return {String} res.flattenTimestamp Flatten &amp;amp; Cancel
			 * @return {Number} res.trailingMaxDrawdown $ Trailing Max Drawdown
			 * @return {Number} res.trailingMaxDrawdownLimit $ Trailing Max Drawdown Limit
			 * @return {Number} res.dailyProfitAutoLiq $ Daily Profit for an Auto-Liq
			 * @return {Number} res.weeklyProfitAutoLiq $ Weekly Profit for an Auto-Liq
			 */
			userAccountAutoLiqItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountAutoLiq/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountAutoLiq/items
			 * 
			 * @description Retrieves multiple entities of UserAccountAutoLiq type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountAutoLiqItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountAutoLiq/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountAutoLiq/ldeps
			 * 
			 * @description Retrieves all entities of UserAccountAutoLiq type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountAutoLiqLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountAutoLiq/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountAutoLiq/list
			 * 
			 * @description Retrieves all entities of UserAccountAutoLiq type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountAutoLiqList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountAutoLiq/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /userAccountAutoLiq/update
			 * 
			 * @description Updates an existing entity of UserAccountAutoLiq
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Boolean} body.changesLocked Changes Locked
			 * @param {Number} body.marginPercentageAlert Margin % for an Alert
			 * @param {Number} body.dailyLossPercentageAlert Daily Loss % for an Alert
			 * @param {Number} body.dailyLossAlert $ Daily Loss for an Alert
			 * @param {Number} body.marginPercentageLiqOnly Margin % for an Liq Only
			 * @param {Number} body.dailyLossPercentageLiqOnly Daily Loss % for an Liq Only
			 * @param {Number} body.dailyLossLiqOnly $ Daily Loss for an Liq Only
			 * @param {Number} body.marginPercentageAutoLiq Margin % for an Auto-Liq
			 * @param {Number} body.dailyLossPercentageAutoLiq Daily Loss % for an AutoLiq
			 * @param {Number} body.dailyLossAutoLiq $ Daily Loss for an Auto-Liq
			 * @param {Number} body.weeklyLossAutoLiq $ Weekly Loss for an Auto-Liq
			 * @param {String} body.flattenTimestamp Flatten &amp;amp; Cancel
			 * @param {Number} body.trailingMaxDrawdown $ Trailing Max Drawdown
			 * @param {Number} body.trailingMaxDrawdownLimit $ Trailing Max Drawdown Limit
			 * @param {Number} body.dailyProfitAutoLiq $ Daily Profit for an Auto-Liq
			 * @param {Number} body.weeklyProfitAutoLiq $ Weekly Profit for an Auto-Liq
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Boolean} res.changesLocked Changes Locked
			 * @return {Number} res.marginPercentageAlert Margin % for an Alert
			 * @return {Number} res.dailyLossPercentageAlert Daily Loss % for an Alert
			 * @return {Number} res.dailyLossAlert $ Daily Loss for an Alert
			 * @return {Number} res.marginPercentageLiqOnly Margin % for an Liq Only
			 * @return {Number} res.dailyLossPercentageLiqOnly Daily Loss % for an Liq Only
			 * @return {Number} res.dailyLossLiqOnly $ Daily Loss for an Liq Only
			 * @return {Number} res.marginPercentageAutoLiq Margin % for an Auto-Liq
			 * @return {Number} res.dailyLossPercentageAutoLiq Daily Loss % for an AutoLiq
			 * @return {Number} res.dailyLossAutoLiq $ Daily Loss for an Auto-Liq
			 * @return {Number} res.weeklyLossAutoLiq $ Weekly Loss for an Auto-Liq
			 * @return {String} res.flattenTimestamp Flatten &amp;amp; Cancel
			 * @return {Number} res.trailingMaxDrawdown $ Trailing Max Drawdown
			 * @return {Number} res.trailingMaxDrawdownLimit $ Trailing Max Drawdown Limit
			 * @return {Number} res.dailyProfitAutoLiq $ Daily Profit for an Auto-Liq
			 * @return {Number} res.weeklyProfitAutoLiq $ Weekly Profit for an Auto-Liq
			 */
			userAccountAutoLiqUpdate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					changesLocked: undefined,
					marginPercentageAlert: undefined,
					dailyLossPercentageAlert: undefined,
					dailyLossAlert: undefined,
					marginPercentageLiqOnly: undefined,
					dailyLossPercentageLiqOnly: undefined,
					dailyLossLiqOnly: undefined,
					marginPercentageAutoLiq: undefined,
					dailyLossPercentageAutoLiq: undefined,
					dailyLossAutoLiq: undefined,
					weeklyLossAutoLiq: undefined,
					flattenTimestamp: undefined,
					trailingMaxDrawdown: undefined,
					trailingMaxDrawdownLimit: undefined,
					dailyProfitAutoLiq: undefined,
					weeklyProfitAutoLiq: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountAutoLiq/update', query: query || {}, body: body || {} })
			},
		};
		this.userAccountPositionLimit = {
			/**
			 * ## POST /userAccountPositionLimit/create
			 * 
			 * @description Creates a new entity of UserAccountPositionLimit
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.contractId 
			 * @param {Integer} body.productId 
			 * @param {Integer} body.exchangeId 
			 * @param {String} body.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @param {Integer} body.riskDiscountContractGroupId 
			 * @param {String} body.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @param {Integer} body.contractGroupId 
			 * @param {Boolean} body.active 
			 * @param {Integer} body.riskTimePeriodId 
			 * @param {String} body.totalBy Contract, ContractGroup, DiscountGroup, Exchange, Overall, Product, ProductType
			 * @param {Integer} body.shortLimit 
			 * @param {Integer} body.longLimit 
			 * @param {Integer} body.exposedLimit 
			 * @param {String} body.description 
			 * @param {Integer} body.accountId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.contractId 
			 * @return {Integer} res.productId 
			 * @return {Integer} res.exchangeId 
			 * @return {String} res.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @return {Integer} res.riskDiscountContractGroupId 
			 * @return {String} res.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @return {Integer} res.contractGroupId 
			 * @return {Boolean} res.active 
			 * @return {Integer} res.riskTimePeriodId 
			 * @return {String} res.totalBy Contract, ContractGroup, DiscountGroup, Exchange, Overall, Product, ProductType
			 * @return {Integer} res.shortLimit 
			 * @return {Integer} res.longLimit 
			 * @return {Integer} res.exposedLimit 
			 * @return {String} res.description 
			 * @return {Integer} res.accountId 
			 */
			userAccountPositionLimitCreate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					contractId: undefined,
					productId: undefined,
					exchangeId: undefined,
					productType: undefined,
					riskDiscountContractGroupId: undefined,
					productVerificationStatus: undefined,
					contractGroupId: undefined,
					active: undefined,
					riskTimePeriodId: undefined,
					totalBy: undefined,
					shortLimit: undefined,
					longLimit: undefined,
					exposedLimit: undefined,
					description: undefined,
					accountId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountPositionLimit/create', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /userAccountPositionLimit/deleteuseraccountpositionlimit
			 * 
			 * @description ### Remove an account position limit for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.userAccountPositionLimitId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Boolean} res.success 
			 */
			deleteUserAccountPositionLimit: async function (params={
				query: {
				},
				body: {
					userAccountPositionLimitId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountPositionLimit/deleteuseraccountpositionlimit', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /userAccountPositionLimit/deleteuseraccountriskparameter
			 * 
			 * @description ### Remove a Risk Setting parameter.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.userAccountRiskParameterId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Boolean} res.success 
			 */
			deleteUserAccountRiskParameter: async function (params={
				query: {
				},
				body: {
					userAccountRiskParameterId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountPositionLimit/deleteuseraccountriskparameter', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountPositionLimit/deps
			 * 
			 * @description Retrieves all entities of UserAccountPositionLimit type related to Account entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Account entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountPositionLimitDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountPositionLimit/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountPositionLimit/item
			 * 
			 * @description Retrieves an entity of UserAccountPositionLimit type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.contractId 
			 * @return {Integer} res.productId 
			 * @return {Integer} res.exchangeId 
			 * @return {String} res.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @return {Integer} res.riskDiscountContractGroupId 
			 * @return {String} res.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @return {Integer} res.contractGroupId 
			 * @return {Boolean} res.active 
			 * @return {Integer} res.riskTimePeriodId 
			 * @return {String} res.totalBy Contract, ContractGroup, DiscountGroup, Exchange, Overall, Product, ProductType
			 * @return {Integer} res.shortLimit 
			 * @return {Integer} res.longLimit 
			 * @return {Integer} res.exposedLimit 
			 * @return {String} res.description 
			 * @return {Integer} res.accountId 
			 */
			userAccountPositionLimitItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountPositionLimit/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountPositionLimit/items
			 * 
			 * @description Retrieves multiple entities of UserAccountPositionLimit type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountPositionLimitItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountPositionLimit/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountPositionLimit/ldeps
			 * 
			 * @description Retrieves all entities of UserAccountPositionLimit type related to multiple entities of Account type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Account entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountPositionLimitLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountPositionLimit/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /userAccountPositionLimit/update
			 * 
			 * @description Updates an existing entity of UserAccountPositionLimit
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.contractId 
			 * @param {Integer} body.productId 
			 * @param {Integer} body.exchangeId 
			 * @param {String} body.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @param {Integer} body.riskDiscountContractGroupId 
			 * @param {String} body.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @param {Integer} body.contractGroupId 
			 * @param {Boolean} body.active 
			 * @param {Integer} body.riskTimePeriodId 
			 * @param {String} body.totalBy Contract, ContractGroup, DiscountGroup, Exchange, Overall, Product, ProductType
			 * @param {Integer} body.shortLimit 
			 * @param {Integer} body.longLimit 
			 * @param {Integer} body.exposedLimit 
			 * @param {String} body.description 
			 * @param {Integer} body.accountId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.contractId 
			 * @return {Integer} res.productId 
			 * @return {Integer} res.exchangeId 
			 * @return {String} res.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @return {Integer} res.riskDiscountContractGroupId 
			 * @return {String} res.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @return {Integer} res.contractGroupId 
			 * @return {Boolean} res.active 
			 * @return {Integer} res.riskTimePeriodId 
			 * @return {String} res.totalBy Contract, ContractGroup, DiscountGroup, Exchange, Overall, Product, ProductType
			 * @return {Integer} res.shortLimit 
			 * @return {Integer} res.longLimit 
			 * @return {Integer} res.exposedLimit 
			 * @return {String} res.description 
			 * @return {Integer} res.accountId 
			 */
			userAccountPositionLimitUpdate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					contractId: undefined,
					productId: undefined,
					exchangeId: undefined,
					productType: undefined,
					riskDiscountContractGroupId: undefined,
					productVerificationStatus: undefined,
					contractGroupId: undefined,
					active: undefined,
					riskTimePeriodId: undefined,
					totalBy: undefined,
					shortLimit: undefined,
					longLimit: undefined,
					exposedLimit: undefined,
					description: undefined,
					accountId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountPositionLimit/update', query: query || {}, body: body || {} })
			},
		};
		this.userAccountRiskParameter = {
			/**
			 * ## POST /userAccountRiskParameter/create
			 * 
			 * @description Creates a new entity of UserAccountRiskParameter
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.contractId 
			 * @param {Integer} body.productId 
			 * @param {Integer} body.exchangeId 
			 * @param {String} body.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @param {Integer} body.riskDiscountContractGroupId 
			 * @param {String} body.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @param {Integer} body.contractGroupId 
			 * @param {Integer} body.maxOpeningOrderQty 
			 * @param {Integer} body.maxClosingOrderQty 
			 * @param {Integer} body.maxBackMonth 
			 * @param {Integer} body.preExpirationDays 
			 * @param {Number} body.marginPercentage 
			 * @param {Number} body.marginDollarValue 
			 * @param {Boolean} body.hardLimit 
			 * @param {Integer} body.userAccountPositionLimitId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.contractId 
			 * @return {Integer} res.productId 
			 * @return {Integer} res.exchangeId 
			 * @return {String} res.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @return {Integer} res.riskDiscountContractGroupId 
			 * @return {String} res.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @return {Integer} res.contractGroupId 
			 * @return {Integer} res.maxOpeningOrderQty 
			 * @return {Integer} res.maxClosingOrderQty 
			 * @return {Integer} res.maxBackMonth 
			 * @return {Integer} res.preExpirationDays 
			 * @return {Number} res.marginPercentage 
			 * @return {Number} res.marginDollarValue 
			 * @return {Boolean} res.hardLimit 
			 * @return {Integer} res.userAccountPositionLimitId 
			 */
			userAccountRiskParameterCreate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					contractId: undefined,
					productId: undefined,
					exchangeId: undefined,
					productType: undefined,
					riskDiscountContractGroupId: undefined,
					productVerificationStatus: undefined,
					contractGroupId: undefined,
					maxOpeningOrderQty: undefined,
					maxClosingOrderQty: undefined,
					maxBackMonth: undefined,
					preExpirationDays: undefined,
					marginPercentage: undefined,
					marginDollarValue: undefined,
					hardLimit: undefined,
					userAccountPositionLimitId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountRiskParameter/create', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountRiskParameter/deps
			 * 
			 * @description Retrieves all entities of UserAccountRiskParameter type related to UserAccountPositionLimit entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of UserAccountPositionLimit entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountRiskParameterDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountRiskParameter/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountRiskParameter/item
			 * 
			 * @description Retrieves an entity of UserAccountRiskParameter type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.contractId 
			 * @return {Integer} res.productId 
			 * @return {Integer} res.exchangeId 
			 * @return {String} res.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @return {Integer} res.riskDiscountContractGroupId 
			 * @return {String} res.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @return {Integer} res.contractGroupId 
			 * @return {Integer} res.maxOpeningOrderQty 
			 * @return {Integer} res.maxClosingOrderQty 
			 * @return {Integer} res.maxBackMonth 
			 * @return {Integer} res.preExpirationDays 
			 * @return {Number} res.marginPercentage 
			 * @return {Number} res.marginDollarValue 
			 * @return {Boolean} res.hardLimit 
			 * @return {Integer} res.userAccountPositionLimitId 
			 */
			userAccountRiskParameterItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountRiskParameter/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountRiskParameter/items
			 * 
			 * @description Retrieves multiple entities of UserAccountRiskParameter type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountRiskParameterItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountRiskParameter/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userAccountRiskParameter/ldeps
			 * 
			 * @description Retrieves all entities of UserAccountRiskParameter type related to multiple entities of UserAccountPositionLimit type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of UserAccountPositionLimit entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userAccountRiskParameterLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountRiskParameter/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /userAccountRiskParameter/update
			 * 
			 * @description Updates an existing entity of UserAccountRiskParameter
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.contractId 
			 * @param {Integer} body.productId 
			 * @param {Integer} body.exchangeId 
			 * @param {String} body.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @param {Integer} body.riskDiscountContractGroupId 
			 * @param {String} body.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @param {Integer} body.contractGroupId 
			 * @param {Integer} body.maxOpeningOrderQty 
			 * @param {Integer} body.maxClosingOrderQty 
			 * @param {Integer} body.maxBackMonth 
			 * @param {Integer} body.preExpirationDays 
			 * @param {Number} body.marginPercentage 
			 * @param {Number} body.marginDollarValue 
			 * @param {Boolean} body.hardLimit 
			 * @param {Integer} body.userAccountPositionLimitId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.contractId 
			 * @return {Integer} res.productId 
			 * @return {Integer} res.exchangeId 
			 * @return {String} res.productType CommonStock, Continuous, Cryptocurrency, Futures, MarketInternals, Options, Spread
			 * @return {Integer} res.riskDiscountContractGroupId 
			 * @return {String} res.productVerificationStatus Inactive, Locked, ReadyForContracts, ReadyToTrade, Verified
			 * @return {Integer} res.contractGroupId 
			 * @return {Integer} res.maxOpeningOrderQty 
			 * @return {Integer} res.maxClosingOrderQty 
			 * @return {Integer} res.maxBackMonth 
			 * @return {Integer} res.preExpirationDays 
			 * @return {Number} res.marginPercentage 
			 * @return {Number} res.marginDollarValue 
			 * @return {Boolean} res.hardLimit 
			 * @return {Integer} res.userAccountPositionLimitId 
			 */
			userAccountRiskParameterUpdate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					contractId: undefined,
					productId: undefined,
					exchangeId: undefined,
					productType: undefined,
					riskDiscountContractGroupId: undefined,
					productVerificationStatus: undefined,
					contractGroupId: undefined,
					maxOpeningOrderQty: undefined,
					maxClosingOrderQty: undefined,
					maxBackMonth: undefined,
					preExpirationDays: undefined,
					marginPercentage: undefined,
					marginDollarValue: undefined,
					hardLimit: undefined,
					userAccountPositionLimitId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userAccountRiskParameter/update', query: query || {}, body: body || {} })
			},
		};
		this.marketDataSubscriptionExchangeScope = {
			/**
			 * ## GET /marketDataSubscriptionExchangeScope/find
			 * 
			 * @description Retrieves an entity of MarketDataSubscriptionExchangeScope type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.bundleOf 
			 */
			marketDataSubscriptionExchangeScopeFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionExchangeScope/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscriptionExchangeScope/item
			 * 
			 * @description Retrieves an entity of MarketDataSubscriptionExchangeScope type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.bundleOf 
			 */
			marketDataSubscriptionExchangeScopeItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionExchangeScope/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscriptionExchangeScope/items
			 * 
			 * @description Retrieves multiple entities of MarketDataSubscriptionExchangeScope type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionExchangeScopeItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionExchangeScope/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscriptionExchangeScope/list
			 * 
			 * @description Retrieves all entities of MarketDataSubscriptionExchangeScope type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionExchangeScopeList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionExchangeScope/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscriptionExchangeScope/suggest
			 * 
			 * @description Retrieves entities of MarketDataSubscriptionExchangeScope type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionExchangeScopeSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionExchangeScope/suggest', query: query || {}, body: body || {} })
			},
		};
		this.marketDataSubscriptionPlan = {
			/**
			 * ## GET /marketDataSubscriptionPlan/find
			 * 
			 * @description Retrieves an entity of MarketDataSubscriptionPlan type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.title 
			 * @return {Number} res.price 
			 * @return {} res.startDate 
			 * @return {} res.discontinuedDate 
			 * @return {Integer} res.exchangeScopeId 
			 * @return {String} res.dataType DOM, Top
			 * @return {String} res.professional Either, NonProfessional, Professional
			 * @return {String} res.tooltip 
			 */
			marketDataSubscriptionPlanFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionPlan/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscriptionPlan/item
			 * 
			 * @description Retrieves an entity of MarketDataSubscriptionPlan type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.title 
			 * @return {Number} res.price 
			 * @return {} res.startDate 
			 * @return {} res.discontinuedDate 
			 * @return {Integer} res.exchangeScopeId 
			 * @return {String} res.dataType DOM, Top
			 * @return {String} res.professional Either, NonProfessional, Professional
			 * @return {String} res.tooltip 
			 */
			marketDataSubscriptionPlanItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionPlan/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscriptionPlan/items
			 * 
			 * @description Retrieves multiple entities of MarketDataSubscriptionPlan type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionPlanItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionPlan/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscriptionPlan/list
			 * 
			 * @description Retrieves all entities of MarketDataSubscriptionPlan type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionPlanList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionPlan/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscriptionPlan/suggest
			 * 
			 * @description Retrieves entities of MarketDataSubscriptionPlan type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionPlanSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscriptionPlan/suggest', query: query || {}, body: body || {} })
			},
		};
		this.tradovateSubscriptionPlan = {
			/**
			 * ## GET /tradovateSubscriptionPlan/find
			 * 
			 * @description Retrieves an entity of TradovateSubscriptionPlan type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.title 
			 * @return {Number} res.price 
			 * @return {} res.startDate 
			 * @return {} res.discontinuedDate 
			 * @return {String} res.category 
			 * @return {Boolean} res.trial 
			 * @return {Integer} res.duration 
			 * @return {String} res.durationUnits Month, Quarter, Week, Year
			 * @return {Integer} res.riskCategoryId 
			 * @return {Boolean} res.multipleAccounts 
			 * @return {Integer} res.organizationId 
			 * @return {Integer} res.replaySessions 
			 * @return {String} res.footnote 
			 * @return {Boolean} res.simOnly 
			 */
			tradovateSubscriptionPlanFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscriptionPlan/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscriptionPlan/item
			 * 
			 * @description Retrieves an entity of TradovateSubscriptionPlan type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.title 
			 * @return {Number} res.price 
			 * @return {} res.startDate 
			 * @return {} res.discontinuedDate 
			 * @return {String} res.category 
			 * @return {Boolean} res.trial 
			 * @return {Integer} res.duration 
			 * @return {String} res.durationUnits Month, Quarter, Week, Year
			 * @return {Integer} res.riskCategoryId 
			 * @return {Boolean} res.multipleAccounts 
			 * @return {Integer} res.organizationId 
			 * @return {Integer} res.replaySessions 
			 * @return {String} res.footnote 
			 * @return {Boolean} res.simOnly 
			 */
			tradovateSubscriptionPlanItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscriptionPlan/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscriptionPlan/items
			 * 
			 * @description Retrieves multiple entities of TradovateSubscriptionPlan type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradovateSubscriptionPlanItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscriptionPlan/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscriptionPlan/list
			 * 
			 * @description Retrieves all entities of TradovateSubscriptionPlan type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradovateSubscriptionPlanList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscriptionPlan/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscriptionPlan/suggest
			 * 
			 * @description Retrieves entities of TradovateSubscriptionPlan type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradovateSubscriptionPlanSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscriptionPlan/suggest', query: query || {}, body: body || {} })
			},
		};
		this.replay = {
			/**
			 * ## POST /replay/changespeed
			 * 
			 * @description ### Change the playback speed of a Market Replay session.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.speed 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Boolean} res.ok 
			 */
			changeSpeed: async function (params={
				query: {
				},
				body: {
					speed: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'replay/changespeed', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /replay/checkreplaysession
			 * 
			 * @description ### Before beginning a Market Replay session, checks to see if the given timeframe is within the scope of the user&#x27;s entitlements.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.startTimestamp 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.checkStatus Ineligible, OK, StartTimestampAdjusted
			 * @return {String} res.startTimestamp 
			 */
			checkReplaySession: async function (params={
				query: {
				},
				body: {
					startTimestamp: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'replay/checkreplaysession', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /replay/initializeclock
			 * 
			 * @description ### Set the inital date and time for a market replay session.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.startTimestamp 
			 * @param {Integer} body.speed 
			 * @param {Number} body.initialBalance 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Boolean} res.ok 
			 */
			initializeClock: async function (params={
				query: {
				},
				body: {
					startTimestamp: undefined,
					speed: undefined,
					initialBalance: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'replay/initializeclock', query: query || {}, body: body || {} })
			},
		};
		this.adminAlertSignal = {
			/**
			 * ## POST /adminAlertSignal/completealertsignal
			 * 
			 * @description ### Silences an &quot;incomplete&quot; notification. 
An &quot;Incomplete&quot; notification is one that has not yet been viewed by a user. Once a user has interacted with a notification it should be &quot;completed&quot;.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.adminAlertSignalId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.adminAlertSignal 
			 */
			completeAlertSignal: async function (params={
				query: {
				},
				body: {
					adminAlertSignalId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlertSignal/completealertsignal', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlertSignal/deps
			 * 
			 * @description Retrieves all entities of AdminAlertSignal type related to AdminAlert entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of AdminAlert entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			adminAlertSignalDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlertSignal/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlertSignal/item
			 * 
			 * @description Retrieves an entity of AdminAlertSignal type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.timestamp 
			 * @return {Integer} res.adminAlertId 
			 * @return {Integer} res.relatedToAccountId 
			 * @return {Integer} res.relatedToUserId 
			 * @return {Integer} res.ownedByAdminId Owned By...
			 * @return {String} res.completed 
			 * @return {String} res.text 
			 * @return {Boolean} res.emailSent 
			 * @return {Integer} res.subjectId 
			 */
			adminAlertSignalItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlertSignal/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlertSignal/items
			 * 
			 * @description Retrieves multiple entities of AdminAlertSignal type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			adminAlertSignalItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlertSignal/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlertSignal/ldeps
			 * 
			 * @description Retrieves all entities of AdminAlertSignal type related to multiple entities of AdminAlert type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of AdminAlert entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			adminAlertSignalLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlertSignal/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlertSignal/list
			 * 
			 * @description Retrieves all entities of AdminAlertSignal type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			adminAlertSignalList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlertSignal/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /adminAlertSignal/takealertsignalownership
			 * 
			 * @description ### Internal. Can be used by B2B partners to mark an adminAlertSignal entity for further handling.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.adminAlertSignalId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.adminAlertSignal 
			 */
			takeAlertSignalOwnership: async function (params={
				query: {
				},
				body: {
					adminAlertSignalId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlertSignal/takealertsignalownership', query: query || {}, body: body || {} })
			},
		};
		this.alert = {
			/**
			 * ## POST /alert/createalert
			 * 
			 * @description ### Create an alert entity associated with the user.

			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.expression 
			 * @param {String} body.validUntil 
			 * @param {Integer} body.triggerLimits 
			 * @param {String} body.message 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.alert 
			 */
			createAlert: async function (params={
				query: {
				},
				body: {
					expression: undefined,
					validUntil: undefined,
					triggerLimits: undefined,
					message: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/createalert', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /alert/deletealert
			 * 
			 * @description ### Remove an alert entity associated with the user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.alertId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.alert 
			 */
			deleteAlert: async function (params={
				query: {
				},
				body: {
					alertId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/deletealert', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alert/deps
			 * 
			 * @description Retrieves all entities of Alert type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			alertDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /alert/dismissalert
			 * 
			 * @description ### Dismiss an alert for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.alertId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.alert 
			 */
			dismissAlert: async function (params={
				query: {
				},
				body: {
					alertId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/dismissalert', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alert/item
			 * 
			 * @description Retrieves an entity of Alert type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.timestamp 
			 * @return {Integer} res.userId 
			 * @return {String} res.status Active, Expired, Failed, Inactive, TriggeredOut
			 * @return {String} res.expression 
			 * @return {String} res.validUntil 
			 * @return {Integer} res.triggerLimits 
			 * @return {Integer} res.triggeredCounter 
			 * @return {String} res.failure 
			 * @return {String} res.message 
			 */
			alertItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alert/items
			 * 
			 * @description Retrieves multiple entities of Alert type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			alertItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alert/ldeps
			 * 
			 * @description Retrieves all entities of Alert type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			alertLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alert/list
			 * 
			 * @description Retrieves all entities of Alert type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			alertList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /alert/markreadalertsignal
			 * 
			 * @description ### Mark an alert entity as &#x27;read&#x27; for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.alertId 
			 * @param {Integer} body.alertSignalId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.alert 
			 */
			markReadAlertSignal: async function (params={
				query: {
				},
				body: {
					alertId: undefined,
					alertSignalId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/markreadalertsignal', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /alert/modifyalert
			 * 
			 * @description ### Change the parameters of an existing alert.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.alertId 
			 * @param {String} body.expression 
			 * @param {String} body.validUntil 
			 * @param {Integer} body.triggerLimits 
			 * @param {String} body.message 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.alert 
			 */
			modifyAlert: async function (params={
				query: {
				},
				body: {
					alertId: undefined,
					expression: undefined,
					validUntil: undefined,
					triggerLimits: undefined,
					message: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/modifyalert', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /alert/resetalert
			 * 
			 * @description ### Resets an alert. 
You can use this method after an alert has been triggered to keep the alert and wait for the alert to be triggered again.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.alertId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.alert 
			 */
			resetAlert: async function (params={
				query: {
				},
				body: {
					alertId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alert/resetalert', query: query || {}, body: body || {} })
			},
		};
		this.alertSignal = {
			/**
			 * ## GET /alertSignal/deps
			 * 
			 * @description Retrieves all entities of AlertSignal type related to Alert entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Alert entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			alertSignalDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alertSignal/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alertSignal/item
			 * 
			 * @description Retrieves an entity of AlertSignal type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.timestamp 
			 * @return {Integer} res.alertId 
			 * @return {Boolean} res.isRead 
			 * @return {String} res.text 
			 */
			alertSignalItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alertSignal/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alertSignal/items
			 * 
			 * @description Retrieves multiple entities of AlertSignal type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			alertSignalItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alertSignal/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alertSignal/ldeps
			 * 
			 * @description Retrieves all entities of AlertSignal type related to multiple entities of Alert type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Alert entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			alertSignalLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alertSignal/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /alertSignal/list
			 * 
			 * @description Retrieves all entities of AlertSignal type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			alertSignalList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'alertSignal/list', query: query || {}, body: body || {} })
			},
		};
		this.adminAlert = {
			/**
			 * ## GET /adminAlert/find
			 * 
			 * @description Retrieves an entity of AdminAlert type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.timestamp 
			 */
			adminAlertFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlert/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlert/item
			 * 
			 * @description Retrieves an entity of AdminAlert type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.timestamp 
			 */
			adminAlertItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlert/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlert/items
			 * 
			 * @description Retrieves multiple entities of AdminAlert type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			adminAlertItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlert/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlert/list
			 * 
			 * @description Retrieves all entities of AdminAlert type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			adminAlertList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlert/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /adminAlert/suggest
			 * 
			 * @description Retrieves entities of AdminAlert type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			adminAlertSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'adminAlert/suggest', query: query || {}, body: body || {} })
			},
		};
		this.clearingHouse = {
			/**
			 * ## GET /clearingHouse/find
			 * 
			 * @description Retrieves an entity of ClearingHouse type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 */
			clearingHouseFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'clearingHouse/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /clearingHouse/item
			 * 
			 * @description Retrieves an entity of ClearingHouse type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 */
			clearingHouseItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'clearingHouse/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /clearingHouse/items
			 * 
			 * @description Retrieves multiple entities of ClearingHouse type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			clearingHouseItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'clearingHouse/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /clearingHouse/list
			 * 
			 * @description Retrieves all entities of ClearingHouse type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			clearingHouseList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'clearingHouse/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /clearingHouse/suggest
			 * 
			 * @description Retrieves entities of ClearingHouse type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			clearingHouseSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'clearingHouse/suggest', query: query || {}, body: body || {} })
			},
		};
		this.entitlement = {
			/**
			 * ## GET /entitlement/item
			 * 
			 * @description Retrieves an entity of Entitlement type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.title 
			 * @return {Number} res.price 
			 * @return {} res.startDate 
			 * @return {} res.discontinuedDate 
			 * @return {String} res.name 
			 * @return {Integer} res.duration 
			 * @return {String} res.durationUnits Month, Quarter, Week, Year
			 * @return {Boolean} res.autorenewal 
			 */
			entitlementItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'entitlement/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /entitlement/items
			 * 
			 * @description Retrieves multiple entities of Entitlement type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			entitlementItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'entitlement/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /entitlement/list
			 * 
			 * @description Retrieves all entities of Entitlement type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			entitlementList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'entitlement/list', query: query || {}, body: body || {} })
			},
		};
		this.orderStrategyType = {
			/**
			 * ## GET /orderStrategyType/find
			 * 
			 * @description Retrieves an entity of OrderStrategyType type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {Boolean} res.enabled 
			 */
			orderStrategyTypeFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyType/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategyType/item
			 * 
			 * @description Retrieves an entity of OrderStrategyType type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {Boolean} res.enabled 
			 */
			orderStrategyTypeItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyType/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategyType/items
			 * 
			 * @description Retrieves multiple entities of OrderStrategyType type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyTypeItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyType/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategyType/list
			 * 
			 * @description Retrieves all entities of OrderStrategyType type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyTypeList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyType/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /orderStrategyType/suggest
			 * 
			 * @description Retrieves entities of OrderStrategyType type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			orderStrategyTypeSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'orderStrategyType/suggest', query: query || {}, body: body || {} })
			},
		};
		this.property = {
			/**
			 * ## GET /property/find
			 * 
			 * @description Retrieves an entity of Property type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.propertyType Boolean, Enum, Integer, String
			 * @return {String} res.enumOptions 
			 * @return {String} res.defaultValue 
			 */
			propertyFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'property/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /property/item
			 * 
			 * @description Retrieves an entity of Property type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.propertyType Boolean, Enum, Integer, String
			 * @return {String} res.enumOptions 
			 * @return {String} res.defaultValue 
			 */
			propertyItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'property/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /property/items
			 * 
			 * @description Retrieves multiple entities of Property type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			propertyItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'property/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /property/list
			 * 
			 * @description Retrieves all entities of Property type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			propertyList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'property/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /property/suggest
			 * 
			 * @description Retrieves entities of Property type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			propertySuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'property/suggest', query: query || {}, body: body || {} })
			},
		};
		this.contactInfo = {
			/**
			 * ## GET /contactInfo/deps
			 * 
			 * @description Retrieves all entities of ContactInfo type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contactInfoDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contactInfo/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contactInfo/item
			 * 
			 * @description Retrieves an entity of ContactInfo type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.firstName 
			 * @return {String} res.lastName 
			 * @return {String} res.streetAddress1 
			 * @return {String} res.streetAddress2 
			 * @return {String} res.city 
			 * @return {String} res.state 
			 * @return {String} res.postCode 
			 * @return {String} res.country 
			 * @return {String} res.phone 
			 * @return {Boolean} res.mailingIsDifferent 
			 * @return {String} res.mailingStreetAddress1 
			 * @return {String} res.mailingStreetAddress2 
			 * @return {String} res.mailingCity 
			 * @return {String} res.mailingState 
			 * @return {String} res.mailingPostCode 
			 * @return {String} res.mailingCountry 
			 */
			contactInfoItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contactInfo/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contactInfo/items
			 * 
			 * @description Retrieves multiple entities of ContactInfo type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contactInfoItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contactInfo/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /contactInfo/ldeps
			 * 
			 * @description Retrieves all entities of ContactInfo type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			contactInfoLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'contactInfo/ldeps', query: query || {}, body: body || {} })
			},
		};
		this.marketDataSubscription = {
			/**
			 * ## POST /marketDataSubscription/create
			 * 
			 * @description Creates a new entity of MarketDataSubscription
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.userId 
			 * @param {String} body.timestamp 
			 * @param {Number} body.planPrice 
			 * @param {Integer} body.creditCardTransactionId 
			 * @param {Integer} body.cashBalanceLogId 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.marketDataSubscriptionPlanId 
			 * @param {Integer} body.year 
			 * @param {Integer} body.month 
			 * @param {Integer} body.renewalCreditCardId 
			 * @param {Integer} body.renewalAccountId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.marketDataSubscriptionPlanId 
			 * @return {Integer} res.year 
			 * @return {Integer} res.month 
			 * @return {Integer} res.renewalCreditCardId 
			 * @return {Integer} res.renewalAccountId 
			 */
			marketDataSubscriptionCreate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					userId: undefined,
					timestamp: undefined,
					planPrice: undefined,
					creditCardTransactionId: undefined,
					cashBalanceLogId: undefined,
					creditCardId: undefined,
					accountId: undefined,
					marketDataSubscriptionPlanId: undefined,
					year: undefined,
					month: undefined,
					renewalCreditCardId: undefined,
					renewalAccountId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscription/create', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscription/deps
			 * 
			 * @description Retrieves all entities of MarketDataSubscription type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscription/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscription/item
			 * 
			 * @description Retrieves an entity of MarketDataSubscription type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.marketDataSubscriptionPlanId 
			 * @return {Integer} res.year 
			 * @return {Integer} res.month 
			 * @return {Integer} res.renewalCreditCardId 
			 * @return {Integer} res.renewalAccountId 
			 */
			marketDataSubscriptionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscription/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscription/items
			 * 
			 * @description Retrieves multiple entities of MarketDataSubscription type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscription/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscription/ldeps
			 * 
			 * @description Retrieves all entities of MarketDataSubscription type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscription/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /marketDataSubscription/list
			 * 
			 * @description Retrieves all entities of MarketDataSubscription type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			marketDataSubscriptionList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscription/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /marketDataSubscription/update
			 * 
			 * @description Updates an existing entity of MarketDataSubscription
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.userId 
			 * @param {String} body.timestamp 
			 * @param {Number} body.planPrice 
			 * @param {Integer} body.creditCardTransactionId 
			 * @param {Integer} body.cashBalanceLogId 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.marketDataSubscriptionPlanId 
			 * @param {Integer} body.year 
			 * @param {Integer} body.month 
			 * @param {Integer} body.renewalCreditCardId 
			 * @param {Integer} body.renewalAccountId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.marketDataSubscriptionPlanId 
			 * @return {Integer} res.year 
			 * @return {Integer} res.month 
			 * @return {Integer} res.renewalCreditCardId 
			 * @return {Integer} res.renewalAccountId 
			 */
			marketDataSubscriptionUpdate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					userId: undefined,
					timestamp: undefined,
					planPrice: undefined,
					creditCardTransactionId: undefined,
					cashBalanceLogId: undefined,
					creditCardId: undefined,
					accountId: undefined,
					marketDataSubscriptionPlanId: undefined,
					year: undefined,
					month: undefined,
					renewalCreditCardId: undefined,
					renewalAccountId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'marketDataSubscription/update', query: query || {}, body: body || {} })
			},
		};
		this.organization = {
			/**
			 * ## GET /organization/find
			 * 
			 * @description Retrieves an entity of Organization type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 */
			organizationFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'organization/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /organization/item
			 * 
			 * @description Retrieves an entity of Organization type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 */
			organizationItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'organization/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /organization/items
			 * 
			 * @description Retrieves multiple entities of Organization type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			organizationItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'organization/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /organization/list
			 * 
			 * @description Retrieves all entities of Organization type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			organizationList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'organization/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /organization/suggest
			 * 
			 * @description Retrieves entities of Organization type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			organizationSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'organization/suggest', query: query || {}, body: body || {} })
			},
		};
		this.secondMarketDataSubscription = {
			/**
			 * ## GET /secondMarketDataSubscription/deps
			 * 
			 * @description Retrieves all entities of SecondMarketDataSubscription type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			secondMarketDataSubscriptionDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'secondMarketDataSubscription/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /secondMarketDataSubscription/item
			 * 
			 * @description Retrieves an entity of SecondMarketDataSubscription type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Integer} res.year 
			 * @return {Integer} res.month 
			 * @return {Boolean} res.cancelledRenewal 
			 * @return {String} res.cancellationTimestamp 
			 */
			secondMarketDataSubscriptionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'secondMarketDataSubscription/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /secondMarketDataSubscription/items
			 * 
			 * @description Retrieves multiple entities of SecondMarketDataSubscription type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			secondMarketDataSubscriptionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'secondMarketDataSubscription/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /secondMarketDataSubscription/ldeps
			 * 
			 * @description Retrieves all entities of SecondMarketDataSubscription type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			secondMarketDataSubscriptionLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'secondMarketDataSubscription/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /secondMarketDataSubscription/list
			 * 
			 * @description Retrieves all entities of SecondMarketDataSubscription type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			secondMarketDataSubscriptionList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'secondMarketDataSubscription/list', query: query || {}, body: body || {} })
			},
		};
		this.tradovateSubscription = {
			/**
			 * ## POST /tradovateSubscription/create
			 * 
			 * @description Creates a new entity of TradovateSubscription
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.userId 
			 * @param {String} body.timestamp 
			 * @param {Number} body.planPrice 
			 * @param {Integer} body.creditCardTransactionId 
			 * @param {Integer} body.cashBalanceLogId 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.tradovateSubscriptionPlanId 
			 * @param {} body.startDate 
			 * @param {} body.expirationDate 
			 * @param {Number} body.paidAmount 
			 * @param {Boolean} body.cancelledRenewal 
			 * @param {String} body.cancelReason 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.tradovateSubscriptionPlanId 
			 * @return {} res.startDate 
			 * @return {} res.expirationDate 
			 * @return {Number} res.paidAmount 
			 * @return {Boolean} res.cancelledRenewal 
			 * @return {String} res.cancelReason 
			 */
			tradovateSubscriptionCreate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					userId: undefined,
					timestamp: undefined,
					planPrice: undefined,
					creditCardTransactionId: undefined,
					cashBalanceLogId: undefined,
					creditCardId: undefined,
					accountId: undefined,
					tradovateSubscriptionPlanId: undefined,
					startDate: undefined,
					expirationDate: undefined,
					paidAmount: undefined,
					cancelledRenewal: undefined,
					cancelReason: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscription/create', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscription/deps
			 * 
			 * @description Retrieves all entities of TradovateSubscription type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradovateSubscriptionDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscription/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscription/item
			 * 
			 * @description Retrieves an entity of TradovateSubscription type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.tradovateSubscriptionPlanId 
			 * @return {} res.startDate 
			 * @return {} res.expirationDate 
			 * @return {Number} res.paidAmount 
			 * @return {Boolean} res.cancelledRenewal 
			 * @return {String} res.cancelReason 
			 */
			tradovateSubscriptionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscription/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscription/items
			 * 
			 * @description Retrieves multiple entities of TradovateSubscription type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradovateSubscriptionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscription/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscription/ldeps
			 * 
			 * @description Retrieves all entities of TradovateSubscription type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradovateSubscriptionLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscription/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /tradovateSubscription/list
			 * 
			 * @description Retrieves all entities of TradovateSubscription type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			tradovateSubscriptionList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscription/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /tradovateSubscription/update
			 * 
			 * @description Updates an existing entity of TradovateSubscription
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.userId 
			 * @param {String} body.timestamp 
			 * @param {Number} body.planPrice 
			 * @param {Integer} body.creditCardTransactionId 
			 * @param {Integer} body.cashBalanceLogId 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.tradovateSubscriptionPlanId 
			 * @param {} body.startDate 
			 * @param {} body.expirationDate 
			 * @param {Number} body.paidAmount 
			 * @param {Boolean} body.cancelledRenewal 
			 * @param {String} body.cancelReason 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {Integer} res.tradovateSubscriptionPlanId 
			 * @return {} res.startDate 
			 * @return {} res.expirationDate 
			 * @return {Number} res.paidAmount 
			 * @return {Boolean} res.cancelledRenewal 
			 * @return {String} res.cancelReason 
			 */
			tradovateSubscriptionUpdate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					userId: undefined,
					timestamp: undefined,
					planPrice: undefined,
					creditCardTransactionId: undefined,
					cashBalanceLogId: undefined,
					creditCardId: undefined,
					accountId: undefined,
					tradovateSubscriptionPlanId: undefined,
					startDate: undefined,
					expirationDate: undefined,
					paidAmount: undefined,
					cancelledRenewal: undefined,
					cancelReason: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'tradovateSubscription/update', query: query || {}, body: body || {} })
			},
		};
		this.user = {
			/**
			 * ## POST /user/accepttradingpermission
			 * 
			 * @description ### Called to accept a given trading permission granted by another party.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.tradingPermissionId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.tradingPermission 
			 */
			acceptTradingPermission: async function (params={
				query: {
				},
				body: {
					tradingPermissionId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/accepttradingpermission', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/activatesecondmarketdatasubscriptionrenewal
			 * 
			 * @description ### Used to setup a second market data subscription with active auto-renewal.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.secondMarketDataSubscriptionId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode ConflictWithExisting, DowngradeNotAllowed, IncompatibleCMEMarketDataSubscriptionPlans, IncorrectPaymentMethod, InsufficientFunds, PaymentProviderError, PlanDiscontinued, SingleTrialOnly, Success, UnknownError
			 * @return {} res.secondMarketDataSubscription 
			 */
			activateSecondMarketDataSubscriptionRenewal: async function (params={
				query: {
				},
				body: {
					secondMarketDataSubscriptionId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/activatesecondmarketdatasubscriptionrenewal', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/addmarketdatasubscription
			 * 
			 * @description ### Add a subscription to Market Data for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Array} body.marketDataSubscriptionPlanIds 
			 * @param {Integer} body.year 
			 * @param {Integer} body.month 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.userId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode ConflictWithExisting, DowngradeNotAllowed, IncompatibleCMEMarketDataSubscriptionPlans, IncorrectPaymentMethod, InsufficientFunds, PaymentProviderError, PlanDiscontinued, SingleTrialOnly, Success, UnknownError
			 * @return {} res.marketDataSubscription 
			 */
			addMarketDataSubscription: async function (params={
				query: {
				},
				body: {
					marketDataSubscriptionPlanIds: undefined,
					year: undefined,
					month: undefined,
					creditCardId: undefined,
					accountId: undefined,
					userId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/addmarketdatasubscription', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/addsecondmarketdatasubscription
			 * 
			 * @description ### Add a second market data subscription for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.year 
			 * @param {Integer} body.month 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.userId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode ConflictWithExisting, DowngradeNotAllowed, IncompatibleCMEMarketDataSubscriptionPlans, IncorrectPaymentMethod, InsufficientFunds, PaymentProviderError, PlanDiscontinued, SingleTrialOnly, Success, UnknownError
			 * @return {} res.secondMarketDataSubscription 
			 */
			addSecondMarketDataSubscription: async function (params={
				query: {
				},
				body: {
					year: undefined,
					month: undefined,
					creditCardId: undefined,
					accountId: undefined,
					userId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/addsecondmarketdatasubscription', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/addtradovatesubscription
			 * 
			 * @description ### Used to add a Tradovate Trader membership plan for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.tradovateSubscriptionPlanId 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.userId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode ConflictWithExisting, DowngradeNotAllowed, IncompatibleCMEMarketDataSubscriptionPlans, IncorrectPaymentMethod, InsufficientFunds, PaymentProviderError, PlanDiscontinued, SingleTrialOnly, Success, UnknownError
			 * @return {} res.tradovateSubscription 
			 */
			addTradovateSubscription: async function (params={
				query: {
				},
				body: {
					tradovateSubscriptionPlanId: undefined,
					creditCardId: undefined,
					accountId: undefined,
					userId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/addtradovatesubscription', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/cancelsecondmarketdatasubscription
			 * 
			 * @description ### Cancel a second market data subscription for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.secondMarketDataSubscriptionId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode ConflictWithExisting, DowngradeNotAllowed, IncompatibleCMEMarketDataSubscriptionPlans, IncorrectPaymentMethod, InsufficientFunds, PaymentProviderError, PlanDiscontinued, SingleTrialOnly, Success, UnknownError
			 * @return {} res.secondMarketDataSubscription 
			 */
			cancelSecondMarketDataSubscription: async function (params={
				query: {
				},
				body: {
					secondMarketDataSubscriptionId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/cancelsecondmarketdatasubscription', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/cancelsecondmarketdatasubscriptionrenewal
			 * 
			 * @description ### Cancel the auto-renewal for a second market data subscription for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.secondMarketDataSubscriptionId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode ConflictWithExisting, DowngradeNotAllowed, IncompatibleCMEMarketDataSubscriptionPlans, IncorrectPaymentMethod, InsufficientFunds, PaymentProviderError, PlanDiscontinued, SingleTrialOnly, Success, UnknownError
			 * @return {} res.secondMarketDataSubscription 
			 */
			cancelSecondMarketDataSubscriptionRenewal: async function (params={
				query: {
				},
				body: {
					secondMarketDataSubscriptionId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/cancelsecondmarketdatasubscriptionrenewal', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/canceltradovatesubscription
			 * 
			 * @description ### Cancel a Tradovate Trader membership plan.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.tradovateSubscriptionId 
			 * @param {String} body.cancelReason 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode ConflictWithExisting, DowngradeNotAllowed, IncompatibleCMEMarketDataSubscriptionPlans, IncorrectPaymentMethod, InsufficientFunds, PaymentProviderError, PlanDiscontinued, SingleTrialOnly, Success, UnknownError
			 * @return {} res.tradovateSubscription 
			 */
			cancelTradovateSubscription: async function (params={
				query: {
				},
				body: {
					tradovateSubscriptionId: undefined,
					cancelReason: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/canceltradovatesubscription', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /user/find
			 * 
			 * @description Retrieves an entity of User type by its name
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.name  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.timestamp 
			 * @return {String} res.email 
			 * @return {String} res.status Active, Closed, Initiated, TemporaryLocked, UnconfirmedEmail
			 * @return {Boolean} res.professional 
			 * @return {Integer} res.organizationId 
			 * @return {Integer} res.linkedUserId Linked Live
			 * @return {Integer} res.foreignIntroducingBrokerId 
			 */
			userFind: async function (params={
				query: {
					name: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/find', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/getaccounttradingpermissions
			 * 
			 * @description ### Query the granted trading permissions associated with this account.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.accountId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Array} res.tradingPermissions 
			 */
			getAccountTradingPermissions: async function (params={
				query: {
				},
				body: {
					accountId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/getaccounttradingpermissions', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/getsecondmarketdatasubscriptioncost
			 * 
			 * @description ### Query the current price of a second market data subscription for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.year 
			 * @param {Integer} body.month 
			 * @param {Integer} body.userId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Number} res.monthlyCost 
			 */
			getSecondMarketDataSubscriptionCost: async function (params={
				query: {
				},
				body: {
					year: undefined,
					month: undefined,
					userId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/getsecondmarketdatasubscriptioncost', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /user/item
			 * 
			 * @description Retrieves an entity of User type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.name 
			 * @return {String} res.timestamp 
			 * @return {String} res.email 
			 * @return {String} res.status Active, Closed, Initiated, TemporaryLocked, UnconfirmedEmail
			 * @return {Boolean} res.professional 
			 * @return {Integer} res.organizationId 
			 * @return {Integer} res.linkedUserId Linked Live
			 * @return {Integer} res.foreignIntroducingBrokerId 
			 */
			userItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /user/items
			 * 
			 * @description Retrieves multiple entities of User type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /user/list
			 * 
			 * @description Retrieves all entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/modifycredentials
			 * 
			 * @description ### Used to modify account username and password.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.userId 
			 * @param {String} body.name 
			 * @param {String} body.password 
			 * @param {String} body.currentPassword 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.accessToken 
			 * @return {String} res.expirationTime 
			 * @return {String} res.passwordExpirationTime 
			 * @return {String} res.userStatus Active, Closed, Initiated, TemporaryLocked, UnconfirmedEmail
			 * @return {Integer} res.userId 
			 * @return {String} res.name 
			 * @return {Boolean} res.hasLive 
			 */
			modifyCredentials: async function (params={
				query: {
				},
				body: {
					userId: undefined,
					name: undefined,
					password: undefined,
					currentPassword: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/modifycredentials', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/modifyemailaddress
			 * 
			 * @description ### Change account email address information.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.userId 
			 * @param {String} body.email 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.status Active, Closed, Initiated, TemporaryLocked, UnconfirmedEmail
			 */
			modifyEmailAddress: async function (params={
				query: {
				},
				body: {
					userId: undefined,
					email: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/modifyemailaddress', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/modifypassword
			 * 
			 * @description ### Change account password information.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.userId 
			 * @param {String} body.password 
			 * @param {String} body.currentPassword 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.accessToken 
			 * @return {String} res.expirationTime 
			 * @return {String} res.passwordExpirationTime 
			 * @return {String} res.userStatus Active, Closed, Initiated, TemporaryLocked, UnconfirmedEmail
			 * @return {Integer} res.userId 
			 * @return {String} res.name 
			 * @return {Boolean} res.hasLive 
			 */
			modifyPassword: async function (params={
				query: {
				},
				body: {
					userId: undefined,
					password: undefined,
					currentPassword: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/modifypassword', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/opendemoaccount
			 * 
			 * @description ### Request to open a Demo account for a user.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.templateAccountId 
			 * @param {String} body.name 
			 * @param {Number} body.initialBalance 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Integer} res.accountId 
			 */
			openDemoAccount: async function (params={
				query: {
				},
				body: {
					templateAccountId: undefined,
					name: undefined,
					initialBalance: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/opendemoaccount', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/requesttradingpermission
			 * 
			 * @description ### Send a request to grant trading permission for your account to another party.
Once this request is reviewed by our accounting and compliance, the other party will be allowed to access your account as if it was one of that party&#x27;s own accounts.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.accountId 
			 * @param {String} body.ctaContact 
			 * @param {String} body.ctaEmail 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.tradingPermission 
			 */
			requestTradingPermission: async function (params={
				query: {
				},
				body: {
					accountId: undefined,
					ctaContact: undefined,
					ctaEmail: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/requesttradingpermission', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/revoketradingpermission
			 * 
			 * @description ### Revoke an existing trading permission granted to another party.
If a user wants to end the terms of a granted permission to trade using your account, a user can revoke those permissions using this endpoint.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.tradingPermissionId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.tradingPermission 
			 */
			revokeTradingPermission: async function (params={
				query: {
				},
				body: {
					tradingPermissionId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/revoketradingpermission', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/signuporganizationmember
			 * 
			 * @description ### Used by B2B partners to create users for their own organizations.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {String} body.name 
			 * @param {String} body.email 
			 * @param {String} body.password 
			 * @param {String} body.firstName 
			 * @param {String} body.lastName 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode DataError, EmailAlreadyRegistered, EmailPolicyFailed, FailedRecaptcha, Success, UnknownError, UserAlreadyExists, WeakPassword, WrongChallenge, WrongChallengeOrigin
			 * @return {Integer} res.userId 
			 * @return {Boolean} res.emailVerified 
			 */
			signUpOrganizationMember: async function (params={
				query: {
				},
				body: {
					name: undefined,
					email: undefined,
					password: undefined,
					firstName: undefined,
					lastName: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/signuporganizationmember', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /user/suggest
			 * 
			 * @description Retrieves entities of User type filtered by an occurrence of a text in one of its fields
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {String} query.t  Text
			 * @param {Integer} query.l  Max number of entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userSuggest: async function (params={
				query: {
					t: undefined,
					l: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/suggest', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /user/syncrequest
			 * 
			 * @description ### Used with WebSocket protocol. Returns all data associated with the user. 
This endpoint is essential for efficient use of the WebSocket API. See [WebSockets](/#tag/#WebSockets) for more details, or view our WebSockets [JavaScript](https://github.com/tradovate/example-api-js) or [C#](https://github.com/tradovate/example-api-csharp-trading) tutorials.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Array} body.users 
			 * @param {Array} body.accounts 
			 * @param {Boolean} body.splitResponses 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Array} res.users 
			 * @return {Array} res.accounts 
			 * @return {Array} res.accountRiskStatuses 
			 * @return {Array} res.marginSnapshots 
			 * @return {Array} res.userAccountAutoLiqs 
			 * @return {Array} res.cashBalances 
			 * @return {Array} res.currencies 
			 * @return {Array} res.positions 
			 * @return {Array} res.fillPairs 
			 * @return {Array} res.orders 
			 * @return {Array} res.contracts 
			 * @return {Array} res.contractMaturities 
			 * @return {Array} res.products 
			 * @return {Array} res.exchanges 
			 * @return {Array} res.spreadDefinitions 
			 * @return {Array} res.commands 
			 * @return {Array} res.commandReports 
			 * @return {Array} res.executionReports 
			 * @return {Array} res.orderVersions 
			 * @return {Array} res.fills 
			 * @return {Array} res.orderStrategies 
			 * @return {Array} res.orderStrategyLinks 
			 * @return {Array} res.userProperties 
			 * @return {Array} res.properties 
			 * @return {Array} res.userPlugins 
			 * @return {Array} res.contractGroups 
			 * @return {Array} res.orderStrategyTypes 
			 */
			syncRequest: async function (params={
				query: {
				},
				body: {
					users: undefined,
					accounts: undefined,
					splitResponses: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'user/syncrequest', query: query || {}, body: body || {} })
			},
		};
		this.userPlugin = {
			/**
			 * ## POST /userPlugin/addentitlementsubscription
			 * 
			 * @description ### For use with Add-ons, allows for purchase of entitlements such as Market Replay.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.entitlementId 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {Integer} body.userId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {String} res.errorCode ConflictWithExisting, DowngradeNotAllowed, IncompatibleCMEMarketDataSubscriptionPlans, IncorrectPaymentMethod, InsufficientFunds, PaymentProviderError, PlanDiscontinued, SingleTrialOnly, Success, UnknownError
			 * @return {} res.entitlementSubscription 
			 */
			addEntitlementSubscription: async function (params={
				query: {
				},
				body: {
					entitlementId: undefined,
					creditCardId: undefined,
					accountId: undefined,
					userId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/addentitlementsubscription', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /userPlugin/changepluginpermission
			 * 
			 * @description ### Change the permissions for a Trader plugin.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.userId 
			 * @param {String} body.pluginName 
			 * @param {Boolean} body.approval 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {Boolean} res.ok 
			 */
			changePluginPermission: async function (params={
				query: {
				},
				body: {
					userId: undefined,
					pluginName: undefined,
					approval: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/changepluginpermission', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /userPlugin/create
			 * 
			 * @description Creates a new entity of UserPlugin
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.userId 
			 * @param {String} body.timestamp 
			 * @param {Number} body.planPrice 
			 * @param {Integer} body.creditCardTransactionId 
			 * @param {Integer} body.cashBalanceLogId 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {String} body.pluginName 
			 * @param {Boolean} body.approval 
			 * @param {Integer} body.entitlementId 
			 * @param {} body.startDate 
			 * @param {} body.expirationDate 
			 * @param {Number} body.paidAmount 
			 * @param {Boolean} body.autorenewal 
			 * @param {String} body.planCategories 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {String} res.pluginName 
			 * @return {Boolean} res.approval 
			 * @return {Integer} res.entitlementId 
			 * @return {} res.startDate 
			 * @return {} res.expirationDate 
			 * @return {Number} res.paidAmount 
			 * @return {Boolean} res.autorenewal 
			 * @return {String} res.planCategories 
			 */
			userPluginCreate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					userId: undefined,
					timestamp: undefined,
					planPrice: undefined,
					creditCardTransactionId: undefined,
					cashBalanceLogId: undefined,
					creditCardId: undefined,
					accountId: undefined,
					pluginName: undefined,
					approval: undefined,
					entitlementId: undefined,
					startDate: undefined,
					expirationDate: undefined,
					paidAmount: undefined,
					autorenewal: undefined,
					planCategories: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/create', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userPlugin/deps
			 * 
			 * @description Retrieves all entities of UserPlugin type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userPluginDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userPlugin/item
			 * 
			 * @description Retrieves an entity of UserPlugin type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {String} res.pluginName 
			 * @return {Boolean} res.approval 
			 * @return {Integer} res.entitlementId 
			 * @return {} res.startDate 
			 * @return {} res.expirationDate 
			 * @return {Number} res.paidAmount 
			 * @return {Boolean} res.autorenewal 
			 * @return {String} res.planCategories 
			 */
			userPluginItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userPlugin/items
			 * 
			 * @description Retrieves multiple entities of UserPlugin type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userPluginItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userPlugin/ldeps
			 * 
			 * @description Retrieves all entities of UserPlugin type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userPluginLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userPlugin/list
			 * 
			 * @description Retrieves all entities of UserPlugin type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userPluginList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /userPlugin/update
			 * 
			 * @description Updates an existing entity of UserPlugin
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.id 
			 * @param {Integer} body.userId 
			 * @param {String} body.timestamp 
			 * @param {Number} body.planPrice 
			 * @param {Integer} body.creditCardTransactionId 
			 * @param {Integer} body.cashBalanceLogId 
			 * @param {Integer} body.creditCardId 
			 * @param {Integer} body.accountId 
			 * @param {String} body.pluginName 
			 * @param {Boolean} body.approval 
			 * @param {Integer} body.entitlementId 
			 * @param {} body.startDate 
			 * @param {} body.expirationDate 
			 * @param {Number} body.paidAmount 
			 * @param {Boolean} body.autorenewal 
			 * @param {String} body.planCategories 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {Number} res.planPrice 
			 * @return {Integer} res.creditCardTransactionId 
			 * @return {Integer} res.cashBalanceLogId 
			 * @return {Integer} res.creditCardId 
			 * @return {Integer} res.accountId 
			 * @return {String} res.pluginName 
			 * @return {Boolean} res.approval 
			 * @return {Integer} res.entitlementId 
			 * @return {} res.startDate 
			 * @return {} res.expirationDate 
			 * @return {Number} res.paidAmount 
			 * @return {Boolean} res.autorenewal 
			 * @return {String} res.planCategories 
			 */
			userPluginUpdate: async function (params={
				query: {
				},
				body: {
					id: undefined,
					userId: undefined,
					timestamp: undefined,
					planPrice: undefined,
					creditCardTransactionId: undefined,
					cashBalanceLogId: undefined,
					creditCardId: undefined,
					accountId: undefined,
					pluginName: undefined,
					approval: undefined,
					entitlementId: undefined,
					startDate: undefined,
					expirationDate: undefined,
					paidAmount: undefined,
					autorenewal: undefined,
					planCategories: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userPlugin/update', query: query || {}, body: body || {} })
			},
		};
		this.userProperty = {
			/**
			 * ## GET /userProperty/deps
			 * 
			 * @description Retrieves all entities of UserProperty type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userPropertyDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userProperty/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userProperty/item
			 * 
			 * @description Retrieves an entity of UserProperty type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {Integer} res.propertyId 
			 * @return {String} res.value 
			 */
			userPropertyItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userProperty/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userProperty/items
			 * 
			 * @description Retrieves multiple entities of UserProperty type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userPropertyItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userProperty/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userProperty/ldeps
			 * 
			 * @description Retrieves all entities of UserProperty type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userPropertyLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userProperty/ldeps', query: query || {}, body: body || {} })
			},
		};
		this.userSession = {
			/**
			 * ## GET /userSession/item
			 * 
			 * @description Retrieves an entity of UserSession type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.startTime 
			 * @return {String} res.endTime 
			 * @return {String} res.ipAddress 
			 * @return {String} res.appId 
			 * @return {String} res.appVersion 
			 * @return {Integer} res.clientAppId 
			 */
			userSessionItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userSession/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userSession/items
			 * 
			 * @description Retrieves multiple entities of UserSession type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userSessionItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userSession/items', query: query || {}, body: body || {} })
			},
		};
		this.userSessionStats = {
			/**
			 * ## GET /userSessionStats/deps
			 * 
			 * @description Retrieves all entities of UserSessionStats type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userSessionStatsDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userSessionStats/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userSessionStats/item
			 * 
			 * @description Retrieves an entity of UserSessionStats type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.lastSessionTime 
			 * @return {Integer} res.failedPasswords 
			 */
			userSessionStatsItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userSessionStats/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userSessionStats/items
			 * 
			 * @description Retrieves multiple entities of UserSessionStats type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userSessionStatsItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userSessionStats/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userSessionStats/ldeps
			 * 
			 * @description Retrieves all entities of UserSessionStats type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userSessionStatsLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userSessionStats/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /userSessionStats/list
			 * 
			 * @description Retrieves all entities of UserSessionStats type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			userSessionStatsList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'userSessionStats/list', query: query || {}, body: body || {} })
			},
		};
		this.chat = {
			/**
			 * ## POST /chat/closechat
			 * 
			 * @description ### Close the chat context.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.chatId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.chat 
			 */
			closeChat: async function (params={
				query: {
				},
				body: {
					chatId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chat/closechat', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /chat/deps
			 * 
			 * @description Retrieves all entities of Chat type related to User entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of User entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			chatDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chat/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /chat/item
			 * 
			 * @description Retrieves an entity of Chat type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {Integer} res.userId 
			 * @return {String} res.timestamp 
			 * @return {String} res.category Support, TradeDesk
			 * @return {Integer} res.assignedSupportId Assigned To
			 * @return {Integer} res.closedById Closed By
			 * @return {String} res.closeTimestamp 
			 */
			chatItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chat/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /chat/items
			 * 
			 * @description Retrieves multiple entities of Chat type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			chatItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chat/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /chat/ldeps
			 * 
			 * @description Retrieves all entities of Chat type related to multiple entities of User type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of User entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			chatLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chat/ldeps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /chat/list
			 * 
			 * @description Retrieves all entities of Chat type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			chatList: async function (params={
				query: {
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chat/list', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /chat/markasreadchatmessage
			 * 
			 * @description ### Marks a chat message as read.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.chatMessageId 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.chatMessage 
			 */
			markAsReadChatMessage: async function (params={
				query: {
				},
				body: {
					chatMessageId: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chat/markasreadchatmessage', query: query || {}, body: body || {} })
			},
			/**
			 * ## POST /chat/postchatmessage
			 * 
			 * @description ### Post a chat message to a given chat&#x27;s history.
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Object} body
			 * @param {Integer} body.userId 
			 * @param {String} body.category Support, TradeDesk
			 * @param {String} body.text 
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {String} res.errorText Non-empty if the request failed
			 * @return {} res.chatMessage 
			 */
			postChatMessage: async function (params={
				query: {
				},
				body: {
					userId: undefined,
					category: undefined,
					text: undefined
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chat/postchatmessage', query: query || {}, body: body || {} })
			},
		};
		this.chatMessage = {
			/**
			 * ## GET /chatMessage/deps
			 * 
			 * @description Retrieves all entities of ChatMessage type related to Chat entity
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.masterid  id of Chat entity
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			chatMessageDependents: async function (params={
				query: {
					masterid: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chatMessage/deps', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /chatMessage/item
			 * 
			 * @description Retrieves an entity of ChatMessage type by its id
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Integer} query.id  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 * @return {Integer} res.id 
			 * @return {String} res.timestamp 
			 * @return {Integer} res.chatId 
			 * @return {Integer} res.senderId 
			 * @return {String} res.senderName 
			 * @return {String} res.text 
			 * @return {Boolean} res.readStatus 
			 */
			chatMessageItem: async function (params={
				query: {
					id: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chatMessage/item', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /chatMessage/items
			 * 
			 * @description Retrieves multiple entities of ChatMessage type by its ids
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.ids  
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			chatMessageItems: async function (params={
				query: {
					ids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chatMessage/items', query: query || {}, body: body || {} })
			},
			/**
			 * ## GET /chatMessage/ldeps
			 * 
			 * @description Retrieves all entities of ChatMessage type related to multiple entities of Chat type
			 * 
			 * @param {string} url
			 * @param {Object} query
			 * @param {Array} query.masterids  ids of Chat entities
			 * @param {Object} body
			 * @throws {Error} rej
			 * @return {Promise} res
			 */
			chatMessageLDependents: async function (params={
				query: {
					masterids: undefined
				},
				body: {
				}
			}) {
				const { query, body } = params;
				return await API.request({ url: 'chatMessage/ldeps', query: query || {}, body: body || {} })
			},
		};
	}
}

module.exports = API;