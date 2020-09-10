const { forEach } = require('lodash');
const generateYear = require('../../../dates/generateYear');
const setValue = require('../../../objects/setValue');

const setValues = (group) => {
	forEach(group, (data) => {
		data.release_date = setValue(data, 'release_date', generateYear(data.release_date));
		return data;
	});
	return group;
};

module.exports = setValues;

// const generateYear = require('../../../dates/generateYear');
// const setValue = require('../../../objects/setValue');

// const setValues = (group) => {
// 	group.map((data) => {
// 		data.release_date = generateYear(data.release_date);
// 		return data;
// 	});
// 	return group;
// };

// module.exports = setValues;
