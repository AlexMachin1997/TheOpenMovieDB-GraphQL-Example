const axios = require("axios");

const {
  generateSocialLinksEndpoint
} = require("../../utils/generateEndpoints");

const MovieSocialResolver = async (parent, args, info, context) => {
  try {
    // Make a request to the social (external_links) endpoint using the parent id
    const response = await axios.get(
      generateSocialLinksEndpoint(parent.id, "movie")
    );

    const { data } = response;

    return data;
  } catch (err) {
    console.log("The movie /external_ids (social) endpoint failed");
    return err.data;
  }
};

module.exports = MovieSocialResolver;
