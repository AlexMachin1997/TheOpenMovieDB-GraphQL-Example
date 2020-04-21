const axios = require("axios");
const { has, forEach } = require("lodash");

const {
  generateRecomendationEndpoint,
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const toPercentage = require("../../utils/maths/toPercentage");
const setValue = require("../../utils/objects/setValue");

const MovieRecomendationsResolver = async (parent, args, content, info) => {
  try {
    const response = await axios.get(
      generateRecomendationEndpoint(parent.id, "movie")
    );

    // Transform the data
    forEach(response.data.results, (data) => {
      if (has(data, "poster_path") === true) {
        setValue(data, "poster_path", generateImageURL(data.poster_path));
      }

      if (has(data, "backdrop_path") === true) {
        setValue(data, "backdrop_path", generateImageURL(data.backdrop_path));
      }

      if (has(data, "vote_average") === true) {
        setValue(data, "vote_average", toPercentage(data.vote_average));
      }
    });

    return response.data.results;
  } catch (err) {
    console.log(err);
    console.log("The /movie/reccomendations/ endpoint failed");
    return err;
  }
};

module.exports = MovieRecomendationsResolver;
