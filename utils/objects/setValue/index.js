const { has, isEmpty, set } = require('lodash');

const setValue = (object, key, value) => {
	if (has(object, key) === false || isEmpty(object[key]) === true) {
		return '';
	}

	return (object[key] = value);
};

module.exports = setValue;
