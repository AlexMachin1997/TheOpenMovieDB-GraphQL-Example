const generateYear = require('../../../dates/generateYear');

/*

setValues notes:

- Updates the values from the credits array e.g. release_date

*/
const setValues = (group) => {
	group.map((data) => {
		data.release_date = generateYear(data.release_date);
		return data;
	});
	return group;
};

module.exports = setValues;
