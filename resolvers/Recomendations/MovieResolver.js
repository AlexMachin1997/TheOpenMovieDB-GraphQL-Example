const axios = require('axios');

const generateRecomendationEndpoint = require('../../utils/generateEndpoints/Recomendations');

const setMovies = require('../../utils/resolverUtils/Movies/setMovies');

// eslint-disable-next-line no-unused-vars
const MovieRecommendationsResolver = async (parent, args, content, info) => {
	try {
		const response = await axios.get(generateRecomendationEndpoint(parent.id, 'movie'));

		const { data } = response;

		const { results } = data;

		const Movies = setMovies(results);

		return Movies;
	} catch (err) {
		console.log('The /movie/recommendations/ endpoint failed');
		return err;
	}
};

module.exports = MovieRecommendationsResolver;
