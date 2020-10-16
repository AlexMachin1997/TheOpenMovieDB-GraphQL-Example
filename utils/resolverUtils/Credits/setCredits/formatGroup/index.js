const reorderGroupByReleaseDate = require('../reorderGroupByReleaseDate');
const orderGroupByYear = require('../reorderGroupByYear');
const setValues = require('../setValues');
const organizeGroup = require('../organizeGroup');

/**
 * @typedef {Object} Credit
 * @property {string} releaseDate
 * @property {number | null} episodeCount
 * @property {string} title
 * @property {string} mediaType
 */

/**
 * @typedef {Object} FormattedGroup
 * @property {string} year
 * @property {Credit[]} credits
 */

/**
 * @param {Object[]} singleGroup
 * @returns {FormattedGroup[]}
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

	group = organizeGroup(group);

	return group;
};

module.exports = formatGroup;
