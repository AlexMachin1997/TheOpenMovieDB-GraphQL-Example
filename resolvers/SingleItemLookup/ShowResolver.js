const axios = require("axios");
const { find, has, forEach, isEmpty } = require("lodash");
const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
  generateImageURL
} = require("../../config");

const SearchForAShowResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a request to the search API using a search term provided in the query
    const response = await axios.get(generateSearchEndpoint(args.search, "tv"));

    const { data } = response;
    const { results } = data;

    // 2. Find a movie from the search results
    const SingleShow = find(results, show => show.id === args.id);

    // 3. Perform a single show lookup using the show found in search results array
    try {
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SingleShow.id, "tv")
      );

      const { data } = response;
      const { created_by, last_episode_to_air, backdrop_path } = data;

      // Data formatting for the created_by field
      if (has(data, "created_by") === true) {
        forEach(created_by, creator => {
          if (has(creator, "profile_path") === true) {
            creator.profile_path = generateImageURL(creator.profile_path);
          }
        });
      }

      // Data formatting for the last_episode_to_air field
      if (has(data, "last_episode_to_air") === true) {
        last_episode_to_air.still_path = generateImageURL(
          last_episode_to_air.still_path
        );
      }

      // Data formatting for the backdrop_path field
      if (has(data, "backdrop_path") === true) {
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      return data;
    } catch (err) {
      console.log(`The /tv endpoint failed`);
      console.log(err);
      return err;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = SearchForAShowResolver;
