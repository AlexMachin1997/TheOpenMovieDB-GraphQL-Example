const axios = require('axios');

const generateNowPlayingEndpoint = require('../../utils/generateEndpoints/NowPlaying');
const setShows = require('../../utils/resolverUtils/Shows/setShows');

// eslint-disable-next-line no-unused-vars
const NowPlayingTVResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateNowPlayingEndpoint('tv'));

		const { data } = response;
		const { results } = data;

		const Shows = setShows(results);

		return Shows;
	} catch (err) {
		console.log('The tv/on_the_air endpoint failed');
		return err.response;
	}
};

module.exports = NowPlayingTVResolver;
