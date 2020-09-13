/*

orderGroupByYear notes:

- Orders the credits by date, they are ordered in ascending order

Resource references:

- Sort() : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

*/

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
