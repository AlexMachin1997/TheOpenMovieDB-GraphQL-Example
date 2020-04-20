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

module.exports = formatDate;
