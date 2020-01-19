const axios = require("axios");

const SearchForMoviesResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a movies request
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&query=${args.search}&page=1`
    );

    // 2. Destructure the response from the API endpoint
    const { data } = response;
    const { results } = data;

    // 3. Return the shows to the GraphQL Movie schema
    return results;
  } catch (err) {
    console.log(err);
    throw Error(`Technical problem with the /Search/tv endpoint`);
  }
};

module.exports = SearchForMoviesResolver;
