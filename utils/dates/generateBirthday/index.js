const { isEmpty } = require('lodash');
const moment = require('moment');

const generateBirthdayDate = (date) => {
	let birthdayDate = moment(date).format('DD/MM/YYYY');

	if (isEmpty(date) === true) {
		birthdayDate = '--/--/----';
		return birthdayDate;
	}

	const splitBirthdayDate = birthdayDate.split('/');

	const age = moment().diff(
		`${splitBirthdayDate[2]}-${splitBirthdayDate[1]}-${splitBirthdayDate[0]}`,
		'years'
	);

	const output = `${birthdayDate} (${age} years old)`;

	return output;
};

module.exports = generateBirthdayDate;
