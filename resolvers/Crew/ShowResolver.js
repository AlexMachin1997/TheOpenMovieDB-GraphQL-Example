const axios = require('axios');
const { has, filter, forEach } = require('lodash');

const generateCrewEndpoint = require('../../utils/generateEndpoints/Crew');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const setValue = require('../../utils/objects/setValue');

// eslint-disable-next-line no-unused-vars
const TVCrewResolver = async (parent, args, context, info) => {
	try {
		// Make a crew request using the Movie object id field
		const response = await axios.get(generateCrewEndpoint(parent.id, 'tv'));

		// Getting the crew by specific job titles
		const featuredCrew = filter(
			response.data.crew,
			(member) =>
				member.job === 'Director' || member.job === 'Screenplay' || member.job === 'Writer'
		);

		// URL formatting for images
		forEach(featuredCrew, (member) => {
			if (has(member, 'profile_path') === true) {
				setValue(member, 'profile_path', generateAbsolutePath(member.profile_path));
			}
		});

		return featuredCrew;
	} catch (err) {
		console.log('The /credits (Crew) endpoint failed');
		return err;
	}
};

module.exports = TVCrewResolver;
