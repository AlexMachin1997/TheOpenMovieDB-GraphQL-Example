const axios = require('axios');

const generateKeywordEndpoint = require('../../utils/generateEndpoints/Keywords');

// eslint-disable-next-line no-unused-vars
const TVKeywordResolver = async (parent, args, info, context) => {
	try {
		// Make a keywords request using the TV object id field
		const response = await axios.get(generateKeywordEndpoint(parent.id, 'tv'));
		return response.data.results;
	} catch (err) {
		console.log('The /keywords endpoint failed');
		return err;
	}
};

module.exports = TVKeywordResolver;
