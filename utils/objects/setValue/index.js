const { isEmpty } = require("lodash");

const setValue = (object, key, value) => {
  if (isEmpty(object[key]) === true) {
    return "Please provide a valid object option";
  }

  return (object[key] = value);
};

module.exports = setValue;
