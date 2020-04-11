const axios = require("axios");
const { has, forEach } = require("lodash");

const {
  generateRecomendationEndpoint,
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
    forEach(results, (data) => {
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }
    });

    return results;
  } catch (err) {
    console.log(err);
    console.log("The /movie/reccomendations/ endpoint failed");
    return err;
  }
};

module.exports = MovieRecomendationsResolver;
