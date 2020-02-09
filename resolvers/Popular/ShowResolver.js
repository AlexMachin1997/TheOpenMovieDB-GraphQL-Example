const axios = require("axios");
const moment = require("moment");
const { has, forEach } = require("lodash");
const { generatePopularEndpoint } = require("../../config.js");

const TVPopularResolver = async (parent, args, context, info) => {
  try {
    // 1. Send a request to the discover movies endpoint
    const response = await axios.get(generatePopularEndpoint("tv"));

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 2. Transform the data where needed e.g. release_date, image url etc
    forEach(results, show => {
      if (has(show, "poster_path") === true) {
        const { poster_path } = show;
        data.poster_path = `https://image.tmdb.org/t/p/original${poster_path}`;
      }
      if (has(show, "backdrop_path") === true) {
        const { backdrop_path } = show;
        data.backdrop_path = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      }

      if (has(show, "release_date") === true) {
        data.release_date = moment(data.release_date).format("MMMM d, YYYY");
      }
    });

    // 3. Return the data
    return results;
  } catch (err) {
    console.log(err);
    console.log("The /tv/popular endpoint failed");
    return err.data;
  }
};

module.exports = TVPopularResolver;
