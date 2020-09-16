const toPercentage = (value) => {
	if (value === null || value === undefined) {
		return 0;
	}

	return value * 10;
};
module.exports = toPercentage;
