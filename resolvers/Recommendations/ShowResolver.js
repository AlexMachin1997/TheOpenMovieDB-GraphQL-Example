const axios = require('axios');

const generateRecommendationsEndpoint = require('../../utils/generateEndpoints/Recommendations');
const setShows = require('../../utils/resolverUtils/Shows/setShows');

// eslint-disable-next-line no-unused-vars
const TVRecommendationsResolver = async (parent, args, content, info) => {
	try {
		const response = await axios.get(generateRecommendationsEndpoint(parent.id, 'tv'));

		const { data } = response;
		const { results } = data;

		const Shows = setShows(results);

		return Shows;
	} catch (err) {
		console.log('The /tv/recommendations/ endpoint failed');
		return err;
	}
};

module.exports = TVRecommendationsResolver;
