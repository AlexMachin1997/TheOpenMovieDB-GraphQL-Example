const { isEmpty } = require("lodash");
const moment = require("moment");

const generateYear = (date) => {
  let newYear = moment(date).format("YYYY");

  if (isEmpty(date) === true) {
    newYear = "-";
    return newYear;
  }

  return newYear;
};

module.exports = generateYear;
