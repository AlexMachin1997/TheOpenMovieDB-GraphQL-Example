const axios = require("axios");
const { forEach, has } = require("lodash");
const { generateSearchEndpoint, generateImageURL } = require("../../config");

const SearchForPeopleResolver = async (parent, args, context, info) => {
  try {
    // Make a search request using the search term provided
    const response = await axios.get(
      generateSearchEndpoint(args.search, "person")
    );

    const { data } = response;
    const { results } = data;

    // Transform the data
    forEach(results, person => {
      if (has(person, "profile_path") === true) {
        const { profile_path } = person;
        person.profile_path = generateImageURL(profile_path);
      }
    });

    return results;
  } catch (err) {
    console.log(`Technical problem with the /Search/Movie endpoint`);
    return err.data;
  }
};

module.exports = SearchForPeopleResolver;
