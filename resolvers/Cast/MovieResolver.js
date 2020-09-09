const axios = require('axios');
const { has, filter, forEach } = require('lodash');

const generateCastURLEndpoint = require('../../utils/generateEndpoints/Cast');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const setValue = require('../../utils/objects/setValue');
const replaceKey = require('../../utils/objects/replaceKey');

// eslint-disable-next-line no-unused-vars
const MovieCastResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateCastURLEndpoint(parent.id, 'movie'));

		const featuredCast = filter(response.data.cast, (member) => member.order <= 9);

		forEach(featuredCast, (member) => {
			if (has(member, 'profile_path')) {
				replaceKey(member, 'profile_path', 'image');
				setValue(member, 'image', generateAbsolutePath(member.image));
			}
		});

		return featuredCast.sort((a, b) => (a.order > b.order ? 1 : -1));
	} catch (err) {
		console.log('The /credits (Cast) endpoint failed');
		return err.response;
	}
};

module.exports = MovieCastResolver;
