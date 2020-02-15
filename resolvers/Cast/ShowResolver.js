const axios = require("axios");
const { has, filter, sortBy, forEach } = require("lodash");
const { generateCastURLEndpoint } = require("../../config.js");

const TVCastResolver = async (parent, args, context, info) => {
  try {
    // Make a cast request using the TV object id field
    const response = await axios.get(generateCastURLEndpoint(parent.id, "tv"));

    const { data } = response;
    const { cast } = data;

    // Sort the cast by order number
    sortBy(cast, member => member.order);

    // Finding the featured cast (top 6 actors)
    const featuredCast = filter(cast, member => member.order < 7);

    // Formatting the featured cast
    forEach(featuredCast, data => {
      let { profile_path } = data;

      if (has(data, "profile_path") === true) {
        member.profile_path = `https://image.tmdb.org/t/p/original${profile_path}`;
      }
    });

    return featuredCast;
  } catch (err) {
    console.log("The /credits (Cast) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVCastResolver;
