const axios = require('axios');
const { has, filter, forEach } = require('lodash');

const generateCastURLEndpoint = require('../../utils/generateEndpoints/Cast');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');

// eslint-disable-next-line no-unused-vars
const MovieCastResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateCastURLEndpoint(parent.id, 'movie'));

		const featuredCast = filter(response.data.cast, (member) => member.order <= 9).sort((a, b) =>
			a.order > b.order ? 1 : -1
		);

		const updatedFeaturedCast = [];

		forEach(featuredCast, (member) => {
			const castMember = {
				...member
			};

			if (has(member, 'profile_path') === true) {
				castMember.image = generateAbsolutePath(member.profile_path);
			}

			updatedFeaturedCast.push(castMember);
		});

		return updatedFeaturedCast;
	} catch (err) {
		console.log('The /credits (Cast) endpoint failed');
		return err.response;
	}
};

module.exports = MovieCastResolver;
