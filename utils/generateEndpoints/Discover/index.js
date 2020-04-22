const { API_URI, API_VERSION, API_KEY } = require("../../../config");

const generateDiscoverEndpoint = (resolverType) =>
  `${API_URI}/${API_VERSION}/discover/${resolverType}?api_key=${API_KEY}&page=1`;

module.exports = generateDiscoverEndpoint;
