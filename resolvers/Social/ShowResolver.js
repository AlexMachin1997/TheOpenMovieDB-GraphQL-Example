const axios = require("axios");

const {
  generateSocialLinksEndpoint,
} = require("../../utils/generateEndpoints");

const TVSocialResolver = async (parent, args, info, context) => {
  try {
    // Make a request to the social (external_links) endpoint using the parent id
    const response = await axios.get(
      generateSocialLinksEndpoint(parent.id, "tv")
    );

    return response.data;
  } catch (err) {
    console.log("The TV /external_ids (social) endpoint failed");
    return err.response;
  }
};

module.exports = TVSocialResolver;
