const { isEmpty } = require('lodash');
const moment = require('moment');

const generateBirthdayDate = (date) => {
	let birthdayDate = moment(date).format('DD/MM/YYYY');

	if (isEmpty(date) === true) {
		birthdayDate = '--/--/----';
		return birthdayDate;
	}

	const splitBirthayDate = birthdayDate.split('/');

	const age = moment().diff(
		`${splitBirthayDate[2]}-${splitBirthayDate[1]}-${splitBirthayDate[0]}`,
		'years'
	);

	const output = `${birthdayDate} (${age} years old)`;

	return output;
};

module.exports = generateBirthdayDate;
