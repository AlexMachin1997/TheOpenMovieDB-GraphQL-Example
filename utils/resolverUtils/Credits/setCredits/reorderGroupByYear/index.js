/**
 * @typedef {Object} Group
 * @property {string} releaseDate
 * @property {string} title
 * @property {number} episodeCount
 * @property {string} mediaType
 */

/**
 * @description Reorders the credit group by releaseDate field
 * @param {Group[]} group
 * @returns {Group[]}
 */
const orderGroupByYear = (group) => {
	const groupSorted = group.sort((a, b) => {
		if (a.releaseDate > b.releaseDate) {
			return -1;
		}

		if (a.releaseDate < b.releaseDate) {
			return 1;
		}

		return 0;
	});

	return groupSorted;
};

module.exports = orderGroupByYear;
