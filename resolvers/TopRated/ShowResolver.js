const axios = require('axios');

const generateTopRatedEndpoint = require('../../utils/generateEndpoints/TopRated');
const setShows = require('../../utils/resolverUtils/Shows/setShows');

// eslint-disable-next-line no-unused-vars
const PopularShowResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateTopRatedEndpoint('tv'));

		const { data } = response;
		const { results } = data;

		const Shows = setShows(results);

		return Shows;
	} catch (err) {
		console.log('The /movie/top_rated endpoint failed');
		return err.response;
	}
};

module.exports = PopularShowResolver;
