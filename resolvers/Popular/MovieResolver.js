const axios = require("axios");
const moment = require("moment");
const { has, forEach } = require("lodash");
const { generatePopularEndpoint } = require("../../config.js");

const MoviePopularResolver = async (parent, args, context, info) => {
  try {
    // 1. Send a request to the discover movies endpoint
    const response = await axios.get(generatePopularEndpoint("movie"));

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 2. Transform the data where needed e.g. release_date, image url etc
    forEach(results, movie => {
      if (has(movie, "poster_path") === true) {
        const { poster_path } = movie;
        movie.poster_path = `https://image.tmdb.org/t/p/original${poster_path}`;
      }
      if (has(movie, "backdrop_path") === true) {
        const { backdrop_path } = movie;
        movie.backdrop_path = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      }

      if (has(movie, "release_date") === true) {
        const { release_date } = movie;
        data.release_date = moment(release_date).format("MMMM d, YYYY");
      }
    });

    // 3. Return the data
    return results;
  } catch (err) {
    console.log(err);
    console.log("The /movie/popular endpoint failed");
    return err.data;
  }
};

module.exports = MoviePopularResolver;
