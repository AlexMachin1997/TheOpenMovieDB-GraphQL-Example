const axios = require('axios');

const generateSocialLinksEndpoint = require('../../utils/generateEndpoints/Social');
const setSocialLinks = require('../../utils/resolverUtils/Social/setSocialLinks');

// eslint-disable-next-line no-unused-vars
const PersonSocialResolver = async (parent, args, info, context) => {
	try {
		const response = await axios.get(generateSocialLinksEndpoint(parent.id, 'person', 'person'));

		const { data } = response;

		const SocialLinks = setSocialLinks({ ...data, homepage: parent.homepage }, 'person');

		return SocialLinks;
	} catch (err) {
		console.log('The Person /external_ids (social) endpoint failed');
		return err.response;
	}
};

module.exports = PersonSocialResolver;
