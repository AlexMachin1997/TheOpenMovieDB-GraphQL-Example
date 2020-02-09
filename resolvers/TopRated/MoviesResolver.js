const axios = require("axios");
const moment = require("moment");
const { has, forEach } = require("lodash");
const { generateTopRatedEndpoint, generateImageURL } = require("../../config");

const MoviePopularResolver = async (parent, args, context, info) => {
  try {
    // 1. Send a request to the discover movies endpoint
    const response = await axios.get(generateTopRatedEndpoint("movie"));

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 2. Transform the data where needed e.g. release_date, image url etc
    forEach(results, data => {
      const { poster_path, backdrop_path, release_date } = data;

      if (has(data, "poster_path") === true) {
        data.poster_path = generateImageURL(poster_path);
      }
      if (has(data, "backdrop_path") === true) {
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "release_date") === true) {
        data.release_date = moment(release_date).format("MMMM d, YYYY");
      }
    });

    // 3. Return the data
    return results;
  } catch (err) {
    console.log(err);
    console.log("The /movie/top_rated endpoint failed");
    return err.data;
  }
};

module.exports = MoviePopularResolver;
