const axios = require('axios');

const generateCrewEndpoint = require('../../utils/generateEndpoints/Crew');
const setCrew = require('../../utils/resolverUtils/Crew/setCrew');

// eslint-disable-next-line no-unused-vars
const MovieCrewResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateCrewEndpoint(parent.id, 'movie'));

		const { data } = response;
		const { crew } = data;

		const Crew = setCrew(crew);

		return Crew;
	} catch (err) {
		console.log('The /credits (Crew) endpoint failed');
		return err;
	}
};

module.exports = MovieCrewResolver;
