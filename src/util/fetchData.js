const axios = require('axios').default;

module.exports = async (URL, query, API_TOKEN) => axios.get(`${URL}${query}&api_token=${API_TOKEN}`)
  .then(response => response.data)
  .catch((error) => {
    throw new Error(error);
  });
