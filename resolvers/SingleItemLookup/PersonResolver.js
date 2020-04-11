const axios = require("axios");
const { find, has } = require("lodash");

const generateImageURL = require("../../utils/generateImageURL");

const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
} = require("../../utils/generateEndpoints");

const { generateBirthdayDate } = require("../../utils/formatDates");

const SearchForAPersonResolver = async (parent, args, context, info) => {
  try {
    // Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      generateSearchEndpoint(args.search, "person")
    );

    const { data } = response;
    const { results } = data;

    // Find a person from the search results
    const SinglePerson = find(results, (person) => person.id === args.id);

    try {
      // Perform a single person lookup using the person found in search results array
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SinglePerson.id, "person")
      );

      const { data } = response;

      if (has(data, "gender") === true) {
        const { gender } = data;
        data.gender = gender === 0 ? "Male" : "Female";
      }

      if (has(data, "birthday") === true) {
        const { birthday } = data;
        data.birthday = generateBirthdayDate(birthday);
      }

      if (has(data, "populaity") === true) {
        const { popularity } = data;
        data.popularity = popularity.toFixed(2);
      }

      if (has(data, "profile_path") === true) {
        const { profile_path } = data;
        data.profile_path = generateImageURL(profile_path);
      }

      return data;
    } catch (err) {
      console.log(`The /Person endpoint failed`);
      console.log(err);
      return err.response;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    return err.response;
  }
};

module.exports = SearchForAPersonResolver;
