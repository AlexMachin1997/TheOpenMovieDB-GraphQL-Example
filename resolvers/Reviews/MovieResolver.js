const axios = require("axios");
const { generateReviewEndpoint } = require("../../config");

const MovieReviewsResolver = async (parent, args, context, info) => {
  console.log("Movies");

  try {
    // 1. Make a review request using the Movie object id field
    const response = await axios.get(
      generateReviewEndpoint(parent.id, "movie")
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    // 3. Return the reviews
    return results;
  } catch (err) {
    console.log("The /reviews endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = MovieReviewsResolver;
