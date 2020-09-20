const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 * @param {string} resolverType
 * @returns {string}
 */
const generateTopRatedEndpoint = (resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/top_rated?api_key=${API_KEY}&page=1`;

module.exports = generateTopRatedEndpoint;
