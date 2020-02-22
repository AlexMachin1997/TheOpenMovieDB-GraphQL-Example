const axios = require("axios");
const { has, forEach } = require("lodash");
const moment = require("moment");

const { generateSearchEndpoint, generateImageURL } = require("../../config");

const SearchForMoviesResolver = async (parent, args, context, info) => {
  try {
    // Make a search request using the search term provided
    const response = await axios.get(generateSearchEndpoint(args.search, "tv"));

    const { data } = response;
    const { results } = data;

    // Transform the data
    forEach(results, show => {
      if (has(show, "poster_path") === true) {
        const { poster_path } = show;
        show.poster_path = generateImageURL(poster_path);
      }

      if (has(show, "backdrop_path") === true) {
        const { backdrop_path } = show;
        show.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(show, "release_date") === true) {
        const { release_date } = show;
        data.release_date = moment(release_date).format("MMMM d, YYYY");
      }
    });

    return results;
  } catch (err) {
    console.log(`Technical problem with the /Search/TV endpoint`);
    return err.data;
  }
};

module.exports = SearchForMoviesResolver;
