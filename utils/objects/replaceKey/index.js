const { isEmpty } = require("lodash");

const replaceKey = (object, oldKey, newKey) => {
  if (isEmpty(object[oldKey]) === false) {
    object[newKey] = object[oldKey];
    delete object[oldKey];
    return object;
  }
  return object;
};

module.exports = replaceKey;
