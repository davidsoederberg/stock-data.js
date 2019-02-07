const fetchData = require('../util/fetchData');
const formatOptions = require('../util/formatOptions');

const URL = 'https://www.worldtradingdata.com/api/v1/stock_search?search_term=';

async function search({ search_term, API_TOKEN, options }) {
  if (search_term === undefined) {
    throw new Error('No search provided, add a search term as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  try {
    const optionQuery = formatOptions(options);
    const fetchedData = await fetchData(URL, search_term, optionQuery, API_TOKEN);
    if (fetchedData.message === 'Invalid API Key.') {
      throw new Error('Invalid API Token');
    }
    return fetchedData;
  } catch (error) {
    throw error;
  }
}

module.exports = search;
