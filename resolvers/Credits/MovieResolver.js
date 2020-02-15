const axios = require("axios");
const { has, forEach } = require("lodash");
const moment = require("moment");

const {
  generateCreditsEndpoint,
  generateImageURL
} = require("../../config.js");

const MovieCreditsResolver = async (parent, args, context, info) => {
  try {
    // Send a request to the tv_credits endpoint
    const response = await axios.get(
      generateCreditsEndpoint(parent.id, "person", "movie_credits")
    );

    const { data } = response;
    const { cast } = data;

    // Format the cast field
    forEach(cast, data => {
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }

      if (has(data, "first_air_date") === true) {
        const { first_air_date } = data;
        data.first_air_date = moment(first_air_date).format("DD/MM/YYYY");
      }

      if (has(data, "popularity") === true) {
        const { popularity } = data;
        data.popularity = popularity.toFixed(2);
      }
    });

    return cast;
  } catch (err) {
    console.log(err);
    console.log("The /person/:id/movie_credits endpoint failed");
    return err.data;
  }
};

module.exports = MovieCreditsResolver;
