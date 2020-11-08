const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 * @param {number} id
 * @param {string} resolverType
 * @returns {string}
 */
const generateKeywordEndpoint = (id, resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/${id}/keywords?api_key=${API_KEY}`;

module.exports = generateKeywordEndpoint;
