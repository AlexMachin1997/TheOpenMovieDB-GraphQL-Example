const { API_IMAGE_URL } = require("../../../config");
const { isEmpty } = require("lodash");

const generateAbsolutePath = (imageName) => {
  // Empty image check
  if (isEmpty(imageName) === true) {
    return "Please provide a relative path";
  }

  // Return the absolute path
  return `${API_IMAGE_URL}${imageName}`;
};

module.exports = generateAbsolutePath;
