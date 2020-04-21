const axios = require("axios");
const { find, has } = require("lodash");

const generateImageURL = require("../../utils/generateImageURL");
const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
} = require("../../utils/generateEndpoints");
const generateBirthdayDate = require("../../utils/dates/generateBirthday");
const setValue = require("../../utils/objects/setValue");

const SearchForAPersonResolver = async (parent, args, context, info) => {
  try {
    // Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      generateSearchEndpoint(args.search, "person")
    );

    // Find a person from the search results
    const SinglePerson = find(
      response.data.results,
      (person) => person.id === args.id
    );

    try {
      // Perform a single person lookup using the person found in search results array
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SinglePerson.id, "person")
      );

      const { data } = response;

      if (has(data, "gender") === true) {
        setValue(data, "gender", data.gender === 0 ? "Male" : "Female");
      }

      if (has(data, "birthday") === true) {
        setValue(data, "birthday", generateBirthdayDate(data.birthday));
      }

      if (has(data, "populaity") === true) {
        setValue(data, "popularity", data.popularity.toFixed(2));
      }

      if (has(data, "profile_path") === true) {
        setValue(data, "profile_path", generateImageURL(data.profile_path));
      }

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
