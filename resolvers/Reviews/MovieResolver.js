const axios = require("axios");

const MovieReviewsResolver = async (parent, args, context, info) => {
  console.log("Movies");

  try {
    // 1. Make a review request using the Movie object id field
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${parent.id}/reviews?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&page=1`
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
