const fetchData = require('../../util/fetchData');

const URL = 'https://www.worldtradingdata.com/api/v1/forex?base=';

async function realtime({ base, API_TOKEN }) {
  if (base === undefined) {
    throw new Error('No base provided, add a base as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  try {
    const fetchedData = await fetchData(URL, base, '&', API_TOKEN);
    if (fetchedData.message === 'Invalid API Key.') {
      throw new Error('Invalid API Token');
    }
    return fetchedData;
  } catch (error) {
    throw error;
  }
}

module.exports = realtime;
