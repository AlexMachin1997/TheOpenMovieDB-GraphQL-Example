const axios = require("axios");
const moment = require("moment");
const { has, forEach } = require("lodash");

const TVPopularResolver = async (parent, args, context, info) => {
  try {
    // 1. Send a request to the discover movies endpoint
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=1b5adf76a72a13bad99b8fc0c68cb085&page=1`
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    const { known_for } = results;

    // Transform the results data where needed e.g. image urls etc

    // Transform the know_for data where needed e.g. release_date, image urls etc
    forEach(known_for, role => {
      if (has(role, "backdrop_path") === true) {
        const { backdrop_path } = role;
        role.backdrop_path = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      }

      if (has(role, "poster_path") === true) {
        const { poster_path } = role;
        role.poster_path = `https://image.tmdb.org/t/p/original${poster_path}`;
      }
    });

    // 3. Return the data
    return results;
  } catch (err) {
    console.log(err);
    console.log("The /tv/popular endpoint failed");
    return err.data;
  }
};

module.exports = TVPopularResolver;
