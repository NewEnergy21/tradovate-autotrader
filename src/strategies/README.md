# Strategies

Strategies work in an event-driven manner, taking in market data and event data and assessing the current state of order management. The parent `Strategy` class is subclassed into `SubStrategy`, which is where you implement your own strategy and ordering logic.

Strategies store all relevant data under `Strategy.state`, including market data (e.g., `Strategy.state.doms`, `Strategy.state.ticks`), and event data (e.g., `Strategy.state.positions`, `Strategy.state.fills`).

Strategies are asynchronous and event driven. We add event listeners to pass market data and event data messages from `MarketDataSocket` and `TradovateSocket` into the strategy. On new messages, the Strategy calls the `update()` and nested `alpha()` functions to estimate the state of current orders, whether or not we are asynchronously listening for a promise or order update, calculate signals, and determine the next action to take.

### Hesitations

Strategies are occasionally blocking. Though the intent is for truly asynchronous event-driven strategies, occasionally, we will have message arrival collisions, such as:
* Quote received: `Strategy.update()`, buy signal, calls `Socket.order.placeOrder()`
* Quote received: `Strategy.update()`, buy signal, calls `Socket.order.placeOrder()` **before the first order was confirmed**
* Order confirmation: `Strategy.update()`, net position, calls `Socket.order.liquidatePosition()` **before we are over our max position limit**

To prevent this, order calls are placed in a `hesitation` sequence, and new order management is prohibited until the `hesitation` is complete based on per-endpoint logic (i.e., the `hesitation` for `Socket.order.placeOrder()` has different completion criteria than `Socket.order.placeOSO()`). During the `hesitation`, new order calls are prohibited, but quotes are still processed and signals can still be generated. In a sense, this makes the system somewhat blocking due to use of `await` for `Promises`, but Tradovate's API is relatively low latency and responses generally come in less than 200 ms, depending on your bandwidth and internet connection. The main intent is to prevent race conditions with potentially costly consequences.

In your ordering logic, you'll need to define hesitations for the various types of `order/` requests you can make. These have the general structure:

```
let request = (doWeHaveASignal) && {
	body: {
		...requestBodyData
	}
}

// If we have a request built, prepare to send it
if (allowOrders && request && anyOtherCustomFailsafeOrErrorChecks) {

	// Write a log for awareness
	this.pending = true;
	const data = await this.socket.<parent>.<endPoint>(request);
	console.log(magenta(`<endPoint> ${JSON.stringify(data)}`));
	this.hesitations.<endPoint>.push(data);
	this.pending = false;

}
```

The parent `Strategy` class implements the `hesitation` logic under `isHesitant()`. Several endpoints are already defined, to handle the following order types:

* `isCancelOrder()`
* `isLiquidatePosition()`
* `isModifyOrder()`
* `isPlaceOCO()`
* `isPlaceOSO()`
* `isPlaceOrder()`

If you'd like to support more complex order types, e.g., `startOrderStrategy` or `modifyOrderStrategy`, you'll need to adapt and implement these hesitations as well.

### Custom Strategies
In your `SubStrategy`, you'll need to override the following functions to establish your signal and order management logic:

* `alpha()`
* `workingNoPos()`
* `workingNetPos()`
* `inactiveNoPos()`
* `inactiveNetPos()`
* `trimPosition()`

An example `CrossOverStrategy.js` is provided.