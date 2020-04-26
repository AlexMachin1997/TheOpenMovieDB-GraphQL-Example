const axios = require("axios");

const generateReviewEndpoint = require("../../utils/generateEndpoints/Reviews");

const TVReviewsResolver = async (parent, args, context, info) => {
  try {
    const response = await axios.get(generateReviewEndpoint(parent.id, "tv"));

    return response.data.results;
  } catch (err) {
    console.log("The /reviews endpoint failed");
    console.log(err);
    return err.response;
  }
};

module.exports = TVReviewsResolver;
