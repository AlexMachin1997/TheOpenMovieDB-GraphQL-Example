const axios = require('axios');

const generatePersonCreditsEndpoint = require('../../utils/generateEndpoints/Credits');
const setCredits = require('../../utils/resolverUtils/Credits/setCredits');

// eslint-disable-next-line no-unused-vars
const CreditsResolver = async (parent, args, info, context) => {
	try {
		const response = await axios.get(generatePersonCreditsEndpoint(parent.id));

		const { ActingGroup, ProductionGroup, WritingGroup, DirectingGroup, CrewGroup } = setCredits(
			response.data
		);

		return {
			ActingGroup,
			ProductionGroup,
			WritingGroup,
			DirectingGroup,
			CrewGroup
		};
	} catch (err) {
		console.log(err);
		return err.response;
	}
};

module.exports = CreditsResolver;
