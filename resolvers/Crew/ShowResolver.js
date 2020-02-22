const axios = require("axios");
const { has, forEach } = require("lodash");

const { generateCrewEndpoint } = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");

const TVCrewResolver = async (parent, args, context, info) => {
  try {
    // Make a crew request using the TV object id field
    const response = await axios.get(generateCrewEndpoint(parent.id, "tv"));

    const { data } = response;
    const { crew } = data;

    // URL formatting
    forEach(crew, data => {
      if (has(data, "profile_path") === true) {
        const { profile_path } = member;
        data.profile_path = generateImageURL(profile_path);
      }
    });

    return crew;
  } catch (err) {
    console.log("The /credits (Crew) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVCrewResolver;
