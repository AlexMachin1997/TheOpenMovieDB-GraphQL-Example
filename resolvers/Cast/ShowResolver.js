const axios = require("axios");
const { has, filter, sortBy, forEach } = require("lodash");
const { generateCastURLEndpoint } = require("../../config.js");

const TVCastResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a cast request using the TV object id field
    const response = await axios.get(generateCastURLEndpoint(parent.id, "tv"));

    // 2. Destructure the response
    const { data } = response;
    const { cast } = data;

    // 4. Sort array by order
    sortBy(cast, member => member.order);

    // 5. Finding the featured cast (top 6 actors)
    const featuredCast = filter(cast, member => member.order < 7);

    // 6. URL formatting
    forEach(featuredCast, member => {
      const hasLogoPath = has(member, "profile_path");

      let { profile_path } = member;

      if (hasLogoPath) {
        member.profile_path = `https://image.tmdb.org/t/p/original${profile_path}`;
      }
    });

    // 3. Return the reviews
    return featuredCast;
  } catch (err) {
    console.log("The /credits (Cast) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVCastResolver;
