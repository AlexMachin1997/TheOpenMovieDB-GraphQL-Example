const axios = require('axios');
const { has, forEach } = require('lodash');

const generateTopRatedEndpoint = require('../../utils/generateEndpoints/TopRated');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const formatDate = require('../../utils/dates/custom');
const toPercentage = require('../../utils/maths/toPercentage');
const setValue = require('../../utils/objects/setValue');
const replaceKey = require('../../utils/objects/replaceKey');

// eslint-disable-next-line no-unused-vars
const PopularShowResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateTopRatedEndpoint('tv'));

		forEach(response.data.results, (show) => {
			if (has(show, 'poster_path') === true) {
				setValue(show, 'poster_path', generateAbsolutePath(show.poster_path));
			}

			if (has(show, 'backdrop_path') === true) {
				setValue(show, 'backdrop_path', generateAbsolutePath(show.backdrop_path));
			}

			if (has(show, 'first_air_date') === true) {
				replaceKey(show, 'first_air_date', 'release_date');
				setValue(show, 'release_date', formatDate(show.release_date, 'MMMM Do, YYYY'));
			}

			if (has(show, 'vote_average') === true) {
				setValue(show, 'vote_average', toPercentage(show.vote_average));
			}
		});

		return response.data.results;
	} catch (err) {
		console.log('The /movie/top_rated endpoint failed');
		return err.response;
	}
};

module.exports = PopularShowResolver;
