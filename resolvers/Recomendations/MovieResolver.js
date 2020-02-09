const axios = require("axios");
const { has, forEach } = require("lodash");
const moment = require("moment");
const { generateRecomendationEndpoint } = require("../../config");

const MovieRecomendationsResolver = async (parent, args, content, info) => {
  try {
    // 1. Make a reccomendations request using the Movie ID field
    const response = await axios.get(
      generateRecomendationEndpoint(parent.id, "movie")
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 3. Transform the data where needed e.g. release_date, image url etc
    forEach(results, data => {
      const hasPosterPath = has(data, "poster_path");
      const hasBackdropPath = has(data, "backdrop_path");
      const hasReleaseDatePath = has(data, "release_date");

      if (hasPosterPath) {
        data.poster_path = `https://image.tmdb.org/t/p/original${data.poster_path}`;
      }
      if (hasBackdropPath) {
        data.backdrop_path = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
      }

      if (hasReleaseDatePath) {
        data.release_date = moment(data.release_date).format("MMMM d, YYYY");
      }
    });

    // 3. Return the reccomendations
    return results;
  } catch (err) {
    console.log("The /reccomendations endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = MovieRecomendationsResolver;
