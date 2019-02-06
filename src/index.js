import '@babel/polyfill';

module.exports = {
  realtime: require('./functions/realtime'),
  historical: require('./functions/historical'),
  historicalDay: require('./functions/historicalDay')
};
