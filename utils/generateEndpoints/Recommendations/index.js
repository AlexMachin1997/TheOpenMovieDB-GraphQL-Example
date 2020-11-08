const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 * @param {number} id
 * @param {string} resolverType
 * @returns {string}
 */
const generateRecommendationEndpoint = (id, resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

module.exports = generateRecommendationEndpoint;
