const moment = require("moment");
const { isEmpty } = require("lodash");

const formatDate = (date, pattern) => {
  let formattedDate = moment(date).format(pattern);

  if (isEmpty(date) === true) {
    formattedDate = "--/--/--";
    return formattedDate;
  }

  return formattedDate;
};

const generateYear = (date) => {
  let newYear = moment(date).format("YYYY");

  if (isEmpty(date) === true) {
    newYear = "-";
    return newYear;
  }

  return newYear;
};

const generateBirthdayDate = (date) => {
  let birthdayDate = moment(date).format("DD/MM/YYYY");

  if (isEmpty(date) === true) {
    birthdayDate = "--/--/----";
    return birthdayDate;
  }

  return birthdayDate;
};

module.exports = {
  formatDate,
  generateYear,
  generateBirthdayDate,
};
