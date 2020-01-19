const axios = require("axios");

const MovieKeywordResolver = async (parent, args, info, context) => {
  try {
    // 1. Make a keywords request using the Movie object id field
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${parent.id}/keywords?api_key=1b5adf76a72a13bad99b8fc0c68cb085`
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
