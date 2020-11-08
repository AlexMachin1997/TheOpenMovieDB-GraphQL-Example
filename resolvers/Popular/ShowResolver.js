const axios = require('axios');

const generatePopularEndpoint = require('../../utils/generateEndpoints/Popular');
const setShows = require('../../utils/resolverUtils/Shows/setShows');

// eslint-disable-next-line no-unused-vars
const TVPopularResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generatePopularEndpoint('tv'));

		const { data } = response;
		const { results } = data;

		const Shows = setShows(results);

		return Shows;
	} catch (err) {
		console.log('The /tv/popular endpoint failed');
		return err.response;
	}
};

module.exports = TVPopularResolver;
