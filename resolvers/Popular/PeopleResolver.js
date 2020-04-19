const axios = require("axios");
const { has, forEach } = require("lodash");

const { generatePopularEndpoint } = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const replaceObjectKey = require("../../utils/objects/replaceKey");

const PopularPeopleResolver = async (parent, args, context, info) => {
  try {
    // Send a request to the popular person endpoint
    const response = await axios.get(generatePopularEndpoint("person"));

    // Format the popular movies
    forEach(response.data.results, (person) => {
      if (has(person, "profile_path") === true) {
        const { profile_path } = person;
        person.profile_path = generateImageURL(profile_path);
      }

      // Format the known_for field in the person object
      if (has(person, "known_for") === true) {
        forEach(person.known_for, (role) => {
          if (has(role, "backdrop_path") === true) {
            const { backdrop_path } = role;
            role.backdrop_path = generateImageURL(backdrop_path);
          }

          if (has(role, "poster_path") === true) {
            const { poster_path } = role;
            role.poster_path = generateImageURL(poster_path);
          }

          replaceObjectKey(role, "original_name", "original_title");
        });
      }
    });

    return response.data.results;
  } catch (err) {
    console.log(err);
    console.log("The /tv/popular endpoint failed");
    return err.response;
  }
};

module.exports = PopularPeopleResolver;
