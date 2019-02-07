const fetchData = require('../../util/fetchData');
const formatOptions = require('../../util/formatOptions');

const URL = 'https://www.worldtradingdata.com/api/v1/forex_history?base=';

async function historical({
  base, convert_to, API_TOKEN, options
}) {
  if (base === undefined) {
    throw new Error('No base provided, add a base as an argument');
  }
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from https://www.worldtradingdata.com/ as an argument');
  }
  if (convert_to === undefined) {
    throw new Error('No convert_to provided, add convert_to as an argument');
  }
  try {
    const optionQuery = formatOptions(options);
    const baseConvert = `${base}&convert_to=${convert_to}`;
    const fetchedData = await fetchData(URL, baseConvert, optionQuery, API_TOKEN);
    if (fetchedData.message === 'Invalid API Key.') {
      throw new Error('Invalid API Token');
    }
    return fetchedData;
  } catch (error) {
    throw error;
  }
}

module.exports = historical;
