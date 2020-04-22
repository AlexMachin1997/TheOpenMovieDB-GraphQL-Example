const { API_URI, API_VERSION, API_KEY } = require("../../../config");

const generateKeywordEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/keywords?api_key=${API_KEY}`;

module.exports = generateKeywordEndpoint;
