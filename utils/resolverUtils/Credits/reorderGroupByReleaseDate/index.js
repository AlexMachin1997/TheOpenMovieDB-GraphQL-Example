/*

reorderGroupByReleaseDate notes:

- Any release dates which have "-" move them to the top of the list

- The item with "-" is removed and readded back to the beginning of the array

*/

const reorderGroupByReleaseDate = (group) => {
	group.map((data, index) => {
		if (data.release_date === '-') {
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
