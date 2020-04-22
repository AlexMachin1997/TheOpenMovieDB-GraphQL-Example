const axios = require("axios");
const { has, forEach } = require("lodash");

const { generatePopularEndpoint } = require("../../utils/generateEndpoints");
const generateAbsolutePath = require("../../utils/images/generateAbsolutePath");
const replaceObjectKey = require("../../utils/objects/replaceKey");
const setValue = require("../../utils/objects/setValue");
const toPercentage = require("../../utils/maths/toPercentage");

const PopularPeopleResolver = async (parent, args, context, info) => {
  try {
    const response = await axios.get(generatePopularEndpoint("person"));

    forEach(response.data.results, (person) => {
      if (has(person, "profile_path") === true) {
        const { profile_path } = person;
        person.profile_path = generateAbsolutePath(profile_path);
      }

      if (has(person, "known_for") === true) {
        forEach(person.known_for, (role) => {
          if (has(role, "backdrop_path") === true) {
            setValue(
              role,
              "backdrop_path",
              generateAbsolutePath(role.backdrop_path)
            );
          }

          if (has(role, "poster_path") === true) {
            setValue(
              role,
              "poster_path",
              generateAbsolutePath(role.poster_path)
            );
          }

          if (has(role, "vote_average") === true) {
            setValue(role, "vote_avergage", toPercentage(role.vote_average));
          }

          replaceObjectKey(role, "original_name", "title");
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
