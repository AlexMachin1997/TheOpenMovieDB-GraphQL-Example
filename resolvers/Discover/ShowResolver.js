const axios = require("axios");
const { has, forEach } = require("lodash");

const { generateDiscoverEndpoint } = require("../../utils/generateEndpoints");
const generateAbsolutePath = require("../../utils/images/generateAbsolutePath");
const formatDate = require("../../utils/dates/custom");
const generateQueryParameters = require("../../utils/generateQueryParameter/Discover");
const toPercentage = require("../../utils/maths/toPercentage");
const setValue = require("../../utils/objects/setValue");

const DiscoverTVResolver = async (parent, args, context, info) => {
  try {
    const response = await axios.get(
      generateQueryParameters(generateDiscoverEndpoint("tv"), args)
    );

    forEach(response.data.results, (show) => {
      if (has(show, "poster_path") === true) {
        setValue(show, "poster_path", generateAbsolutePath(show.poster_path));
      }

      if (has(show, "backdrop_path") === true) {
        setValue(
          show,
          "backdrop_path",
          generateAbsolutePath(show.backdrop_path)
        );
      }

      if (has(show, "first_air_date") === true) {
        replaceKey(show, "first_air_date", "release_date");
        setValue(
          show,
          "release_date",
          formatDate(show.release_date, "MMMM Do, YYYY")
        );
      }

      if (has(show, "vote_average") === true) {
        setValue(show, "vote_average", toPercentage(show.vote_average));
      }
    });

    return response.data.results;
  } catch (err) {
    console.log(err);
    console.log("The /Discover/TV endpoint failed");
    return err.response;
  }
};

module.exports = DiscoverTVResolver;
