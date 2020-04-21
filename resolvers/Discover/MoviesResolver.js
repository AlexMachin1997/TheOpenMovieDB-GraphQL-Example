const axios = require("axios");
const { has, forEach } = require("lodash");

const { generateDiscoverEndpoint } = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const formatDate = require("../../utils/dates/custom");
const generateQueryParameters = require("../../utils/generateQueryParameter/Discover");
const toPercentage = require("../../utils/maths/toPercentage");
const setValue = require("../../utils/objects/setValue");

const DiscoverMoviesResolver = async (parent, args, context, info) => {
  try {
    // Generate the /Discover movies endpoint
    const TheDiscoverMovieURL = generateQueryParameters(
      generateDiscoverEndpoint("movie"),
      args
    );

    // Send a request to the discover movies endpoint
    const response = await axios.get(TheDiscoverMovieURL);

    // Format the respones data
    forEach(response.data.results, (movie) => {
      if (has(movie, "poster_path") === true) {
        setValue(movie, "poster_path", generateImageURL(movie.poster_path));
      }

      if (has(movie, "backdrop_path") === true) {
        setValue(movie, "backdrop_path", generateImageURL(movie.backdrop_path));
      }

      if (has(movie, "release_date") === true) {
        setValue(
          movie,
          "release_date",
          formatDate(movie.release_date, "MMMM Do, YYYY")
        );
      }

      if (has(movie, "vote_average") === true) {
        setValue(movie, "vote_average", toPercentage(movie.vote_average));
      }
    });

    return response.data.results;
  } catch (err) {
    console.log("The /Discover/Movie endpoint failed");
    return err.response;
  }
};

module.exports = DiscoverMoviesResolver;
