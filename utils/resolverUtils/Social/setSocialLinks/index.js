/**
 * @typedef {Object} IncomingSocialLinks
 * @property {string} [facebook_id] Stores the facebook id
 * @property {string} [twitter_id] Stores the twitter id
 * @property {string} [homepage] Stores the homepage
 * @property {string} [instagram_id] Stores the instagram id
 */

/**
 * @typedef {Object} SocialLinks
 * @property {string} facebook Stores the absolute facebook path for a person, show or movie
 * @property {string} twitter Stores the absolute twitter path for a person, show or movie
 * @property {string} homepage Stores the homepage for a person, show or movie
 * @property {string} instagram Stores the absolute instagram path for a person, show or movie
 */

/**
 * @description Creates an object which stores references to a person's, show's or movie's social profiles (The object properties must match the Social model)
 * @param {IncomingSocialLinks} data
 * @param {string} resolverType
 * @returns {SocialLinks}
 */
const setSocialLinks = (data, resolverType = 'entertainment') => {
	/**
	 * @type {SocialLinks}
	 * @description Stores the social media references. They are are absolute paths which the front-end will use to link to the persons social profiles.
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
