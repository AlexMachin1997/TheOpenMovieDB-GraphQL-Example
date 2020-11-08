const generateYear = require('../../../../dates/generateYear');

/**
 * @typedef {Object} InputGroup
 * @property {number} [id]
 * @property {string} [first_air_date]
 * @property {string} [name]
 * @property {string} [original_name]
 * @property {string} [title]
 * @property {string} [original_title]
 * @property {number} episode_count
 * @property {string} [release_date]
 * @property {string} media_type
 * @property {string} character
 * @property {string} job
 */

/**
 * @typedef {Object} Group
 * @property {string} releaseDate
 * @property {string} title
 * @property {number} episodeCount
 * @property {string} mediaType
 * @property {string} role
 */

/**
 * @description Creates the keys and values for the new credits
 * @param {InputGroup[]} group
 * @returns {Group[]} Returns a new modified group. This will be used in the Credits query.
 */

const setValues = (group) => {
	/**
	 * @description Stores the new credits
	 * @type {Group[]}
	 */
	const credits = [];

	group.forEach((data) => {
		/**
		 * @description The new credits object. It must match the properties in the People/Credits model
		 * @type {Group}
		 */
		const updatedGroup = {
			releaseDate: '',
			title: '',
			episodeCount: 0,
			mediaType: data.media_type,
			role: data.character || data.job
		};

		// The movie and tv series use different object properties, so to get the correct values the media_type checks
		if (data.media_type === 'tv') {
			updatedGroup.releaseDate = generateYear(data.first_air_date) || '';
			updatedGroup.title = data.name || data.original_name;
			updatedGroup.episodeCount = data.episode_count || 0;
		} else {
			updatedGroup.releaseDate = generateYear(data.release_date) || '';
			updatedGroup.title = data.title || data.original_title || '';
		}

		// Once the new object has been created push it to the newGroup
		credits.push(updatedGroup);
	});

	return credits;
};

module.exports = setValues;
