const axios = require("axios");
const moment = require("moment");
const { has, forEach } = require("lodash");
const { generateDiscoverEndpoint } = require("../../config.js");

const DiscoverTVResolver = async (parent, args, context, info) => {
  try {
    // Genres query
    let genresQuery = "";

    // When genres exist build a query string to find movies by genres
    if (args.genres) {
      // Split the numbers provided and for each number append it to genresQuery with a query parameter
      args.genres.split(", ").map(data => {
        genresQuery += `&with_genres=${data}`;
      });
    }

    // 1. Send a request to the discover movies endpoint
    const response = await axios.get(
      generateDiscoverEndpoint("tv", args.releaseDate, args.sortBy, genresQuery)
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 2. Transform the data where needed e.g. release_date, image url etc
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

    // 3. Return the DiscoverMoviesResponse
    return results;
  } catch (err) {
    console.log(err);
    console.log("The /Discover/TV endpoint failed");
    return err.data;
  }
};

module.exports = DiscoverTVResolver;
