const axios = require("axios");

const TVReviewsResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a review request using the TV object id field
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${parent.id}/reviews?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&page=1`
    );

    console.log("TV Review Resolver");

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

module.exports = TVReviewsResolver;
