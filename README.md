# Automated Trader for the Tradovate API

**`tradovate-autotrader`** is an example, lightweight Node.js app illustrating one approach to using the [Tradovate API](https://api.tradovate.com/). It is designed for simple strategies and basic order management.

Tradovate uses a WebSocket API to manage orders and positions through your account in a Demo, Live, or Replay environment. This app gives you the components to quickly and easily define basic strategies and ordering logic. This app is designed to be event-driven and asynchronous. In special cases to ensure order handling integrity, synchronous blocking is enforced. 

## Features
* Single symbol order management
* Support for market replay simulated trading
* Simple command line interface for running the app

## Limitations
* Can only trade 1 symbol at a time before needing to rerun the app, so complex strategies involving pairs trading and portfolios of symbols will need adaptation
* Has API support for complex order strategies, but will need to be adapted to add that capability into the Strategy framework
* Can only support single account trading, so users with multiple linked accounts will not be able to use this

## Getting Started

Download the GitHub repo to your local machine (this is not yet an `npm` package). Navigate to the root of the directory, e.g., `~/tradovate-autotrader/`.

If you have yarn, use it to quickly add all the `npm modules`:

```yarn install```

Else, use `npm` directly: 

```npm install```

Then, to make use of the CLI, run:

```npm install -g .```

Rename `auth-template.js` to `auth.js` and modify your API credentials in it. Refer to the Tradovate [API documentation](https://api.tradovate.com/), [community forum](https://community.tradovate.com/), and [FAQ](https://tradovate.zendesk.com/hc/en-us) for getting your API information set up.

Next, ensure you have the correct symbol and other fields in `env.js` so that you trade the contract you want to. `env.js` is mainly for high level strategy configuration, not for custom indicator or signal generation. Use the Tradovate API docs to get the contract id and symbol information for your desired contract.

Then, add any desired fields in the `config.js` that will be accessible to your custom strategy. For example, if you want to run a moving crossover strategy, you might want the `fastMA` and `slowMA` periods to be accessible here.

Develop your strategy and order logic as an extension of the `Strategy` class. An example strategy has been provided. You'll want to override `alpha()` for generating signals and alpha using market data, and override some of the other `Strategy` subclass methods for order management.

By default, strategies pull in 1-tick, 1-volume, and 1-minute charts. 1-volume charts are necessary in order to accurately identify market orders, if your strategy depends on that information. You can modify `initialize.js` and some `env.js` fields to adapt the type of charts you pull.

Finally, test it out in the CLI.

#### Demo account
```$ tradovate-autotrader -e d```

#### Replay account
Ensure you provide a timestamp to start replay on in ISO 8601 format. An easy way to grab this is via `(new Date(2021, 8, 22, 9, 30)).toISOString()` in a browser console.

```$ tradovate-autotrader -e r -r 2021-08-17T15:00:00.000Z```

#### With ordering enabled
```$ tradovate-autotrader -e d -o```

## Warning

While ordering via API is possible, please be sure to test your strategy thoroughly in demo and replay first. We cannot assume liability for your trading activity and use of this code for automated trading does not constitute financial advice. Further, this app / framework is not endorsed or supported in any way by Tradovate.