const moment = require('moment');
const { isEmpty } = require('lodash');

/**
 * @param {string} date
 * @param {string} pattern
 * @returns {string}
 */
const formatDate = (date, pattern = 'MMMM Do, YYYY') => {
	const formattedDate = moment(date).format(pattern);

	if (isEmpty(pattern) === true || isEmpty(date) === true) {
		return '-';
	}

	return formattedDate;
};

module.exports = formatDate;
