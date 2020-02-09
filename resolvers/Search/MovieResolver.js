const axios = require("axios");
const { forEach, has } = require("lodash");
const moment = require("moment");
const { generateSearchEndpoint } = require("../../config");

const SearchForMoviesResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a movies request
    const response = await axios.get(
      generateSearchEndpoint(args.search, "movie")
    );

    // 2. Destructure the response from the API endpoint
    const { data } = response;
    const { results } = data;

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

    // 3. Return the movies to the GraphQL Movie schema
    return results;
  } catch (err) {
    console.log(err);
    throw Error(`Technical problem with the /Search/Movie endpoint`);
  }
};

module.exports = SearchForMoviesResolver;
