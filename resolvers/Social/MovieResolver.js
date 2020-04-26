const axios = require("axios");

const generateSocialLinksEndpoint = require("../../utils/generateEndpoints/Social");

const MovieSocialResolver = async (parent, args, info, context) => {
  try {
    const response = await axios.get(
      generateSocialLinksEndpoint(parent.id, "movie")
    );

    return response.data;
  } catch (err) {
    console.log("The movie /external_ids (social) endpoint failed");
    return err.response;
  }
};

module.exports = MovieSocialResolver;
