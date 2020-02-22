const { API_IMAGE_URL } = require("../../config");
const generateImageURL = field => `${API_IMAGE_URL}${field}`;

module.exports = generateImageURL;
