const axios = require("axios");
const { find } = require("lodash");
const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
  generateImageURL
} = require("../../config");

const SearchForAPersonResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      generateSearchEndpoint(args.search, "person")
    );

    const { data } = response;
    const { results } = data;

    // 2. Find a person from the search results
    const SinglePerson = await find(results, person => person.id === args.id);

    // 3. Perform a single person lookup using the person found in search results array
    try {
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SinglePerson.id, "person")
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
