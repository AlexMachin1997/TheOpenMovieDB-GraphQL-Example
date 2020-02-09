const axios = require("axios");
const { generateSocialLinksEndpoint } = require("../../config");

const MovieSocialResolver = async (parent, args, info, context) => {
  try {
    const response = await axios.get(
      generateSocialLinksEndpoint(parent.id, "movie")
    );

    const { data } = response;

    return data;
  } catch (err) {
    console.log("The movie /external_ids (social) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = MovieSocialResolver;
