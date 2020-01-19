const axios = require("axios");
const { find, has, forEach, isEmpty } = require("lodash");

const SearchForAShowResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a request to the search API using a search term provided in the query
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&query=${args.name}&page=1`
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    const SingleShow = find(results, show => show.id === args.id);

    // 5. Make the Single tv Lookup
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${SingleShow.id}?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US`
      );

      // Single Show Lookup
      const { data } = response;

      // Single Show Lookup properties
      const { backdrop_path, created_by, last_episode_to_air } = data;

      // Data formatting
      if (has(created_by) === true) {
        forEach(created_by, creator => {
          const { profile_path } = creator;

          if (has(creator, "profile_path") === true) {
            creator.profile_path = `https://image.tmdb.org/t/p/original${profile_path}`;
          }
        });
      }

      if (has(last_episode_to_air) === true) {
        const { still_path } = last_episode_to_air;
        if (isEmpty(still_path) === false) {
          last_episode_to_air.still_path = `https://image.tmdb.org/t/p/original${still_path}`;
        }
      }

      if (has(data, "backdrop_path") === true) {
        data.backdrop_path = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      }

      // if (has(data, "still_path") === true) {
      //   data.still_path = `https://image.tmdb.org/t/p/original${still_path}`;
      // }

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
