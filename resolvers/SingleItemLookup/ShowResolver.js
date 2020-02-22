const axios = require("axios");
const { find, has, forEach } = require("lodash");

const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");

const SearchForAShowResolver = async (parent, args, context, info) => {
  try {
    // Make a request to the search API using a search term provided in the query
    const response = await axios.get(generateSearchEndpoint(args.search, "tv"));

    const { data } = response;
    const { results } = data;

    // Find a movie from the search results
    const SingleShow = find(results, show => show.id === args.id);

    try {
      // Perform a single show lookup using the show found in search results array
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SingleShow.id, "tv")
      );

      const { data } = response;

      // Data formatting for the created_by field
      if (has(data, "created_by") === true) {
        const { created_by } = data;
        forEach(created_by, creator => {
          if (has(creator, "profile_path") === true) {
            const { profile_path } = creator;
            creator.profile_path = generateImageURL(profile_path);
          }
        });
      }

      // Data formatting for the last_episode_to_air field
      if (has(data, "last_episode_to_air") === true) {
        const { last_episode_to_air } = data;
        const { still_path } = last_episode_to_air;
        last_episode_to_air.still_path = generateImageURL(still_path);
      }

      // Data formatting for the backdrop_path field
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      return data;
    } catch (err) {
      console.log(`The /tv endpoint failed`);
      return err.data;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    console.log(err);
    return err.data;
  }
};

module.exports = SearchForAShowResolver;
