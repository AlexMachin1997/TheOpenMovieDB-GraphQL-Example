const axios = require("axios");
const { find, has, forEach } = require("lodash");
const moment = require("moment");

const {
  generateSearchEndpoint,
  generateSingleItemLookupEndpoint,
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const { formatReleaseDate } = require("../../utils/formatDates");

const SearchForAShowResolver = async (parent, args, context, info) => {
  try {
    // Make a request to the search API using a search term provided in the query
    const response = await axios.get(generateSearchEndpoint(args.search, "tv"));

    const { data } = response;
    const { results } = data;

    // Find a movie from the search results
    const SingleShow = find(results, (show) => show.id === args.id);

    try {
      // Perform a single show lookup using the show found in search results array
      const response = await axios.get(
        generateSingleItemLookupEndpoint(SingleShow.id, "tv")
      );

      const { data } = response;

      // Data formatting for the created_by field
      if (has(data, "created_by") === true) {
        const { created_by } = data;
        forEach(created_by, (creator) => {
          if (has(creator, "profile_path") === true) {
            const { profile_path } = creator;
            creator.profile_path = generateImageURL(profile_path);
          }
        });
      }

      // Generate the current season information
      if (
        has(data, "last_episode_to_air") === true &&
        has(data, "seasons") === true
      ) {
        const { seasons, last_episode_to_air } = data;

        const CurrentSeasonIndex = seasons.findIndex(
          (season) => season.season_number === last_episode_to_air.season_number
        );

        // Set the current_season field to the CurrentSeason
        data.current_season = {
          image: generateImageURL(last_episode_to_air.still_path),

          season_number: last_episode_to_air.season_number,

          year: moment(last_episode_to_air.air_date).format("YYYY"),

          episode_count: seasons[CurrentSeasonIndex].episode_count,

          overview: seasons[CurrentSeasonIndex].overview,
        };
      }

      // Data formatting for the backdrop_path field
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      // Data formatting for the poster_Path field
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }

      // Data formatting for the networks
      if (has(data, "networks") === true) {
        const { networks } = data;
        forEach(networks, (network) => {
          if (has(network, "logo_path") === true) {
            const { logo_path } = network;
            network.logo_path = generateImageURL(logo_path);
          }
        });
      }

      return data;
    } catch (err) {
      console.log(`The /tv endpoint failed`);
      return err.response;
    }
  } catch (err) {
    console.log("The /Search endpoint failed");
    console.log(err);
    return err.response;
  }
};

module.exports = SearchForAShowResolver;
