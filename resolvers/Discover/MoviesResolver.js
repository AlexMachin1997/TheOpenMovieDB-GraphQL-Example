const axios = require('axios');

const generateDiscoverEndpoint = require('../../utils/generateEndpoints/Discover');
const generateQueryParameters = require('../../utils/generateQueryParameters/Discover');

const setMovies = require('../../utils/resolverUtils/Movies/setMovies');

// eslint-disable-next-line no-unused-vars
const DiscoverMoviesResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(
			generateQueryParameters(generateDiscoverEndpoint('movie'), args)
		);

		const { data } = response;
		const { results } = data;

		const Movies = setMovies(results);

		return Movies;
	} catch (err) {
		console.log('The /Discover/Movie endpoint failed');
		return err.response;
	}
};

module.exports = DiscoverMoviesResolver;
