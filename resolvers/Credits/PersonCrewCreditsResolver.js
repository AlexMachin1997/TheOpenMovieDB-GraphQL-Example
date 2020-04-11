const axios = require("axios");
const { forEach, has } = require("lodash");

const {
  generatePersonCreditsEndpoint,
} = require("../../utils/generateEndpoints");

const { generateYear } = require("../../utils/formatDates");

const generateImageURL = require("../../utils/generateImageURL");

const PersonCrewCredits = async (parent, args, info, context) => {
  try {
    const response = await axios.get(generatePersonCreditsEndpoint(parent.id));

    const { data } = response;

    const { crew } = data;

    forEach(crew, (data) => {
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }

      if (has(data, "first_air_date") === true) {
        const { first_air_date } = data;
        data.first_air_date = generateYear(first_air_date);
      }

      if (has(data, "release_date") === true) {
        const { first_air_date } = data;
        data.first_air_date = generateYear(first_air_date);
      }

      if (has(data, "popularity") === true) {
        const { popularity } = data;
        data.popularity = popularity.toFixed(2);
      }
    });

    return crew;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

module.exports = PersonCrewCredits;
