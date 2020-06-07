const axios = require('axios');

const generatePersonCreditsEndpoint = require('../../utils/generateEndpoints/Credits');
const formatGroups = require('../../utils/resolverUtils/Credits');

// eslint-disable-next-line no-unused-vars
const FilterCredits = async (parent, args, info, context) => {
	try {
		const response = await axios.get(generatePersonCreditsEndpoint(args.id));

		const { ActingGroup, ProductionGroup, WritingGroup, DirectingGroup, CrewGroup } = formatGroups(
			response.data,
			args.mediaType
		);

		return {
			ActingGroup,
			ProductionGroup,
			WritingGroup,
			DirectingGroup,
			CrewGroup
		};
	} catch (err) {
		return err.response;
	}
};

module.exports = FilterCredits;
