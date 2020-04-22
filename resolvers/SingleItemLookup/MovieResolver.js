const axios = require("axios");
const { find, has, forEach } = require("lodash");

const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
} = require("../../utils/generateEndpoints");
const generateAbsolutePath = require("../../utils/images/generateAbsolutePath");
const toPercentage = require("../../utils/maths/toPercentage");
const setValue = require("../../utils/objects/setValue");
const replaceKey = require("../../utils/objects/replaceKey");

const SearchForAMovieResolver = async (parent, args, context, info) => {
  try {
    const response = await axios.get(
      generateSearchEndpoint(args.search, "movie")
    );

    const SingleMovie = find(
      response.data.results,
      (movie) => movie.id === args.id
    );

    try {
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SingleMovie.id, "movie")
      );

      const { data } = response;

      if (has(data, "backdrop_path") === true) {
        setValue(
          data,
          "backdrop_path",
          generateAbsolutePath(data.backdrop_path)
        );
      }

      if (has(data, "poster_path") === true) {
        setValue(data, "poster_path", generateAbsolutePath(data.poster_path));
      }

      if (has(data, "budget") === true) {
        setValue(data, "budget", data.budget.toLocaleString());
      }

      if (has(data, "revenue") === true) {
        setValue(data, "revenue", data.revenue.toLocaleString());
      }

      if (has(data, "vote_average") === true) {
        setValue(data, "vote_average", toPercentage(data.vote_average));
      }

      // Data formatting for the production_companies field
      forEach(data.production_companies, (company) => {
        if (has(company, "logo_path")) {
          replaceKey(company, "logo_path", "logo");
          setValue(company, "logo", generateAbsolutePath(company.logo));
        }
      });

      return data;
    } catch (err) {
      console.log(`The /Movie endpoint failed`);
      console.log(err);
      return err.response;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    return err.response;
  }
};

module.exports = SearchForAMovieResolver;
