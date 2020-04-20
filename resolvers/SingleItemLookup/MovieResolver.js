const axios = require("axios");
const { find, has, forEach } = require("lodash");

const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const toPercentage = require("../../utils/maths/toPercentage");

const SearchForAMovieResolver = async (parent, args, context, info) => {
  try {
    // Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      generateSearchEndpoint(args.search, "movie")
    );

    // Find a movie from the search results
    const SingleMovie = find(
      response.data.results,
      (movie) => movie.id === args.id
    );

    try {
      // Perform a movie show lookup using the movie found in the array
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SingleMovie.id, "movie")
      );

      const { data } = response;

      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }

      if (has(data, "budget") === true) {
        const { budget } = data;
        data.budget = budget.toLocaleString();
      }

      if (has(data, "revenue") === true) {
        const { revenue } = data;
        data.revenue = revenue.toLocaleString();
      }

      if (has(data, vote_average) === true) {
        const { vote_average } = data;
        data.vote_average = toPercentage(vote_average);
      }

      // Data formatting for the production_companies field
      forEach(data.production_companies, (company) => {
        if (has(company, "logo_path")) {
          const { logo_path } = company;
          company.logo_path = generateImageURL(logo_path);
        }
      });

      return data;
    } catch (err) {
      console.log(`The /Movie endpoint failed`);
      return err.response;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    return err.response;
  }
};

module.exports = SearchForAMovieResolver;
