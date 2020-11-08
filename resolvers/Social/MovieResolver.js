const axios = require('axios');

const generateSocialLinksEndpoint = require('../../utils/generateEndpoints/Social');
const setSocialLinks = require('../../utils/resolverUtils/Social/setSocialLinks');

// eslint-disable-next-line no-unused-vars
const MovieSocialResolver = async (parent, args, info, context) => {
	try {
		const response = await axios.get(generateSocialLinksEndpoint(parent.id, 'movie'));

		const { data } = response;

		const SocialLinks = setSocialLinks({ ...data, homepage: parent.homepage });

		return SocialLinks;
	} catch (err) {
		console.log('The movie /external_ids (social) endpoint failed');
		return err.response;
	}
};

module.exports = MovieSocialResolver;
