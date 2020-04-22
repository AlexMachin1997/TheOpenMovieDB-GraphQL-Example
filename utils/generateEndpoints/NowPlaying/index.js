const { API_URI, API_VERSION, API_KEY } = require("../../../config");

const genereateNowPlayingEndpoint = (resolverType) => {
  switch (resolverType) {
    case "tv": {
      return `${API_URI}/${API_VERSION}/${resolverType}/airing_today?api_key=${API_KEY}&page=1`;
    }
    case "movie": {
      return `${API_URI}/${API_VERSION}/${resolverType}/now_playing?api_key=${API_KEY}&page=1`;
    }
  }
};

module.exports = genereateNowPlayingEndpoint;
