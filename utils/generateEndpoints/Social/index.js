const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 * @param {number} id
 * @param {string} resolverType
 * @returns {string}
 */
const generateSocialLinksEndpoint = (id, resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/${id}/external_ids?api_key=${API_KEY}`;

module.exports = generateSocialLinksEndpoint;
