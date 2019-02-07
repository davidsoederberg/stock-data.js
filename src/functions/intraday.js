const fetchData = require('../util/fetchData');
const formatOptions = require('../util/formatOptions');

const URL = 'https://www.worldtradingdata.com/api/v1/intraday?symbol=';

async function historical({ symbol, API_TOKEN, options }) {
  if (symbol === undefined) {
    throw new Error('No symbol provided, add a symbol as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  if (options === undefined || options.range === undefined) {
    throw new Error('No range provided in options, add a range as an argument');
  }
  if (options === undefined || options.interval === undefined) {
    throw new Error('No interval provided options, add a interval as an argument');
  }
  if (options.interval === 1 && options.range > 7) {
    throw new Error('If the interval is 1 min, the max range is 7');
  }
  try {
    const optionQuery = formatOptions(options);
    const fetchedData = await fetchData(URL, symbol, optionQuery, API_TOKEN);
    if (fetchedData.message === 'Invalid API Key.') {
      throw new Error('Invalid API Token');
    }
    return fetchedData;
  } catch (error) {
    throw error;
  }
}

module.exports = historical;
