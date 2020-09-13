const { isEmpty } = require('lodash');

const setSocialLinks = (data) => {
	/*

	Notes for future reference:

	- isEmpty doesn't work with numbers, so to use isEmpty() the value needs to be casted to a string

	- By default if the values are empty an empty object will return (Empty checks are done on the FE)

	*/

	// Default object
	const SocialLinks = {
		facebook: '',
		twitter: '',
		instagram: '',
		homepage: ''
	};

	// facebook and instagram
	if (isEmpty(String(data.facebook_id)) === false) {
		SocialLinks.facebook = `https://www.facebook.com/${data.facebook_id}`;
		SocialLinks.instagram = `https://www.instagram.com/${data.facebook_id}`.toLowerCase();
	}

	// twitter
	if (isEmpty(String(data.twitter_id)) === false) {
		SocialLinks.twitter = `https://www.twitter.com/${data.twitter_id}`;
	}

	// homepage (Needs to be present in the schema in order for it to be present in the schema)
	if (isEmpty(String(data.homepage)) === false) {
		SocialLinks.homepage = data.homepage;
	}

	return SocialLinks;
};

module.exports = setSocialLinks;
