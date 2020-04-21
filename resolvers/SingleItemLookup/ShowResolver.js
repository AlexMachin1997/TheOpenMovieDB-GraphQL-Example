const axios = require("axios");
const { find, has, forEach } = require("lodash");

const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const generateYear = require("../../utils/dates/generateYear");
const toPercentage = require("../../utils/maths/toPercentage");
const setValue = require("../../utils/objects/setValue");

const SearchForAShowResolver = async (parent, args, context, info) => {
  try {
    // Make a request to the search API using a search term provided in the query
    const response = await axios.get(generateSearchEndpoint(args.search, "tv"));

    // Find a movie from the search results
    const SingleShow = find(
      response.data.results,
      (show) => show.id === args.id
    );

    try {
      // Perform a single show lookup using the show found in search results array
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SingleShow.id, "tv")
      );

      const { data } = response;

      if (has(data, "created_by") === true) {
        forEach(data.created_by, (creator) => {
          if (has(creator, "profile_path") === true) {
            setValue(
              creator,
              "profile_path",
              generateImageURL(creator.profile_path)
            );
          }
        });
      }

      if (
        has(data, "last_episode_to_air") === true &&
        has(data, "seasons") === true
      ) {
        const CurrentSeasonIndex = data.seasons.findIndex(
          (season) =>
            season.season_number === data.last_episode_to_air.season_number
        );

        // Set the current_season field to the CurrentSeason
        setValue(data, "current_season", {
          image: generateImageURL(data.last_episode_to_air.still_path),
          season_number: data.last_episode_to_air.season_number,
          year: generateYear(data.last_episode_to_air.air_date),
          episode_count: data.seasons[CurrentSeasonIndex].episode_count,
          overview: data.seasons[CurrentSeasonIndex].overview,
        });
      }

      if (has(data, "backdrop_path") === true) {
        setValue(data, "backdrop_path", generateImageURL(data.backdrop_path));
      }

      if (has(data, "poster_path") === true) {
        setValue(data, "poster_path", generateImageURL(data.poster_path));
      }

      if (has(data, "vote_average") === true) {
        setValue(data, "vote_average", toPercentage(data.vote_average));
      }

      if (has(data, "networks") === true) {
        const { networks } = data;
        forEach(networks, (network) => {
          if (has(network, "logo_path") === true) {
            setValue(network, "logo_path", generateImageURL(network.logo_path));
          }
        });
      }

      return data;
    } catch (err) {
      console.log(`The /tv endpoint failed`);
      console.log(err);
      return err.response;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    console.log(err);
    return err.response;
  }
};

module.exports = SearchForAShowResolver;
