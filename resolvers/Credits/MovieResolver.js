const axios = require("axios");
const { has, forEach } = require("lodash");
const moment = require("moment");

const { generateCreditsEndpoint } = require("../../config.js");

const MovieCreditsResolver = async (parent, args, context, info) => {
  try {
    // Send a request to the tv_credits endpoint
    const response = await axios.get(
      generateCreditsEndpoint(parent.id, "person", "movie_credits")
    );

    const { data } = response;

    const { cast } = data;

    // Format the data
    forEach(cast, cast => {
      if (has(cast, "backdrop_path") === true) {
        const { backdrop_path } = cast;
        cast.backdrop_path = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      }

      if (has(cast, "poster_path") === true) {
        const { poster_path } = cast;
        cast.poster_path = `https://image.tmdb.org/t/p/original${poster_path}`;
      }

      if (has(cast, "first_air_date") === true) {
        const { first_air_date } = cast;
        cast.first_air_date = moment(first_air_date).format("DD/MM/YYYY");
      }

      if (has(cast, "popularity") === true) {
        const { popularity } = cast;
        cast.popularity = popularity.toFixed(2);
      }
    });

    // Return the data to the GraphQL query
    return cast;
  } catch (err) {
    console.log(err);
    console.log("The /person/:id/movie_credits endpoint failed");
    return err.data;
  }
};

module.exports = MovieCreditsResolver;
