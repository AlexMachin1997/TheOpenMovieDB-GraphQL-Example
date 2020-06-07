const axios = require('axios');
const { has, forEach } = require('lodash');

const generateRecomendationEndpoint = require('../../utils/generateEndpoints/Recomendations');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const toPercentage = require('../../utils/maths/toPercentage');
const setValue = require('../../utils/objects/setValue');

// eslint-disable-next-line no-unused-vars
const MovieRecomendationsResolver = async (parent, args, content, info) => {
	try {
		const response = await axios.get(generateRecomendationEndpoint(parent.id, 'movie'));

		forEach(response.data.results, (movie) => {
			if (has(movie, 'poster_path') === true) {
				setValue(movie, 'poster_path', generateAbsolutePath(movie.poster_path));
			}

			if (has(movie, 'vote_average') === true) {
				setValue(movie, 'vote_average', toPercentage(movie.vote_average));
			}
		});

		return response.data.results;
	} catch (err) {
		console.log('The /movie/reccomendations/ endpoint failed');
		return err;
	}
};

module.exports = MovieRecomendationsResolver;
