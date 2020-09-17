const axios = require('axios');

const generatePopularEndpoint = require('../../utils/generateEndpoints/Popular');
const setPeople = require('../../utils/resolverUtils/People/setPeople');

// eslint-disable-next-line no-unused-vars
const PopularPeopleResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generatePopularEndpoint('person'));

		const { data } = response;
		const { results } = data;

		const People = setPeople(results);

		return People;

		// return response.data.results;
	} catch (err) {
		console.log(err);
		console.log('The /tv/popular endpoint failed');
		return err.response;
	}
};

module.exports = PopularPeopleResolver;
