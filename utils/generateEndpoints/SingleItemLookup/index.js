const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 * @param {number} id
 * @param {string} resolverType
 * @returns {string}
 */
const generateSingleItemLookupEndpoint = (id, resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/${id}?api_key=${API_KEY}&language=en-US`;

module.exports = generateSingleItemLookupEndpoint;
