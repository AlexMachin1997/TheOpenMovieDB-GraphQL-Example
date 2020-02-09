const axios = require("axios");
const { generateKeywordEndpoint } = require("../../config.js");

const MovieKeywordResolver = async (parent, args, info, context) => {
  try {
    // 1. Make a keywords request using the Movie object id field
    const response = await axios.get(
      generateKeywordEndpoint(parent.id, "movie")
    );

    // 2. Destructure the response
    const { data } = response;
    const { keywords } = data;

    // 3. Return the arary of keywords
    return keywords;
  } catch (err) {
    console.log("The /keywords endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = MovieKeywordResolver;
