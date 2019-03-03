<h3 align='center'>Stock-data.js</h3>
<p align="center">
  Easy to use stock market API for Node.js using WorldTradingData as source.
</p>

<p align="center">
  <a href='https://www.npmjs.com/package/stock-data.js'><img src='https://img.shields.io/npm/v/stock-data.js.svg' alt='Build status' /></a>
  <a href='https://travis-ci.com/davidsoederberg/stock-data'><img src='https://travis-ci.com/davidsoederberg/stock-data.js.svg' alt='Build status' /></a>
  <a href='https://coveralls.io/github/davidsoederberg/stock-data.js'><img src='https://coveralls.io/repos/github/davidsoederberg/stock-data.js/badge.svg' alt='Coverage Status' /></a>
</p>


> :bulb: This library is new, so there might be issues. If you find any, please report them at the
[issues](https://github.com/davidsoederberg/stock-data.js/issues) section.

## Features

- Real time data (multiple stocks at a time)
- Historical data 
- Historical data from one day (multiple stocks at a time)
- Intraday Data
- Search
- Forex data (realtime, historical)
- Manipulate your data using options

## Installing

```bash
$ npm install stock-data.js
```
## API-token

Go to [WorldTradingData](https://www.worldtradingdata.com/) and obtain an API-token for free by creating an account.

(A free account you can make 250 API-calls per day and you can follow how many you have left from their dashboard)

## Usage

Because the API-token is personal I would recommend using the token as an enviroment variable.
Visit [documentation](https://www.worldtradingdata.com/documentation) for available options.

Each example uses:
```js
const stockdata = require('stock-data.js');
```
#### Real time data

```js
// Get the real time price and additional data from AAPL
stockdata.realtime({
    symbols: 'AAPL',
    API_TOKEN: process.env.TOKEN,
  })
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```

```js
// Get the real time price and additional data from AAPL, MSFT and TSLA
stockdata.realtime({
    symbols: ['AAPL', 'MSFT', 'TSLA'],
    API_TOKEN: process.env.TOKEN,
  })
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```
#### Historical data

```js
// Get historical data for AAPL using options to only get data from the year 2018
stockdata.historical({
  symbol: 'AAPL',
  API_TOKEN: process.env.TOKEN,
  options: {
    date_from: '2018-01-01',
    date_to: '2018-12-31'
  }
})
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```
#### Historical data: single day

```js
// Get the historical data of AAPL and Microsoft from the date 2018-01-02
stockdata.historicalDay({
  symbols: ['AAPL', 'MSFT'],
  API_TOKEN: process.env.TOKEN,
  options: {
    date: '2018-01-02'
  }
})
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```
#### Intraday

```js
// Get the prices of AAPL with 1 min interval the last 5 days
stockdata.intraday({
  symbol: 'AAPL',
  API_TOKEN: process.env.TOKEN,
  options: {
    interval: '1',
    range: '5'
  }
})
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```

#### Search

```js
// Searching for Apple
stockdata.search({
  search_term: 'Apple',
  API_TOKEN: process.env.TOKEN,
})
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```

### Forex

##### Real time data

```js
// Get the realtime values of USD
stockdata.forex.realtime({
  base: 'USD',
  API_TOKEN: process.env.TOKEN,
})
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```
##### Historical data

```js
// Get the historical values between USD and GBP
stockdata.forex.historical({
  base: 'USD',
  convert_to: 'GBP',
  API_TOKEN: process.env.TOKEN,
})
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```
##### Historical data: single day

```js
// Get the historical values from 2018-01-01 of USD
stockdata.forex.historicalDay({
  base: 'USD',
  API_TOKEN: process.env.TOKEN,
  options: {
    date: '2018-01-01',
  }
})
  .then(response => {
    ...
  })
  .catch(error => {
    ...
  });
```
## Contributing

To run all tests you need an API-key from WorldTradingData. You can get a key by creating an account for free. Create a file called .env and write this line: ```API_TOKEN_TEST=[Your key]```

## Disclaimer

All the data comes from [WorldTradingData](https://www.worldtradingdata.com/). They might shutdown their service or change their business model at any time. So please note that this library is only a wrapper and it might stop working at any time if [WorldTradingData](https://www.worldtradingdata.com/) stop delivering data.

## License

MIT
