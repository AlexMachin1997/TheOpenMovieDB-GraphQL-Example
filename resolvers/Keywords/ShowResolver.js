const axios = require("axios");
const { generateKeywordEndpoint } = require("../../config.js");

const TVKeywordResolver = async (parent, args, info, context) => {
  try {
    // 1. Make a keywords request using the TV object id field
    const response = await axios.get(generateKeywordEndpoint(parent.id, "tv"));

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 3. Return the keywords
    return results;
  } catch (err) {
    console.log("The /keywords endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVKeywordResolver;
