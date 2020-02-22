const axios = require("axios");

const { generateKeywordEndpoint } = require("../../utils/generateEndpoints");

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
    return err;
  }
};

module.exports = MovieKeywordResolver;
