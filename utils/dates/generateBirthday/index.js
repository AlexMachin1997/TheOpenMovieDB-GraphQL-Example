const { isEmpty } = require("lodash");

const generateBirthdayDate = (date) => {
  let birthdayDate = moment(date).format("DD/MM/YYYY");

  if (isEmpty(date) === true) {
    birthdayDate = "--/--/----";
    return birthdayDate;
  }

  return birthdayDate;
};

module.exports = generateBirthdayDate;
