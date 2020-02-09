// The Open Movie Database URL
const API_URI = process.env.OPEN_MOVIE_DB_API_URI;

// The Open Movie Database URL Version
const API_VERSION = process.env.OPEN_MOVIE_DB_API_VERSION;

// The Open Movie Database Image URL
const API_IMAGE_URL = process.env.OPEN_MOVIE_DB_API_IMAGE_URL;

// The Open Movie Database API Key
const API_KEY = process.env.OPEN_MOVIE_DB_API_KEY;

const generateImageURL = field => `${API_IMAGE_URL}${field}`;

const generateCastURLEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/credits?api_key=${API_KEY}`;

const generateCreditsEndpoint = (id, resolverType, creditType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/${creditType}?api_key=${API_KEY}`;

const generateCrewEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/credits?api_key=${API_KEY}`;

const generateDiscoverEndpoint = (
  resolverType,
  releaseDate,
  sortBy,
  genresQuery
) => {
  const url = `${API_URI}/${API_VERSION}/discover/${resolverType}?api_key=${API_KEY}&page=1${
    releaseDate ? `&primary_release_year=${releaseDate}` : ""
  }${sortBy ? `&sort_by=${sortBy}` : "popularity.asc"}${genresQuery}`;

  return url;
};

const generateKeywordEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/keywords?api_key=${API_KEY}`;

const genereateNowPlayingEndpoint = resolverType => {
  switch (resolverType) {
    case "tv": {
      return `${API_URI}/${API_VERSION}/${resolverType}/airing_today?api_key=${API_KEY}&page=1`;
    }
    case "movie": {
      return `${API_URI}/${API_VERSION}/${resolverType}/now_playing?api_key=${API_KEY}&page=1`;
    }
  }
};

const generatePopularEndpoint = resolverType =>
  `${API_URI}/${API_VERSION}/${resolverType}/popular?api_key=${API_KEY}`;

const generateRecomendationEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

// Need to add

const generateReviewEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

const generateSearchEndpoint = (searchTerm, resolverType) =>
  `${API_URI}/${API_VERSION}/search/${resolverType}?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`;

const generateSingleItemLookupEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}?api_key=${API_KEY}&language=en-US`;

const generateSocialLinksEndpoint = (id, resolverType) =>
  `${API_URI}/${API_VERSION}/${resolverType}/${id}/external_ids?api_key=${API_KEY}`;

const generateTopRatedEndpoint = resolverType =>
  `${API_URI}/${API_VERSION}/${resolverType}/top_rated?api_key=${API_KEY}&page=1`;

module.exports = {
  generateCastURLEndpoint,
  generateCreditsEndpoint,
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
  API_IMAGE_URL,
  generateImageURL
};
