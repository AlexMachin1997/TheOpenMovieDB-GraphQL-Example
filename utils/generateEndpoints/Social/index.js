const { API_URI, API_VERSION, API_KEY } = require('../../../config');

const generateSocialLinksEndpoint = (id, resolverType) =>
	`${API_URI}/${API_VERSION}/${resolverType}/${id}/external_ids?api_key=${API_KEY}`;

module.exports = generateSocialLinksEndpoint;
