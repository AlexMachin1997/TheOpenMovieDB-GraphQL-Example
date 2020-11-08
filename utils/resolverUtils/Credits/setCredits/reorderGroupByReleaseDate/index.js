/**
 * @typedef {Object} Group
 * @property {string} releaseDate
 * @property {string} title
 * @property {number} episodeCount
 * @property {string} mediaType
 */

/**
 * @description Any credits with a releaseDate of "-" move them to the top to mimics the functionality on TheOpenMovieDB.
 * @param {Group[]} group
 * @returns {Group[]}
 */

const reorderGroupByReleaseDate = (group) => {
	group.map((data, index) => {
		// Only target credits with a releaseDate of "-"
		if (data.releaseDate === '-') {
			// Get the item index and remove this item only
			group.splice(index, 1);

			// Readd the credit to the beginning of the array
			group.unshift(data);

			// Return the item
			return data;
		}
	});

	// Return the array of credits
	return group;
};

module.exports = reorderGroupByReleaseDate;
