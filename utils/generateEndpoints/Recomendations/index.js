const { API_URI, API_VERSION, API_KEY } = require("../../../config");

const generateRecomendationEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

module.exports = generateRecomendationEndpoint;
