// enum.js
// A file containing several JavaScript objects to act as enumerated variables
// Intended to simplify interpretation of the Tradovate API and streamline state management and good coding practices

// NOTE: URLs is formatted as such for ease of reference with the CLI implementation
// Contains the various API URLs to establish for REST and WebSocket connections
const URLs = {

    // DEMO URLs
    d: {
        url: 'https://demo.tradovateapi.com/v1',
	    wss: 'wss://demo.tradovateapi.com/v1/websocket',
	    mds: 'wss://md-demo.tradovateapi.com/v1/websocket'
    },

	// LIVE URLs
    l: {
        url: 'https://live.tradovateapi.com/v1',
	    wss: 'wss://live.tradovateapi.com/v1/websocket',
	    mds: 'wss://md.tradovateapi.com/v1/websocket'
    },

	// REPLAY URLs
    r: {
	    url: 'https://replay.tradovateapi.com/v1',
	    wss: 'wss://replay.tradovateapi.com/v1/websocket',
	    mds: 'wss://replay.tradovateapi.com/v1/websocket'
    }

}

// An object containing the `ChartType` codes accepted by the Tradovate API in requesting chart subscriptions
// Optional for use in a Strategy, highly recommended for use in `configureRobot.cjs`
const ChartType = {
	MinuteBar: 'MinuteBar',
	Tick: 'Tick',
	DailyBar: 'DailyBar',
	Custom: 'Custom',
	DOM: 'DOM'
}
 
// An object containing the `ChartUnits` codes accepted by the Tradovate API in requesting chart subscriptions
// Optional for use in a Strategy, highly recommended for use in `configureRobot.cjs`
const ChartUnits = {
	Volume: 'Volume',
	Range: 'Range',
	UnderlyingUnits: 'UnderlyingUnits',
	Renko: 'Renko',
	MomentumRange: 'MomentumRange',
	PointAndFigure: 'PointAndFigure',
	OFARange: 'OFARange',
	Seconds: 'Seconds'
}
 
// An object containing the `OrderAction` codes accepted by the Tradovate API in placing / modifying orders
// Optional for use in a Strategy
const OrderAction = {
	Buy: 'Buy',
	Sell: 'Sell'
}

// An object containing the various `OrderType` codes accepted by the Tradovate API in placing / modifying orders
// Optional for use in a Strategy
const OrderType = {
	Limit: 'Limit',
	MIT: 'MIT',
	Market: 'Market',
	QTS: 'QTS',
	Stop: 'Stop',
	StopLimit: 'StopLimit',
	TrailingStop: 'TrailingStop',
	TrailingStopLimit: 'TrailingStopLimit'
}

// An object containing the various `CommandStatus` codes associated with a `command` and `commandReport`
// Not utilized by this application
const CommandStatus = {
	AtExecution: "AtExecution",
	ExecutionRejected: "ExecutionRejected",
	ExecutionStopped: "ExecutionStopped",
	ExecutionSuspended: "ExecutionSuspended",
	OnHold: "OnHold",
	Pending: "Pending",
	PendingExecution: "PendingExecution",
	Replaced: "Replaced",
	RiskPassed: "RiskPassed",
	RiskRejected: "RiskRejected" 
}

// An object containing the various `ExecType` codes associated with an `executionReport`
// Not utilized by this application
const ExecType = {
	Canceled: "Canceled",
	Completed: "Completed",
	DoneForDay: "DoneForDay",
	Expired: "Expired",
	New: "New",
	OrderStatus: "OrderStatus",
	PendingCancel: 'PendingCancel',
	PendingNew: 'PendingNew',
	PendingReplace: 'PendingReplace',
	Rejected: 'Rejected',
	Replaced: "Replaced",
	Stopped: "Stopped",
	Suspended: "Suspended",
	Trade: "Trade",
	TradeCancel: "TradeCancel",
	TradeCorrect: "TradeCorrect"  			   
}

// An object containing the discrete `OrdStatus` codes associated with an order's current state
const OrdStatus = {
	Canceled: 'Canceled',
	Completed: 'Completed',
	Expired: 'Expired',
	Filled: 'Filled',
	PendingCancel: 'PendingCancel',
	PendingNew: 'PendingNew',
	PendingReplace: 'PendingReplace',
	Rejected: 'Rejected',
	Suspended: 'Suspended',			// Pending / Waiting to submit due to bracket
	Unknown: 'Unknown',
	Working: 'Working'
}

// Custom partition of `OrdStatus` for statuses explicitly corresponding to an active order,
// i.e., the order exists and or is active or waiting to be made active and working to be filled
const WorkingOrder = {
	PendingCancel: 'PendingCancel',
	PendingNew: 'PendingNew',
	PendingReplace: 'PendingReplace',
	Working: 'Working',
	Suspended: 'Suspended',
}

// Custom partition of `OrdStatus` for statuses explicitly corresponding to a null order,
// i.e., the order either doesn't exist or is no longer active in the market waiting or working for a fill
const NoOrder = {
	Canceled: 'Canceled',
	Completed: 'Completed',
	Expired: 'Expired',
	Filled: 'Filled',
	Rejected: 'Rejected',
	Unknown: 'Unknown',
}

// A generic object to identify all the `rejectReason` codes that can come in a `failureReason` response
// Not actively used by the application, but can be used to develop custom error handling logic
const RejectReason = {
	AccountClosed: "AccountClosed",
	AdvancedTrailingStopUnsupported: "AdvancedTrailingStopUnsupported",
	AnotherCommandPending: "AnotherCommandPending",
	BackMonthProhibited: "BackMonthProhibited",
	ExecutionProviderNotConfigured: "ExecutionProviderNotConfigured",
	ExecutionProviderUnavailable: "ExecutionProviderUnavailable",
	InvalidContract: "InvalidContract",
	InvalidPrice: "InvalidPrice",
	LiquidationOnly: "LiquidationOnly",
	LiquidationOnlyBeforeExpiration: "LiquidationOnlyBeforeExpiration",
	MaxOrderQtyIsNotSpecified: "MaxOrderQtyIsNotSpecified",
	MaxOrderQtyLimitReached: "MaxOrderQtyLimitReached",
	MaxPosLimitMisconfigured: "MaxPosLimitMisconfigured",
	MaxPosLimitReached: "MaxPosLimitReached",
	MaxTotalPosLimitReached: "MaxTotalPosLimitReached",
	MultipleAccountPlanRequired: "MultipleAccountPlanRequired",
	NoQuote: "NoQuote",
	NotEnoughLiquidity: "NotEnoughLiquidity",
	OtherExecutionRelated: "OtherExecutionRelated",
	ParentRejected: "ParentRejected",
	RiskCheckTimeout: "RiskCheckTimeout",
	SessionClosed: "SessionClosed",
	Success: "Success",
	TooLate: "TooLate",
	TradingLocked: "TradingLocked",
	TrailingStopNonOrderQtyModify: "TrailingStopNonOrderQtyModify",
	Unauthorized: "Unauthorized",
	UnknownReason: "UnknownReason",
	Unsupported: "Unsupported"
}

// A generic object to identify all types of event `props` or market data `md` messages
const TdMessage = {
    Chart: 'charts',
    DOM: 'doms',
    Histogram: 'histograms',
    Quote: 'quotes',
    UserSync: 'usersync',
    Props: 'props'
}

// A shortcut object to identify critical event `props` messages, e.g.,
// { e: "props", d: { data } } 
const TdEvent = {
    usersync: 'usersync',
    props: 'props',
}

// A shortcut object to identify market data `md` messages, e.g.,
// { e: "md", d: { TdData.key: data } } 
const TdData = {
    charts: 'charts',
    doms: 'doms',
    histograms: 'histograms',
    quotes: 'quotes'
}

// A custom object containing all the `props` families returned in the 
// user/syncrequest response, i.e., the arrays at the top level
// Use this if you want to define custom logic for a specific `props` entity
const TdSyncProps = {
	
	// Non-Synced Props
    // These `props` are based on endpoint families that are not tracked in the user/syncrequest result
	md: "md",
    auth: "auth",
    currencyRate: "currencyRate",
    productSession: "productSession",
    fillFee: "fillFee",
    cashBalanceLog: "cashBalanceLog",
    tradingPermission: "tradingPermission",
    contractMargin: "contractMargin",
    productMargin: "productMargin",
    userAccountPositionLimit: "userAccountPositionLimit",
    userAccountRiskParameter: "userAccountRiskParameter",
    marketDataSubscriptionExchangeScope: "marketDataSubscriptionExchangeScope",
    marketDataSubscriptionPlan: "marketDataSubscriptionPlan",
    tradovateSubscriptionPlan: "tradovateSubscriptionPlan",
    adminAlertSignal: "adminAlertSignal",
    alert: "alert",
    alertSignal: "alertSignal",
    adminAlert: "adminAlert",
    clearingHouse: "clearingHouse",
    entitlement: "entitlement",
    contactInfo: "contactInfo",
    marketDataSubscription: "marketDataSubscription",
    organization: "organization",
    secondMarketDataSubscription: "secondMarketDataSubscription",
    tradovateSubscription: "tradovateSubscription",
    userSession: "userSession",
    chat: "chat",
    chatMessage: "chatMessage",

	// Synced Props
    // These `props` will be retrieved in a user/syncrequest API request
    contract: "contracts",
    contractGroup: "contractGroups",
    contractMaturity: "contractMaturities",
    currency: "currencies",
    exchange: "exchanges",
    product: "products",
    spreadDefinition: "spreadDefinitions",
    command: "commands",
    commandReport: "commandReports",
    executionReport: "executionReports",
    fill: "fills",
    order: "orders",
    orderStrategy: "orderStrategies",
    orderStrategyLink: "orderStrategyLinks",
    orderVersion: "orderVersions",
    fillPair: "fillPairs",
    position: "positions",
    account: "accounts",
    cashBalance: "cashBalances",
    marginSnapshot: "marginSnapshots",
    accountRiskStatus: "accountRiskStatuses",
    userAccountAutoLiq: "userAccountAutoLiqs",
    orderStrategyType: "orderStrategyTypes",
    property: "properties",
    user: "users",
    userPlugin: "userPlugins",
    userProperty: "userProperties",
    userSessionStats: "userSessionStats",
    
}

// A custom object compiling Tradovate's varies `props` families for reference
// Use this if you want to define custom logic for a specific `props` entity
// NOTE: notice that the key: value pairs are generally singular, and not plural: 
// this refers to the `props` value, rather than the `props` key (i.e., the values 
// inside the arrays returned in the user/syncrequest response
const TdProps = {
    md: "md",
    auth: "auth",
    contract: "contract",
    contractGroup: "contractGroup",
    contractMaturity: "contractMaturity",
    currency: "currency",
    currencyRate: "currencyRate",
    exchange: "exchange",
    product: "product",
    productSession: "productSession",
    spreadDefinition: "spreadDefinition",
    command: "command",
    commandReport: "commandReport",
    executionReport: "executionReport",
    fill: "fill",
    fillFee: "fillFee",
    order: "order",
    orderStrategy: "orderStrategy",
    orderStrategyLink: "orderStrategyLink",
    orderVersion: "orderVersion",
    fillPair: "fillPair",
    position: "position",
    account: "account",
    cashBalance: "cashBalance",
    cashBalanceLog: "cashBalanceLog",
    marginSnapshot: "marginSnapshot",
    tradingPermission: "tradingPermission",
    accountRiskStatus: "accountRiskStatus",
    contractMargin: "contractMargin",
    productMargin: "productMargin",
    userAccountAutoLiq: "userAccountAutoLiq",
    userAccountPositionLimit: "userAccountPositionLimit",
    userAccountRiskParameter: "userAccountRiskParameter",
    marketDataSubscriptionExchangeScope: "marketDataSubscriptionExchangeScope",
    marketDataSubscriptionPlan: "marketDataSubscriptionPlan",
    tradovateSubscriptionPlan: "tradovateSubscriptionPlan",
    adminAlertSignal: "adminAlertSignal",
    alert: "alert",
    alertSignal: "alertSignal",
    adminAlert: "adminAlert",
    clearingHouse: "clearingHouse",
    entitlement: "entitlement",
    orderStrategyType: "orderStrategyType",
    property: "property",
    contactInfo: "contactInfo",
    marketDataSubscription: "marketDataSubscription",
    organization: "organization",
    secondMarketDataSubscription: "secondMarketDataSubscription",
    tradovateSubscription: "tradovateSubscription",
    user: "user",
    userPlugin: "userPlugin",
    userProperty: "userProperty",
    userSession: "userSession",
    userSessionStats: "userSessionStats",
    chat: "chat",
    chatMessage: "chatMessage"
}

// Export all the enumerated variables
module.exports = {
    URLs,
	ChartType,
	ChartUnits,
	OrderAction,
	OrderType,
	CommandStatus,
	ExecType,
	OrdStatus,
	RejectReason,
	WorkingOrder,
	NoOrder,
	TdMessage,
	TdEvent,
	TdData,
	TdSyncProps,
	TdProps
}