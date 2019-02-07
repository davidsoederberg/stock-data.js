const fetchData = require('../util/fetchData');
const formatOptions = require('../util/formatOptions');
const makeQueries = require('../util/makeQueries');

const URL = 'https://www.worldtradingdata.com/api/v1/history_multi_single_day?symbol=';

function mergeData(fetchedData) {
  const mergedData = { date: fetchedData[0].date, data: [] };
  fetchedData.forEach((dataObject) => {
    /* eslint-disable */
    for (const [key, value] of Object.entries(dataObject.data)) {
    /* eslint-enable */
      mergedData.data.push({ symbol: key, data: value });
    }
  });
  return mergedData;
}

async function historicalDay({ symbols, API_TOKEN, options }) {
  if (symbols === undefined) {
    throw new Error('No symbol provided, add a symbol as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  if (options === undefined || options.date === undefined) {
    throw new Error('No date provided, add date as an argument');
  }
  const optionQuery = formatOptions(options);
  try {
    const data = [];
    const queries = await makeQueries(symbols, 2);
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

module.exports = historicalDay;
