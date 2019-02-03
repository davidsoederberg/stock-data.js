<h3 align='center'>Stock-data.js</h3>
<p align="center">
  Easy to use stock market API for Node.js using WorldTradingData as source.
</p>

<p align="center">
  <a href='https://www.npmjs.com/package/stock-data.js'><img src='https://img.shields.io/npm/v/stock-data.js.svg' alt='Build status' /></a>
  <a href='https://travis-ci.com/davidsoederberg/stock-data'><img src='https://travis-ci.com/davidsoederberg/stock-data.svg?branch=master' alt='Build status' /></a>
 <a href='https://coveralls.io/github/davidsoederberg/stock-data?branch=master'><img src='https://coveralls.io/repos/github/davidsoederberg/stock-data/badge.svg?branch=master' alt='Coverage Status' /></a>
</p>


> :bulb: This library is new, so there might be issues. If you find any, please report them at 
[issues](https://github.com/davidsoederberg/stock-data.js/issues) section.

## Features

- Real time data
- Historical data
- Get data from multiple symbols at the same time (historical data is WIP)
- Manipulate your data using options
- Forex data (WIP)
- Intraday Data (WIP)
- Search (WIP)

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
// Get the real time price and additional data from AAPL (Apple)
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
// Get the real time price and additional data from AAPL, MSFT and TSLA (Apple, Microsoft and Tesla)
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
// Get historical data for AAPL (Apple) using options to only get data from the year 2018
stockdata.historical({
  symbol: 'AAPL',
  API_TOKEN: process.env.TOKEN,
  options: {
    date_from: '2018-01-01',
    date_to: '2018-12-31'
  }
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
```

## Contributing

WIP

## Disclaimer

All the data comes from [WorldTradingData](https://www.worldtradingdata.com/). They might shutdown their service or change their business model at any time. So please note that this library is only a wrapper and it might stop working at any time if [WorldTradingData](https://www.worldtradingdata.com/) stop delivering data.

## License

MIT
