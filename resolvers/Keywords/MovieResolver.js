const axios = require("axios");
const { generateKeywordEndpoint } = require("../../config.js");

const MovieKeywordResolver = async (parent, args, info, context) => {
  try {
    // Make a keywords request using the Movie object id field
    const response = await axios.get(
      generateKeywordEndpoint(parent.id, "movie")
    );

    const { data } = response;
    const { keywords } = data;

    return keywords;
  } catch (err) {
    console.log("The /keywords endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = MovieKeywordResolver;
