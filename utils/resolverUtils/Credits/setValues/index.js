const generateYear = require("../../../dates/generateYear");
const setValue = require("../../../objects/setValue");

const setValues = (group) => {
  group.map((data) => {
    setValue(data, "release_date", generateYear(data.release_date));
  });
  return group;
};

module.exports = setValues;
