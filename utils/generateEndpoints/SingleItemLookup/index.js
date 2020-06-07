const { API_URI, API_VERSION, API_KEY } = require('../../../config');

const generateSingleItemLookupEndpoint = (id, resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/${id}?api_key=${API_KEY}&language=en-US`;

module.exports = generateSingleItemLookupEndpoint;
