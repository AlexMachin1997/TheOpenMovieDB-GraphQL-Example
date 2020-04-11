const axios = require("axios");
const { has, forEach } = require("lodash");

const {
  genereateNowPlayingEndpoint,
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const { formatDate } = require("../../utils/formatDates");

const NowPlayingTVResolver = async (parent, args, context, info) => {
  try {
    // Send a request to the now playing movies endpoint
    const response = await axios.get(genereateNowPlayingEndpoint("movie"));

    const { data } = response;
    const { results } = data;

    // Format the data
    forEach(results, (data) => {
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }

      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "release_date") === true) {
        const { release_date } = data;
        data.release_date = formatDate(release_date, "MMMM Do, YYYY");
      }
    });

    return results;
  } catch (err) {
    console.log("The tv/on_the_air endpoint failed");
    return err.response;
  }
};

module.exports = NowPlayingTVResolver;
