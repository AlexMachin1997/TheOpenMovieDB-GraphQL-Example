/**
 * @description Transforms a value into a percentage
 * @param {number} value
 * @returns {number}
 */
const toPercentage = (value) => {
	// Check to see if the value is null or undefined
	if (value === null || value === undefined) {
		return 0;
	}

	// When the value isn't null or undefined convert the number to a percentage
	return value * 10;
};
module.exports = toPercentage;
