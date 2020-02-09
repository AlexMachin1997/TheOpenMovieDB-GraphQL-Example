const axios = require("axios");
const { has, forEach } = require("lodash");
const moment = require("moment");
const { generateSearchEndpoint } = require("../../config");

const SearchForMoviesResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a movies request
    const response = await axios.get(generateSearchEndpoint(args.search, "tv"));

    // 2. Destructure the response from the API endpoint
    const { data } = response;
    const { results } = data;

    forEach(results, show => {
      if (has(show, "poster_path") === true) {
        const { poster_path } = show;
        show.poster_path = `https://image.tmdb.org/t/p/original${poster_path}`;
      }

      if (has(show, "backdrop_path") === true) {
        const { backdrop_path } = show;
        show.backdrop_path = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      }

      if (has(show, "release_date") === true) {
        const { release_date } = show;
        data.release_date = moment(release_date).format("MMMM d, YYYY");
      }
    });

    // 3. Return the shows to the GraphQL Movie schema
    return results;
  } catch (err) {
    console.log(err);
    throw Error(`Technical problem with the /Search/TV endpoint`);
  }
};

module.exports = SearchForMoviesResolver;
