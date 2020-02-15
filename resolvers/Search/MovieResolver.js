const axios = require("axios");
const { forEach, has } = require("lodash");
const moment = require("moment");
const { generateSearchEndpoint, generateImageURL } = require("../../config");

const SearchForMoviesResolver = async (parent, args, context, info) => {
  try {
    // Make a search request using the search term provided
    const response = await axios.get(
      generateSearchEndpoint(args.search, "movie")
    );

    const { data } = response;
    const { results } = data;

    // Transform the data
    forEach(results, movie => {
      if (has(movie, "poster_path") === true) {
        const { poster_path } = movie;
        movie.poster_path = generateImageURL(poster_path);
      }

      if (has(movie, "backdrop_path") === true) {
        const { backdrop_path } = movie;
        movie.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(movie, "release_date") === true) {
        const { release_date } = movie;
        data.release_date = moment(release_date).format("MMMM d, YYYY");
      }
    });

    // 3. Return the movies to the GraphQL Movie schema
    return results;
  } catch (err) {
    console.log(`Technical problem with the /Search/Movie endpoint`);
    return err.data;
  }
};

module.exports = SearchForMoviesResolver;
