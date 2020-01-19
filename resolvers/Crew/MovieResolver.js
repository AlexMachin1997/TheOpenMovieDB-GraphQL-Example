const axios = require("axios");
const { has, filter, forEach } = require("lodash");

const MovieCrewResolver = async (parent, args, context, info) => {
  try {
    // Make a crew request using the Movie object id field
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${parent.id}/credits?api_key=1b5adf76a72a13bad99b8fc0c68cb085`
    );

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
