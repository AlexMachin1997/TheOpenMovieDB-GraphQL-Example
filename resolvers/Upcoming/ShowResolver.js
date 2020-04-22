const axios = require("axios");
const { has, forEach } = require("lodash");

const { generateUpcomingEndpoint } = require("../../utils/generateEndpoints");
const generateAbsolutePath = require("../../utils/images/generateAbsolutePath");
const formatDate = require("../../utils/dates/custom");
const toPercentage = require("../../utils/maths/toPercentage");
const setValue = require("../../utils/objects/setValue");
const replaceKey = require("../../utils/objects/replaceKey");

const NowPlayingTVResolver = async (parent, args, context, info) => {
  try {
    const response = await axios.get(generateUpcomingEndpoint("tv"));

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
    console.log("The tv/on_the_air endpoint failed");
    return err.response;
  }
};

module.exports = NowPlayingTVResolver;
