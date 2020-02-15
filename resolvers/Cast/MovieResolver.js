const axios = require("axios");
const { has, filter, sortBy, forEach } = require("lodash");
const {
  generateCastURLEndpoint,
  generateImageURL
} = require("../../config.js");

const MovieCastResolver = async (parent, args, context, info) => {
  try {
    // Make a cast request using the Movie object id field
    const response = await axios.get(
      generateCastURLEndpoint(parent.id, "movie")
    );

    const { data } = response;
    const { cast } = data;

    // Sort the cast by order number
    sortBy(cast, member => member.order);

    // Finding the featured cast (top 6 actors)
    const featuredCast = filter(cast, member => member.order < 7);

    // Formatting the featured cast
    forEach(featuredCast, member => {
      let { profile_path } = member;

      if (has(member, "profile_path")) {
        member.profile_path = generateImageURL(profile_path);
      }
    });

    return featuredCast;
  } catch (err) {
    console.log("The /credits (Cast) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = MovieCastResolver;
