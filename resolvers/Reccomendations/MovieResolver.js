const axios = require("axios");
const { has, forEach } = require("lodash");
const moment = require("moment");

const MovieReccomendationsResolver = async (parent, args, content, info) => {
  try {
    // 1. Make a reccomendations request using the Movie ID field
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${parent.id}/recommendations?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&page=1        `
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 3. Transform the data where needed e.g. release_date, image url etc
    forEach(results, data => {
      const hasPosterPath = has(data, "poster_path");
      const hasBackdropPath = has(data, "backdrop_path");
      const hasReleaseDatePath = has(data, "release_date");

      if (hasPosterPath) {
        data.poster_path = `https://image.tmdb.org/t/p/original${data.poster_path}`;
      }
      if (hasBackdropPath) {
        data.backdrop_path = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
      }

      if (hasReleaseDatePath) {
        data.release_date = moment(data.release_date).format("MMMM d, YYYY");
      }
    });

    // 3. Return the reccomendations
    return results;
  } catch (err) {
    console.log("The /reccomendations endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = MovieReccomendationsResolver;
