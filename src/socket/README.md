# Sockets

Defines a `connect()`, `disconnect()`, and `request()` function which enables it to simply interrogate the Tradovate WebSocket API.

Further, implements API endpoints under their respective families, accessible as:

```
let exampleSocket = new TradovateSocket();

let apiRequest = exampleSocket.parent.endpoint({
	query: {
		...
	},
	body: {
		...
	}
})

// Example
let placeOrderRequest = exampleSocket.order.placeOrder({
	body: {
		...
	}
})
```

Note, additional fields can be defined on the socket, but it is highly recommended to ensure they do not overwrite the `parent` fields (e.g., `order`, `fillPair`, `md`, etc.)

Tradovate uses a separate `MarketDataSocket` and `TradovateSocket` connection to handle market data and user event messages respectively. Refer to the documentation and example apps on [Tradovate's Github](https://github.com/tradovate/example-api-js/tree/main/tutorial/WebSockets) for a detailed overview on the basic architecture. The example apps use a functional approach; This app generalizes down to a single `TradovateSocket` class which can be used hybridly for both market data and user events in two separate class instances.