const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 * @param {string} id
 * @returns {string}
 */
const generateCreditEndpoint = (id) => `${API_URI}/${API_VERSION}/credit/${id}/?api_key=${API_KEY}`;

module.exports = generateCreditEndpoint;

// `https://api.themoviedb.org/3/credit/${item.creditId}?api_key={API_kEY_GOES_HERE}`;
