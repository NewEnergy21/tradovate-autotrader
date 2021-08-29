# Handlers

### onEvent
Interprets incoming messages to determine if they represent market data (DOMs, Quotes, Histograms, and Charts) or event data (UserSync requests, Props).


### Market Data Messages

#### onChart
Parses the Chart payload so that we can appropriately handle bars and ticks and stores them under `Strategy.state.bars` and `Strategy.state.ticks` respectively. It makes an effort to give volume-bars and ticks a common, flat data structure so that they can be easily compared.

#### onDOM
Parses the DOM payload so that we can appropriately handle Depth-of-Market data and make sense of limit order price and size at various levels above and below the current bid & ask, and stores it under `Strategy.state.doms`.

#### onHistogram
Parses the Histogram payload so that we can use it effectively to represent the volume profile of the trading session, and stores it under `Strategy.state.histograms`.

#### onQuote
Parses the Quote payload, namely flattening it, so that we can traverse it more easily, and stores it under `Strategy.state.quotes`.

### Event Messages

### onUserSync
Parses the bulk userSync payload, and adds all the parent arrays containing various Props entities to the overall `Strategy.state` object.

### onProps
Parses individual Props payloads and overwrites or adds them to the appriopriate parent arrays in the overall `Strategy.state` object.