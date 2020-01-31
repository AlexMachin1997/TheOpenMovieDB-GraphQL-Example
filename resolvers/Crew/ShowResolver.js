const axios = require("axios");
const { has, forEach } = require("lodash");
const { generateCrewEndpoint } = require("../../config.js");

const TVCrewResolver = async (parent, args, context, info) => {
  try {
    // Make a crew request using the TV object id field
    const response = await axios.get(generateCrewEndpoint(parent.id, "tv"));

    // 2. Destructure the response
    const { data } = response;
    const { crew } = data;
    console.log(data);

    // 5. URL formatting
    forEach(crew, member => {
      const hasLogoPath = has(member, "profile_path");

      let { profile_path } = member;

      if (hasLogoPath) {
        member.profile_path = `https://image.tmdb.org/t/p/original${profile_path}`;
      }
    });

    // 3. Return the reviews
    return crew;
  } catch (err) {
    console.log("The /credits (Crew) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVCrewResolver;
