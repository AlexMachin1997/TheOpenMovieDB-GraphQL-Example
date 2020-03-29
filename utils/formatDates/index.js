const moment = require("moment");

const formatReleaseDate = date => moment(date).format("MMMM Do, YYYY");

module.exports = {
  formatReleaseDate
};
