const axios = require('axios');

const generateAbsolutePath = require('../../../images/generateAbsolutePath');
const generateCreditURLEndpoint = require('../../../generateEndpoints/Credit');

/**
 * @typedef {Object} IncomingCastMembers
 * @property {number} [order] The original cast members order
 * @property {number} [id] The original cast members id
 * @property {string} [name] Stores the name of the cast member
 * @property {string} [character] The original cast members character
 * @property {string} [profile_path] The original cast members profile path (profile image)
 * @property {number} [gender] The original cast members gender (Stored in a number format for some reason)
 * @property {number} [episode_count] The original cast members episode count (Only needed for tv episodes)
 * @property {string} [credit_id] Stores the credit id for the cast member
 */

/**
 * @typedef {Object} CastMember
 * @property {number} id The new cast members id
 * @property {string} character The new members character
 * @property {string} profileImageUrl Stores an absolute path to the cast members profile image
 * @property {string | number} gender Stores a string format representation of the cast members gender e.g. 0 -> Male
 * @property {number} episodeCount Stores the total number of appearances in a particular show (Only applicable for shows)
 * @property {string} creditId Stores the cast members credit. This is used to perform the tv credits episodeCount functionality
 */

/**
 * @description This function is currently used in the cast resolver, it creates a featured cast for a particular movie or tv series.
 * @param {IncomingCastMembers[]} castMembers
 * @async
 * @returns {Promise<CastMember[]>} Returns an array of featured cast members
 * @throws {string}
 */

const setCast = async (castMembers, resolverType = 'movie') => {
	// Check the length of the array
	if (castMembers.length === 0) return [];

	// Order the cast by the order property
	let featuredCast = castMembers;

	if (castMembers.length > 0) {
		featuredCast = castMembers.sort((a, b) => (a.order > b.order ? 1 : -1));
	}

	// Get the first 9 cast members
	featuredCast = featuredCast.slice(0, 9);

	/**
	 * @description Stores the new featured cast members
	 * @type {CastMember[]}
	 */
	const updatedFeaturedCast = [];

	// Create the new cast objects
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
			episodeCount: 0,
			creditId: cast.credit_id ? cast.credit_id : ''
		};

		// Profile image url
		if (CastMember.profileImageUrl !== '') {
			CastMember.profileImageUrl = generateAbsolutePath(cast.profile_path);
		}

		// Gender
		if (CastMember.gender !== '') {
			CastMember.gender = CastMember.gender === 2 ? 'Male' : 'Female';
		}

		// Push the new castMember to the updatedFeaturedCast array
		updatedFeaturedCast.push(CastMember);
	});

	// When the resolverType is tv
	if (resolverType === 'tv') {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
		for await (const item of updatedFeaturedCast) {
			if (item.creditId === '') return;

			try {
				const response = await axios.get(generateCreditURLEndpoint(item.creditId));

				if (response.status !== 200) throw Error('Something went wrong');

				response.data.media.seasons.forEach((season) => {
					// Don't include special episodes, only include the core seasons
					if (season.name !== 'Specials') {
						item.episodeCount += season.episode_count;
					}
				});
			} catch (err) {
				console.log(err.message);
			}
		}
	}

	return updatedFeaturedCast;
};

module.exports = setCast;
