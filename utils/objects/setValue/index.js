const { isEmpty } = require("lodash");

const setValue = (object, key, value) => (object[key] = value);

module.exports = setValue;
