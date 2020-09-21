const axios = require('axios');
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
			episodeCount: 0,
			creditId: cast.credit_id ? cast.credit_id : 0
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

	const res = updatedFeaturedCast.map(async (data, index) => {
		if (data.creditId === 0) return data;

		const response = await axios.get(
			`https://api.themoviedb.org/3/credit/${data.creditId}?api_key=1b5adf76a72a13bad99b8fc0c68cb085`
		);

		response.data.media.seasons.forEach((season) => {
			if (season.name !== 'Specials') {
				data.episodeCount += season.episode_count;
			}
		});

		return data;
	});

	return Promise.all(res);
};

module.exports = setCast;
