const axios = require("axios");
const { has, filter, forEach } = require("lodash");
const { generateCrewEndpoint } = require("../../config.js");

const MovieCrewResolver = async (parent, args, context, info) => {
  try {
    // Make a crew request using the Movie object id field
    const response = await axios.get(generateCrewEndpoint(parent.id, "movie"));

    // 2. Destructure the response
    const { data } = response;
    const { crew } = data;

    // Getting the crew by specific job titles
    const featuredCrew = filter(
      crew,
      member =>
        member.job === "Director" ||
        member.job === "Screenplay" ||
        member.job === "Writer"
    );

    // 5. URL formatting
    forEach(featuredCrew, member => {
      const hasLogoPath = has(member, "profile_path");

      let { profile_path } = member;

      if (hasLogoPath) {
        member.profile_path = `https://image.tmdb.org/t/p/original${profile_path}`;
      }
    });

    // 3. Return the reviews
    return featuredCrew;
  } catch (err) {
    console.log("The /credits (Crew) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = MovieCrewResolver;
