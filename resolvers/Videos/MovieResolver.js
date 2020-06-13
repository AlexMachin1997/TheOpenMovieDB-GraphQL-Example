const axios = require('axios');
const { filter, forEach } = require('lodash');

const generateVideoEndpoint = require('../../utils/generateEndpoints/Videos');
const setValue = require('../../utils/objects/setValue');

// eslint-disable-next-line no-unused-vars
const MovieVideoResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateVideoEndpoint(parent.id, 'movie'));

		const YoutubeVideos = filter(response.data.results, (video) => video.site === 'YouTube');

		forEach(YoutubeVideos, (video) => {
			setValue(video, 'url', `https://www.youtube.com/watch?v=${video.key}`);
		});

		return YoutubeVideos;
	} catch (err) {
		console.log('The movie/videos endpoint failed');
		return err.response;
	}
};

module.exports = MovieVideoResolver;
