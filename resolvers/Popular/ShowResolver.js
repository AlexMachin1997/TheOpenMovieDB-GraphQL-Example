const axios = require("axios");
const moment = require("moment");
const { has, forEach } = require("lodash");

const { generatePopularEndpoint } = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");

const TVPopularResolver = async (parent, args, context, info) => {
  try {
    // Send a request to the popular movies endpoint
    const response = await axios.get(generatePopularEndpoint("tv"));

    const { data } = response;
    const { results } = data;

    // Transform the data
    forEach(results, show => {
      if (has(show, "poster_path") === true) {
        const { poster_path } = show;
        data.poster_path = generateImageURL(poster_path);
      }
      if (has(show, "backdrop_path") === true) {
        const { backdrop_path } = show;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(show, "release_date") === true) {
        const { release_date } = data;
        data.release_date = moment(release_date).format("MMMM d, YYYY");
      }
    });

    return results;
  } catch (err) {
    console.log("The /tv/popular endpoint failed");
    return err.data;
  }
};

module.exports = TVPopularResolver;
