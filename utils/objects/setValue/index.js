const { has } = require('lodash');

const setValue = (object, key, value) => {
	if (has(object, key) === false) {
		return value;
	}

	return (object[key] = value);
};

module.exports = setValue;
