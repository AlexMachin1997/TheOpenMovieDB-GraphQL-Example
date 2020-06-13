const orderGroupByYear = (group) => {
	const groupSorted = group.sort((a, b) => {
		if (a.release_date > b.release_date) {
			return -1;
		}

		if (a.release_date < b.release_date) {
			return 1;
		}

		return 0;
	});

	return groupSorted;
};

module.exports = orderGroupByYear;
