const { isEmpty } = require("lodash");
const moment = require("moment");

const generateBirthdayDate = (date) => {
  let birthdayDate = moment(date).format("DD/MM/YYYY");

  if (isEmpty(date) === true) {
    birthdayDate = "--/--/----";
    return birthdayDate;
  }

  let splitBirthayDate = birthdayDate.split("/");

  let age = moment().diff(
    `${splitBirthayDate[2]}-${splitBirthayDate[1]}-${splitBirthayDate[0]}`,
    "years"
  );

  let output = `${birthdayDate} (${age} years old)`;

  return output;
};

module.exports = generateBirthdayDate;
