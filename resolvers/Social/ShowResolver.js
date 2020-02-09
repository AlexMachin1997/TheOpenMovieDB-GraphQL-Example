const axios = require("axios");
const { generateSocialLinksEndpoint } = require("../../config");

const TVSocialResolver = async (parent, args, info, context) => {
  try {
    const response = await axios.get(
      generateSocialLinksEndpoint(parent.id, "tv")
    );

    const { data } = response;

    return data;
  } catch (err) {
    console.log("The TV /external_ids (social) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVSocialResolver;
