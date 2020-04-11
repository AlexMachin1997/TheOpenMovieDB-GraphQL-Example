const moment = require("moment");

const formatReleaseDate = (date) => moment(date).format("MMMM Do, YYYY");

const generateYear = (date) => moment(date).format("YYYY");

const generateBirthdayDate = (date) => moment(date).format("DD/MM/YYYY");

module.exports = {
  formatReleaseDate,
  generateYear,
  generateBirthdayDate,
};
