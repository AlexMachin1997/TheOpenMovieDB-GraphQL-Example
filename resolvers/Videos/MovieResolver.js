const axios = require('axios');

const generateVideoEndpoint = require('../../utils/generateEndpoints/Videos');
const setFeaturedVideo = require('../../utils/resolverUtils/Videos/setFeaturedVideo');

// eslint-disable-next-line no-unused-vars
const MovieVideoResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateVideoEndpoint(parent.id, 'movie'));

		const { data } = response;
		const { results } = data;

		const Video = setFeaturedVideo(results);

		return Video;
	} catch (err) {
		console.log('The movie/videos endpoint failed');
		return err.response;
	}
};

module.exports = MovieVideoResolver;
