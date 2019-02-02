const fetchData = require('../util/fetchData');
const formatOptions = require('../util/formatOptions');

const URL = 'https://www.worldtradingdata.com/api/v1/history?symbol=';

async function historical({ symbol, API_TOKEN, options }) {
  if (symbol === undefined) {
    throw new Error('No symbol provided, add a symbol as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  try {
    const optionQuery = formatOptions(options);
    return await fetchData(URL, symbol, optionQuery, API_TOKEN);
  } catch (error) {
    throw error;
  }
}

module.exports = historical;
