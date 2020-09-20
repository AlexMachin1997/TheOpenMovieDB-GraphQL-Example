const generateAbsolutePath = require('../../../images/generateAbsolutePath');

/**
 * @typedef {Object} IncomingCastMembers
 * @property {number} [order] The original cast members order
 * @property {number} [id] The original cast members id
 * @property {string} [character] The original cast members character
 * @property {string} [profile_path] The original cast members profile path (profile image)
 * @property {number} [gender] The original cast members gender (Stored in a number format for some reason)
 * @property {number} [episode_count] The original cast members episode count (Only needed for tv episodes)
 */

/**
 * @typedef {Object} CastMember
 * @property {number} id The new cast members id
 * @property {string} character The new members character
 * @property {string} profileImageUrl Stores an absolute path to the cast members profile image
 * @property {string | number} gender Stores a string format representation of the cast members gender e.g. 0 -> Male
 * @property {number} episodeCount Stores the total number of appearances in a particular show (Only applicable for shows)
 */

/**
 * @description This function is currently used in the cast resolver, it creates a featured cast for a particular movie or tv series.
 * @param {IncomingCastMembers[]} castMembers
 * @async
 * @returns {Promise<CastMember[]>} Returns an array of featured cast members
 */

const setCast = async (castMembers) => {
	let featuredCast = castMembers.sort((a, b) => (a.order > b.order ? 1 : -1));

	featuredCast = featuredCast.slice(0, 9);

	/**
	 * @description Stores the new featured cast members
	 * @type {CastMember[]}
	 */
	const updatedFeaturedCast = [];

	featuredCast.forEach((cast) => {
		/**
		 * @description Store the cast members details
		 * @type {CastMember}
		 */
		const CastMember = {
			id: cast.id ? cast.id : 0,
			character: cast.character ?? '',
			profileImageUrl: cast.profile_path ?? '',
			gender: cast.gender ?? '',
			episodeCount: 0
		};

		// Profile image url
		if (CastMember.profileImageUrl !== '') {
			CastMember.profileImageUrl = generateAbsolutePath(cast.profile_path);
		}

		// Gender
		if (CastMember.gender !== '') {
			CastMember.gender = CastMember.gender === 0 ? 'Male' : 'Female';
		}

		// Perform API Request to get the episode count - https://trello.com/c/RyPuIPSc/42-extra-tv-show-functionality-episode-count

		// Push the new castMember to the updatedFeaturedCast array
		updatedFeaturedCast.push(CastMember);
	});

	return updatedFeaturedCast;
};

module.exports = setCast;
