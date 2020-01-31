const axios = require("axios");
const { forEach, has } = require("lodash");

const SearchForPeopleResolver = async (parent, args, context, info) => {
  try {
    // 1. Make a movies request
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&query=${args.search}&page=1`
    );

    // 2. Destructure the response from the API endpoint
    const { data } = response;
    const { results } = data;

    forEach(results, person => {
      if (has(person, "profile_path") === true) {
        const { profile_path } = person;
        person.profile_path = `https://image.tmdb.org/t/p/original${profile_path}`;
      }
    });

    // 3. Return the movies to the GraphQL Person schema
    return results;
  } catch (err) {
    console.log(err);
    throw Error(`Technical problem with the /Search/Movie endpoint`);
  }
};

module.exports = SearchForPeopleResolver;
