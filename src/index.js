import '@babel/polyfill';

module.exports = {
  realtime: require('./functions/realtime'),
  historical: require('./functions/historical'),
  historicalDay: require('./functions/historicalDay'),
  search: require('./functions/search'),
  intraday: require('./functions/intraday'),
  forex: {
    realtime: require('./functions/forex/realtime'),
    historical: require('./functions/forex/historical'),
    historicalDay: require('./functions/forex/historicalDay')
  }
};
