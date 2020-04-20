const axios = require("axios");
const { has, forEach } = require("lodash");

const {
  generateRecomendationEndpoint,
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const toPercentage = require("../../utils/maths/toPercentage");

const TVRecomendationsResolver = async (parent, args, content, info) => {
  try {
    // Make a reccomendations request using the TV ID field
    const response = await axios.get(
      generateRecomendationEndpoint(parent.id, "tv")
    );

    // Format the data
    forEach(response.data.results, (data) => {
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }
      if (has(data, "poster_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "vote_average") === true) {
        const { vote_average } = data;
        data.vote_average = toPercentage(vote_average);
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
