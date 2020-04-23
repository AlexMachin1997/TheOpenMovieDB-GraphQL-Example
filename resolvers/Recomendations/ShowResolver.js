const axios = require("axios");
const { has, forEach } = require("lodash");

const generateRecomendationEndpoint = require("../../utils/generateEndpoints/Recomendations");
const generateAbsolutePath = require("../../utils/images/generateAbsolutePath");
const toPercentage = require("../../utils/maths/toPercentage");
const replaceKey = require("../../utils/objects/replaceKey");
const setValue = require("../../utils/objects/setValue");

const TVRecomendationsResolver = async (parent, args, content, info) => {
  try {
    const response = await axios.get(
      generateRecomendationEndpoint(parent.id, "tv")
    );

    forEach(response.data.results, (show) => {
      if (has(show, "poster_path") === true) {
        setValue(show, "poster_path", generateAbsolutePath(show.poster_path));
      }

      if (has(show, "vote_average") === true) {
        setValue(show, "vote_average", toPercentage(show.vote_average));
      }
    });

    return response.data.results;
  } catch (err) {
    console.log("The /tv/reccomendations/ endpoint failed");
    return err;
  }
};

module.exports = TVRecomendationsResolver;
