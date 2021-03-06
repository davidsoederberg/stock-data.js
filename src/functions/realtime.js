const fetchData = require('../util/fetchData');
const makeQueries = require('../util/makeQueries');
const formatOptions = require('../util/formatOptions');


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

async function realtime({
  symbols, API_TOKEN, FUND, options
}) {
  const URL = FUND ? FUND_URL : STOCK_URL;
  if (symbols === undefined) {
    throw new Error('No symbols provided, add symbols as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  const optionQuery = formatOptions(options);
  try {
    const data = [];
    const queries = await makeQueries(symbols, 5);
    for (const query of queries) { // eslint-disable-line no-restricted-syntax
      data.push(fetchData(URL, query, optionQuery, API_TOKEN));
    }
    const fetchedData = await Promise.all(data);
    if (fetchedData[0].message === 'Invalid API Key.') {
      throw new Error('Invalid API Token');
    }
    return mergeData(fetchedData);
  } catch (error) {
    throw error;
  }
}

module.exports = realtime;
