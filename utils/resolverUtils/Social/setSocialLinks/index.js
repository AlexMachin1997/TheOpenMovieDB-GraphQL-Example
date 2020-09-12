const { has } = require('lodash');

const setSocialLinks = (data) => {
	// Default object
	const SocialLinks = {
		facebook: '',
		twitter: '',
		instagram: '',
		homepage: ''
	};

	// facebook and instagram
	if (has(data, 'facebook_id') === true) {
		SocialLinks.facebook = `https://www.facebook.com/${data.facebook_id}`;
		SocialLinks.instagram = `https://www.instagram.com/${data.facebook_id}`.toLowerCase();
	}

	// twitter
	if (has(data, 'twitter_id') === true) {
		SocialLinks.twitter = `https://www.twitter.com/${data.twitter_id}`;
	}

	// homepage (Needs to be present in the schema in order for it to be present in the schema)
	if (has(data, 'homepage') === true) {
		SocialLinks.homepage = data.homepage;
	}

	return SocialLinks;
};

module.exports = setSocialLinks;
