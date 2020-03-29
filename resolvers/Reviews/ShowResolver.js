const axios = require("axios");

const { generateReviewEndpoint } = require("../../utils/generateEndpoints");

const TVReviewsResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a review request using the TV object id field
    const response = await axios.get(generateReviewEndpoint(parent.id, "tv"));

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 3. Return the reviews
    return results;
  } catch (err) {
    console.log("The /reviews endpoint failed");
    console.log(err);
    return err.response;
  }
};

module.exports = TVReviewsResolver;
