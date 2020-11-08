const axios = require('axios');

const generateDiscoverEndpoint = require('../../utils/generateEndpoints/Discover');
const generateQueryParameters = require('../../utils/generateQueryParameters/Discover');
const setShows = require('../../utils/resolverUtils/Shows/setShows');

// eslint-disable-next-line no-unused-vars
const DiscoverTVResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateQueryParameters(generateDiscoverEndpoint('tv'), args));

		const { data } = response;
		const { results } = data;

		const Shows = setShows(results);

		return Shows;
	} catch (err) {
		console.log(err);
		console.log('The /Discover/TV endpoint failed');
		return err.response;
	}
};

module.exports = DiscoverTVResolver;
