const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 *  @param {number} id
 * @returns {string}
 */

const generatePersonCreditsEndpoint = (id) =>
	`${API_URI}/${API_VERSION}/person/${id}/combined_credits?api_key=${API_KEY}`;

module.exports = generatePersonCreditsEndpoint;
