/**
 * @typedef {Object} Group
 * @property {string} releaseDate
 * @property {string} title
 * @property {string} episodeCount
 * @property {string} mediaType
 * @property {string} role
 */

/**
 * @typedef {Object} FormattedGroup
 * @property {string} year
 * @property {Group[]} credits
 */

/**
 * @param {Group[]} array
 * @description Formats the group so the front-end can format the UI correctly
 * @returns {FormattedGroup[]}
 */
const organizeGroup = (array) => {
	/**
	 * @type {FormattedGroup[]}
	 */
	const group = [];

	array.forEach((credit) => {
		const existingGroup = group.find((el) => el.year === credit.releaseDate);

		// When the element exists already push the credit to the group.credits array
		if (existingGroup !== undefined) {
			existingGroup.credits.push(credit);
			return existingGroup;
		}

		/**
		 * @type {FormattedGroup}
		 * @description Stores the newly created year and adds the first credit for the year
		 */
		const model = {
			year: credit.releaseDate,
			credits: [credit]
		};

		// Push the new object to the group array, will create an object like this: {year: 1997, credits: [{title: 'Awesome movie'}]}
		group.push(model);
	});

	return group;
};

module.exports = organizeGroup;
