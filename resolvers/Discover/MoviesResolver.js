const axios = require("axios");
const moment = require("moment");
const { has, forEach } = require("lodash");

const { generateDiscoverEndpoint } = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const { formatReleaseDate } = require("../../utils/formatDates");

const DiscoverMoviesResolver = async (parent, args, context, info) => {
  try {
    // Genres query
    let genresQuery = "";

    // When genres exist build a query string to find movies by genres
    if (args.genres === true) {
      // Split the numbers provided and for each number append it to genresQuery with a query parameter
      args.genres.split(", ").map(data => {
        genresQuery += `&with_genres=${data}`;
      });
    }

    // Send a request to the discover movies endpoint
    const response = await axios.get(
      generateDiscoverEndpoint(
        "movie",
        args.releaseDate,
        args.sortBy,
        genresQuery
      )
    );

    const { data } = response;
    const { results } = data;

    // Format the data
    forEach(results, data => {
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "release_date") === true) {
        const { release_date } = data;
        data.release_date = formatReleaseDate(release_date);
      }
    });

    return results;
  } catch (err) {
    console.log("The /Discover/Movie endpoint failed");
    return err.response;
  }
};

module.exports = DiscoverMoviesResolver;
