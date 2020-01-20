const axios = require("axios");
const { find, has, forEach } = require("lodash");

const SearchForAPersonResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&query=${args.name}&page=1&include_adult=false
      `
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 3. Attempt to find the title which matches the search request
    const SinglePerson = await find(results, person => person.id === args.id);

    // 5. Make the Single Movie Lookup
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${SinglePerson.id}?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US`
      );

      const { data } = response;
      return data;
    } catch (err) {
      console.log(`The /Person endpoint failed`);
      console.log(err);
      return err;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = SearchForAPersonResolver;
