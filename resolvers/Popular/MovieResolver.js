const axios = require('axios');

const generatePopularEndpoint = require('../../utils/generateEndpoints/Popular');
const setMovies = require('../../utils/resolverUtils/Movies/setMovies');

// eslint-disable-next-line no-unused-vars
const MoviePopularResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generatePopularEndpoint('movie'));

		const { data } = response;
		const { results } = data;

		const Movies = setMovies(results);

		return Movies;
	} catch (err) {
		console.log('The /movie/popular endpoint failed');
		return err.response;
	}
};

module.exports = MoviePopularResolver;
