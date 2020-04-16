const { API_URI, API_VERSION, API_KEY } = require("../../config");

const generateCastURLEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/credits?api_key=${API_KEY}`;

const generateCrewEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/credits?api_key=${API_KEY}`;

const generateDiscoverEndpoint = (resolverType) => {
  let url = `${API_URI}/${API_VERSION}/discover/${resolverType}?api_key=${API_KEY}&page=1`;
  return url;
};

const generateKeywordEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/keywords?api_key=${API_KEY}`;

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

const generatePopularEndpoint = (resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/popular?api_key=${API_KEY}`;

const generateRecomendationEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

const generateReviewEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

const generateSearchEndpoint = (searchTerm, resolverType) =>
  `${API_URI}/${API_VERSION}/search/${resolverType}?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`;

const generateSingleItemLookupEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}?api_key=${API_KEY}&language=en-US`;

const generateSocialLinksEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/external_ids?api_key=${API_KEY}`;

const generateTopRatedEndpoint = (resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/top_rated?api_key=${API_KEY}&page=1`;

const generateUpcomingEndpoint = (resolverType) => {
  switch (resolverType) {
    case "tv":
      return `${API_URI}/${API_VERSION}/${resolverType}/on_the_air?api_key=${API_KEY}&page=1`;
    case "movie":
      return `${API_URI}/${API_VERSION}/${resolverType}/upcoming?api_key=${API_KEY}&page=1`;
  }
};

const generateVideoEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/videos?api_key=${API_KEY}&language=en-US`;

const generatePersonCreditsEndpoint = (id) =>
  `${API_URI}/${API_VERSION}/person/${id}/combined_credits?api_key=${API_KEY}`;

module.exports = {
  generateCastURLEndpoint,
  generateCrewEndpoint,
  generateDiscoverEndpoint,
  generateKeywordEndpoint,
  genereateNowPlayingEndpoint,
  generatePopularEndpoint,
  generateRecomendationEndpoint,
  generateReviewEndpoint,
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
  generateSocialLinksEndpoint,
  generateTopRatedEndpoint,
  generateVideoEndpoint,
  generateUpcomingEndpoint,
  generatePersonCreditsEndpoint,
};
