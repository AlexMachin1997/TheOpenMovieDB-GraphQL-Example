const axios = require("axios");
const { has, forEach } = require("lodash");

const generateDiscoverEndpoint = require("../../utils/generateEndpoints/Discover");
const generateAbsolutePath = require("../../utils/images/generateAbsolutePath");
const formatDate = require("../../utils/dates/custom");
const generateQueryParameters = require("../../utils/generateQueryParameters/Discover");
const toPercentage = require("../../utils/maths/toPercentage");
const setValue = require("../../utils/objects/setValue");

const DiscoverMoviesResolver = async (parent, args, context, info) => {
  try {
    const response = await axios.get(
      generateQueryParameters(generateDiscoverEndpoint("movie"), args)
    );

    forEach(response.data.results, (movie) => {
      if (has(movie, "poster_path") === true) {
        setValue(movie, "poster_path", generateAbsolutePath(movie.poster_path));
      }

      if (has(movie, "backdrop_path") === true) {
        setValue(
          movie,
          "backdrop_path",
          generateAbsolutePath(movie.backdrop_path)
        );
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
