const axios = require("axios");
const { has, forEach } = require("lodash");
const moment = require("moment");

const {
  generateRecomendationEndpoint
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");

const MovieRecomendationsResolver = async (parent, args, content, info) => {
  try {
    // Make a reccomendations request using the Movie ID field
    const response = await axios.get(
      generateRecomendationEndpoint(parent.id, "movie")
    );

    const { data } = response;
    const { results } = data;

    // Transform the data
    forEach(results, data => {
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "release_date") === true) {
        const { release_date } = data;
        data.release_date = moment(release_date).format("DD-MM-YYYY");
      }
    });

    return results;
  } catch (err) {
    console.log("The /movie/reccomendations/ endpoint failed");
    return err.response;
  }
};

module.exports = MovieRecomendationsResolver;
