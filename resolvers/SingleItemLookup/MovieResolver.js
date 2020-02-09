const axios = require("axios");
const { find, has, forEach } = require("lodash");
const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
  generateImageURL
} = require("../../config");

const SearchForAMovieResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      generateSearchEndpoint(args.search, "movie")
    );

    const { data } = response;
    const { results } = data;

    // 2. Find a movie from the search results
    const SingleMovie = find(results, movie => movie.id === args.id);

    // 3. Perform a movie show lookup using the movie found in the array
    try {
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SingleMovie.id, "movie")
      );

      const { data } = response;
      const { backdrop_path, production_companies } = data;

      // Data formatting for the backdrop_path field
      if (has(data, "backdrop_path")) {
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      // Data formatting for the production_companies field
      forEach(production_companies, company => {
        let { logo_path } = company;

        if (has(company, "logo_path")) {
          company.logo_path = generateImageURL(logo_path);
        }
      });

      return data;
    } catch (err) {
      console.log(`The /Movie endpoint failed`);
      console.log(err);
      return err;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = SearchForAMovieResolver;
