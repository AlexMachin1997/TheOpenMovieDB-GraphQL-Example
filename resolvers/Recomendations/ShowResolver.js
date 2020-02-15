const axios = require("axios");
const { has, forEach } = require("lodash");
const moment = require("moment");
const {
  generateRecomendationEndpoint,
  generateImageURL
} = require("../../config");

const TVRecomendationsResolver = async (parent, args, content, info) => {
  try {
    // Make a reccomendations request using the TV ID field
    const response = await axios.get(
      generateRecomendationEndpoint(parent.id, "tv")
    );

    const { data } = response;
    const { results } = data;

    // Format the data
    forEach(results, data => {
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }
      if (has(data, "poster_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "release_date") === true) {
        const { release_date } = data;
        data.release_date = moment(release_date).format("MMMM d, YYYY");
      }
    });

    return results;
  } catch (err) {
    console.log("The /tv/reccomendations/ endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVRecomendationsResolver;
