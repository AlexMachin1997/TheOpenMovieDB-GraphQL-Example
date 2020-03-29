const axios = require("axios");
const { find } = require("lodash");

const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint
} = require("../../utils/generateEndpoints");

const SearchForAPersonResolver = async (parent, args, context, info) => {
  try {
    // Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      generateSearchEndpoint(args.search, "person")
    );

    const { data } = response;
    const { results } = data;

    // Find a person from the search results
    const SinglePerson = find(results, person => person.id === args.id);

    try {
      // Perform a single person lookup using the person found in search results array
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SinglePerson.id, "person")
      );

      const { data } = response;
      return data;
    } catch (err) {
      console.log(`The /Person endpoint failed`);
      return err.response;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    return err.response;
  }
};

module.exports = SearchForAPersonResolver;
