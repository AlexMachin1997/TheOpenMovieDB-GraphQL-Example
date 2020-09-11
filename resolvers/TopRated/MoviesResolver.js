const axios = require('axios');

const generateTopRatedEndpoint = require('../../utils/generateEndpoints/TopRated');
const setMovies = require('../../utils/resolverUtils/Movies/setMovies');

// eslint-disable-next-line no-unused-vars
const MoviePopularResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateTopRatedEndpoint('movie'));

		const { data } = response;
		const { results } = data;

		const Movies = setMovies(results);

		return Movies;
	} catch (err) {
		console.log('The /movie/top_rated endpoint failed');
		console.log(err);
		return err.response;
	}
};

module.exports = MoviePopularResolver;
