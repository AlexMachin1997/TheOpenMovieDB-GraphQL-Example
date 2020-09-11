const axios = require('axios');

const generateNowPlayingEndpoint = require('../../utils/generateEndpoints/NowPlaying');
const setMovies = require('../../utils/resolverUtils/Movies/setMovies');

// eslint-disable-next-line no-unused-vars
const NowPlayingMovieResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateNowPlayingEndpoint('movie'));

		const { data } = response;
		const { results } = data;

		const Movies = setMovies(results);

		return Movies;
	} catch (err) {
		console.log('The tv/on_the_air endpoint failed');
		return err.response;
	}
};

module.exports = NowPlayingMovieResolver;
