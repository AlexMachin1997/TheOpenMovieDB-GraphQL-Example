const reorderGroupByReleaseDate = require('../reorderGroupByReleaseDate');
const orderGroupByYear = require('../reorderGroupByYear');
const setValues = require('../setValues');

/**
 * @typedef {Object} Credit
 * @property {string} releaseDate
 * @property {number | null} episodeCount
 * @property {string} title
 * @property {string} mediaType
 */

/**
 *
 * @param {Object[]} singleGroup
 * @returns {Credit[]}
 */
const formatGroup = (singleGroup) => {
	// Stores the initial credits
	let group = singleGroup;

	if (group.length === 0) return [];

	// Replace any specified values
	group = setValues(group);

	// Sort the group by release_date
	group = orderGroupByYear(group);

	// Taking all the release_dates which have - and making them the first elements
	group = reorderGroupByReleaseDate(group);

	return group;
};

module.exports = formatGroup;
