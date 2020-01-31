// The Open Movie Database URL
const API_URI = process.env.OPEN_MOVIE_DB_API_URI;

// The Open Movie Database URL Version
const API_VERSION = process.env.OPEN_MOVIE_DB_API_VERSION;

// The Open Movie Database Image URL
const API_IMAGE_URL = process.env.OPEN_MOVIE_DB_API_IMAGE_URL;

// The Open Movie Database API Key
const API_KEY = process.env.OPEN_MOVIE_DB_API_KEY;

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

module.exports = {
  generateCastURLEndpoint,
  generateCreditsEndpoint,
  generateCrewEndpoint,
  generateDiscoverEndpoint,
  API_IMAGE_URL
};
