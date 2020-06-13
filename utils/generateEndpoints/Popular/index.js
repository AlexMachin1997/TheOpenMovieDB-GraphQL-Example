const { API_URI, API_VERSION, API_KEY } = require('../../../config');

const generatePopularEndpoint = (resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/popular?api_key=${API_KEY}`;

module.exports = generatePopularEndpoint;
