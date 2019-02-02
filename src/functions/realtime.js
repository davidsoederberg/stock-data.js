const fetchData = require('../util/fetchData');
const makeQueries = require('../util/makeQueries');

const STOCK_URL = 'https://www.worldtradingdata.com/api/v1/stock?symbol=';
const FUND_URL = 'https://www.worldtradingdata.com/api/v1/mutualfund?symbol=';

function mergeData(fetchedData) {
  const mergedData = { symbols_requested: 0, symbols_returned: 0, data: [] };
  fetchedData.forEach((dataObject) => {
    mergedData.symbols_requested += dataObject.symbols_requested;
    mergedData.symbols_returned += dataObject.symbols_returned;
    mergedData.data = mergedData.data.concat(dataObject.data);
  });
  return mergedData;
}

async function realtime({ symbols, API_TOKEN, FUND }) {
  const URL = FUND ? FUND_URL : STOCK_URL;
  if (symbols === undefined) {
    throw new Error('No symbols provided, add symbols as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  try {
    const data = [];
    const queries = await makeQueries(symbols);
    for (const query of queries) { // eslint-disable-line no-restricted-syntax
      data.push(fetchData(URL, query, API_TOKEN));
    }
    const fetchedData = await Promise.all(data);
    return mergeData(fetchedData);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = realtime;
