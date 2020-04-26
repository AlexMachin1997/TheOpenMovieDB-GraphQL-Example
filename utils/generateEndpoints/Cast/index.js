const { API_URI, API_VERSION, API_KEY } = require("../../../config");

const generateCastURLEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/credits?api_key=${API_KEY}`;

module.exports = generateCastURLEndpoint;
