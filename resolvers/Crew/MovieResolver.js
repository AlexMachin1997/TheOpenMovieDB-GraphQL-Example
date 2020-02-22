const axios = require("axios");
const { has, filter, forEach } = require("lodash");

const { generateCrewEndpoint } = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");

const MovieCrewResolver = async (parent, args, context, info) => {
  try {
    // Make a crew request using the Movie object id field
    const response = await axios.get(generateCrewEndpoint(parent.id, "movie"));

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

    // URL formatting for images
    forEach(featuredCrew, member => {
      if (has(member, "profile_path") === true) {
        const { profile_path } = member;
        member.profile_path = generateImageURL(profile_path);
      }
    });

    return featuredCrew;
  } catch (err) {
    console.log("The /credits (Crew) endpoint failed");
    return err;
  }
};

module.exports = MovieCrewResolver;
