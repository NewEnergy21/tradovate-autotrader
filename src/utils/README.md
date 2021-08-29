# Configuration

### Background Information

`connect.js`, `enum.js`, `services.js`, and `storage.js` are best left alone and provide several background processes and functions to enable us to authenticate with the Tradovate API and to store session information locally. Notably, a `sessionFile.json` is written and read from in the active working directory, storing our access token and expirations, etc. It acts similar to pickling in Python and serves as a proxy for a cookie or `sessionStorage` in a browser since we don't have the browser exposed in `Node.js`. This conveniently allows you to persist tokens, etc between runs of the app.

### Critical Files

`helpers.js` contains a few well-documented helper functions that are utilized for the `Strategy.state` and other bits and pieces. A few other general helper functions are available as well to streamline some of the mathematical or data structural logic for strategies, etc.

`initialize.js` initializes the strategy with the relevant `env` and `config` parameters. By default, the system is configured to retrieve 1-Tick charts, 1-Volume charts, and 1-Minute bars. If you'd like to use different data, feel free to adapt, however, be sure to separately store the chart subscriptions in the relevant `Strategy.state.barSubscription`, `Strategy.state.tickSubscription`, `Strategy.state.volumeSubscription` so that we can effectively process the respective chart messages without errors. DOMs and Histograms are typically not necessarily for a strategy, but Quotes generally are necessary. Be sure to leave the strategy initialization code untouched, as it's critical for ensuring a safe, asynchronous, and event-driven nature for the strategies.