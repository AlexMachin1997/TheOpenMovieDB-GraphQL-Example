const moment = require("moment");

const formatDate = (date, pattern) => moment(date).format(pattern);

const generateYear = (date) => moment(date).format("YYYY");

const generateBirthdayDate = (date) => moment(date).format("DD/MM/YYYY");

module.exports = {
  formatDate,
  generateYear,
  generateBirthdayDate,
};
