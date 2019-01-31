import '@babel/polyfill';

class StockData {
  constructor(token = null) {
    this.api_token = token;
    this.realtime = require('./api/realtime');
  }
}

export default token => new StockData(token);
