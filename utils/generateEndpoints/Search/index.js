const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 * @param {string} searchTerm
 * @param {string} resolverType
 * @returns {string}
 */
const generateSearchEndpoint = (searchTerm, resolverType) =>
	`${API_URI}/${API_VERSION}/search/${resolverType}?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`;

module.exports = generateSearchEndpoint;
