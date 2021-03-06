const fetchData = require('../../util/fetchData');
const formatOptions = require('../../util/formatOptions');

const URL = 'https://www.worldtradingdata.com/api/v1/forex_single_day?base=';

async function historicalDay({ base, API_TOKEN, options }) {
  if (base === undefined) {
    throw new Error('No base provided, add a base as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  if (options === undefined || options.date === undefined) {
    throw new Error('No date provided, add date as an argument');
  }
  try {
    const optionQuery = formatOptions(options);
    const fetchedData = await fetchData(URL, base, optionQuery, API_TOKEN);
    if (fetchedData.message === 'Invalid API Key.') {
      throw new Error('Invalid API Token');
    }
    return fetchedData;
  } catch (error) {
    throw error;
  }
}

module.exports = historicalDay;
