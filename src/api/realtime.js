const axios = require('axios').default;

const WORLDTRADINGDATA_URL = 'https://www.worldtradingdata.com/api/v1/stock?symbol=';

async function fetchData(query, API_TOKEN) {
  try {
    return await axios.get(`${WORLDTRADINGDATA_URL}${query}${API_TOKEN}`)
      .then(response => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw error;
  }
}

async function multipleSymbols(symbols, API_TOKEN) {
  if (typeof symbols === 'string') {
    return fetchData(symbols);
  }
  const data = [];
  const iterations = Math.ceil(symbols.length / 5);
  for (let i = 0; i < iterations; i += 1) {
    const currentIndex = 5 * i;
    const query = symbols.slice(currentIndex, currentIndex + 5).join(',');
    const fetchedData = fetchData(query, API_TOKEN);
    data.push(fetchedData);
  }
  return Promise.all(data);
}

async function realtime(symbols) {
  try {
    const API_TOKEN = `&api_token=${this.api_token}`;
    if (typeof symbols === 'string') {
      return await fetchData(symbols);
    }
    return multipleSymbols(symbols, API_TOKEN);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = realtime;
