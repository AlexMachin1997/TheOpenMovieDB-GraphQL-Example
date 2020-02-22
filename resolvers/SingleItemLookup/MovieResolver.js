const axios = require("axios");
const { find, has, forEach } = require("lodash");

const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");

const SearchForAMovieResolver = async (parent, args, context, info) => {
  try {
    // Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      generateSearchEndpoint(args.search, "movie")
    );

    const { data } = response;
    const { results } = data;

    // Find a movie from the search results
    const SingleMovie = find(results, movie => movie.id === args.id);

    try {
      // Perform a movie show lookup using the movie found in the array
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SingleMovie.id, "movie")
      );

      const { data } = response;
      const { production_companies } = data;

      // Data formatting for the backdrop_path field
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      // Data formatting for the production_companies field
      forEach(production_companies, company => {
        if (has(company, "logo_path")) {
          const { logo_path } = company;
          company.logo_path = generateImageURL(logo_path);
        }
      });

      return data;
    } catch (err) {
      console.log(`The /Movie endpoint failed`);
      return err.data;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    return err.data;
  }
};

module.exports = SearchForAMovieResolver;
