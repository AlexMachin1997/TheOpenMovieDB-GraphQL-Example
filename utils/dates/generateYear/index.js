const { isEmpty } = require('lodash');
const moment = require('moment');

/**
 * @param {string} date
 * @returns {string}
 */
const generateYear = (date) => {
	let newYear = moment(date).format('YYYY');

	if (isEmpty(date) === true) {
		newYear = '-';
		return newYear;
	}

	return newYear;
};

module.exports = generateYear;
