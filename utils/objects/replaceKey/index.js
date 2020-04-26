const { isEmpty } = require("lodash");

const replaceKey = (object, oldKey, newKey) => {
  // Empty object key check
  if (isEmpty(object[oldKey]) === false) {
    // New key
    object[newKey] = object[oldKey];

    // Delete the old key
    delete object[oldKey];

    // Return the data
    return object;
  }

  return object;
};

module.exports = replaceKey;
