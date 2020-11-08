const axios = require('axios');

const generateUpcomingEndpoint = require('../../utils/generateEndpoints/Upcoming');
const setMovies = require('../../utils/resolverUtils/Movies/setMovies');

// eslint-disable-next-line no-unused-vars
const NowPlayingTVResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateUpcomingEndpoint('movie'));

		const { data } = response;
		const { results } = data;

		const Movies = setMovies(results);

		return Movies;
	} catch (err) {
		console.log('The tv/on_the_air endpoint failed');
		return err.response;
	}
};

module.exports = NowPlayingTVResolver;
