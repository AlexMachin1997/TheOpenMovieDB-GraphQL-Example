const axios = require("axios");
const { has, forEach } = require("lodash");

const {
  generateRecomendationEndpoint,
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const toPercentage = require("../../utils/maths/toPercentage");
const replaceKey = require("../../utils/objects/replaceKey");
const setValue = require("../../utils/objects/setValue");

const TVRecomendationsResolver = async (parent, args, content, info) => {
  try {
    const response = await axios.get(
      generateRecomendationEndpoint(parent.id, "tv")
    );

    // Format the data
    forEach(response.data.results, (data) => {
      if (has(data, "poster_path") === true) {
        setValue(data, "poster_path", generateImageURL(data.poster_path));
      }
      if (has(data, "poster_path") === true) {
        setValue(data, "poster_path", generateImageURL(data.backdrop_path));
      }

      if (has(data, "vote_average") === true) {
        setValue(data, "vote_average", toPercentage(data.vote_average));
      }

      if (has(data, "first_air_date") === true) {
        replaceKey(data, "first_air_date", "release_date");
      }
    });

    return response.data.results;
  } catch (err) {
    console.log("The /tv/reccomendations/ endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVRecomendationsResolver;
