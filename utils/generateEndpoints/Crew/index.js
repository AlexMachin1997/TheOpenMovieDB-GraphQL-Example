const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 *  @param {number} id
 * @param {string} resolverType
 * @returns {string}
 */
const generateCrewEndpoint = (id, resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/${id}/credits?api_key=${API_KEY}`;

module.exports = generateCrewEndpoint;
