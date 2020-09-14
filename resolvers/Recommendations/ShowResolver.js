const axios = require('axios');
const { has, forEach } = require('lodash');

const generateRecommendationsEndpoint = require('../../utils/generateEndpoints/Recommendations');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const toPercentage = require('../../utils/maths/toPercentage');
const setValue = require('../../utils/objects/setValue');

// eslint-disable-next-line no-unused-vars
const TVRecommendationsResolver = async (parent, args, content, info) => {
	try {
		const response = await axios.get(generateRecommendationsEndpoint(parent.id, 'tv'));

		forEach(response.data.results, (show) => {
			if (has(show, 'poster_path') === true) {
				setValue(show, 'poster_path', generateAbsolutePath(show.poster_path));
			}

			if (has(show, 'vote_average') === true) {
				setValue(show, 'vote_average', toPercentage(show.vote_average));
			}
		});

		return response.data.results;
	} catch (err) {
		console.log('The /tv/recommendations/ endpoint failed');
		return err;
	}
};

module.exports = TVRecommendationsResolver;
