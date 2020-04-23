const { API_URI, API_VERSION, API_KEY } = require("../../../config");

const generateReviewEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

module.exports = generateReviewEndpoint;
