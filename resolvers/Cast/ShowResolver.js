const axios = require('axios');

const generateCastURLEndpoint = require('../../utils/generateEndpoints/Cast');
const setCast = require('../../utils/resolverUtils/Cast/setCast');

// eslint-disable-next-line no-unused-vars
const TVCastResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateCastURLEndpoint(parent.id, 'tv'));

		const { data } = response;
		const { cast } = data;

		const Cast = setCast(cast);

		return Cast;
	} catch (err) {
		console.log('The /credits (Cast) endpoint failed');
		return err.response;
	}
};

module.exports = TVCastResolver;
