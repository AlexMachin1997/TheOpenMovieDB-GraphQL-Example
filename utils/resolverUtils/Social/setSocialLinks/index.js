/**
 * @typedef {Object} IncomingSocialLinks
 * @property {string} facebook_id
 * @property {string} twitter_id
 * @property {string} [homepage]
 * @property {string} [instagram_id]
 */

/**
 * @typedef {Object} SocialLinks
 * @property {string} facebook
 * @property {string} twitter
 * @property {string} homepage
 * @property {string} instagram
 */

/**
 *
 * @param {IncomingSocialLinks} data
 * @param {string} resolverType
 * @returns {SocialLinks}
 */
const setSocialLinks = (data, resolverType = 'entertainment') => {
	/**
	 * @type {SocialLinks}
	 */
	const SocialLinks = {
		facebook: data.facebook_id ?? '',
		twitter: data.twitter_id ?? '',
		instagram: data.instagram_id ?? '',
		homepage: data.homepage ?? ''
	};

	// facebook and instagram
	if (SocialLinks.facebook !== '') {
		SocialLinks.facebook = `https://www.facebook.com/${data.facebook_id}`;

		// Only when the resolver being used is not a person type (Movie and Show Resolvers ONLY) use the facebook_id as the instagram id
		if (resolverType === 'entertainment') {
			SocialLinks.instagram = `https://www.instagram.com/${data.facebook_id}`.toLowerCase();
		}
	}

	// When the resolver type is person and the instagram id isn't empty use the instagram id
	if (SocialLinks.instagram !== '' && resolverType === 'person') {
		SocialLinks.instagram = `https://www.instagram.com/${SocialLinks.instagram}`;
	}

	// twitter
	if (SocialLinks.twitter !== '') {
		SocialLinks.twitter = `https://www.twitter.com/${data.twitter_id}`;
	}

	// homepage (Needs to be present in the schema in order for it to be present in the schema)
	if (SocialLinks.homepage !== '') {
		SocialLinks.homepage = data.homepage;
	}

	return SocialLinks;
};

module.exports = setSocialLinks;
