const { API_IMAGE_URL } = require("../../../config.js");
const generateAbsolutePath = (imageName) => `${API_IMAGE_URL}${imageName}`;

module.exports = generateAbsolutePath;
