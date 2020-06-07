const { API_URI, API_VERSION, API_KEY } = require('../../../config');

const generateVideoEndpoint = (id, resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/${id}/videos?api_key=${API_KEY}&language=en-US`;

module.exports = generateVideoEndpoint;
