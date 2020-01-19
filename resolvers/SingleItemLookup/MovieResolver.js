const axios = require("axios");
const { find, has, forEach } = require("lodash");

const SearchForAMovieResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&query=${args.name}&page=1`
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 3. Attempt to find the title which matches the search request
    const SingleMovie = await find(results, movie => movie.id === args.id);

    // 5. Make the Single Movie Lookup
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${SingleMovie.id}?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US`
      );

      const { data } = response;

      const hasBackdropPath = has(data, "backdrop_path");

      let { backdrop_path, production_companies } = data;

      if (hasBackdropPath) {
        data.backdrop_path = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      }

      forEach(production_companies, company => {
        let { logo_path } = company;

        const hasCompanyLogo = has(company, "logo_path");

        if (hasCompanyLogo) {
          company.logo_path = `https://image.tmdb.org/t/p/original${logo_path}`;
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
