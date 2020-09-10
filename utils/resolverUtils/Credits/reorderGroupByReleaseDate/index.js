const reorderGroupByReleaseDate = (group) => {
	group.map((data, index) => {
		if (data.release_date === '-') {
			group.splice(index, 1);
			group.unshift(data);
			return data;
		}
	});
	return group;
};

module.exports = reorderGroupByReleaseDate;
