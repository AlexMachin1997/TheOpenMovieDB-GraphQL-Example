const { API_URI, API_VERSION, API_KEY } = require('../../../config');

/**
 * @param {string} resolverType
 * @returns {string}
 */
const generateUpcomingEndpoint = (resolverType) => {
	switch (resolverType) {
		case 'tv':
			return `${API_URI}/${API_VERSION}/${resolverType}/on_the_air?api_key=${API_KEY}&page=1`;
		case 'movie':
			return `${API_URI}/${API_VERSION}/${resolverType}/upcoming?api_key=${API_KEY}&page=1`;
	}
};

module.exports = generateUpcomingEndpoint;
