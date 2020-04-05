const axios = require("axios");
const { forEach, has } = require("lodash");
const moment = require("moment");

const {
  generatePersonCreditsEndpoint,
} = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");

const PersonCastCredits = async (parent, args, info, context) => {
  try {
    const response = await axios.get(generatePersonCreditsEndpoint(parent.id));

    const { data } = response;

    forEach(data.cast, (data) => {
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }

      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "first_air_date") === true) {
        const { first_air_date } = data;
        data.first_air_date = moment(first_air_date).format("YYYY");
      }

      if (has(data, "popularity") === true) {
        const { popularity } = data;
        data.popularity = popularity.toFixed(2);
      }
    });

    data.cast.sort((a, b) => {
      if (a.first_air_date < b.first_air_date) {
        return -1;
      }

      if (a.first_air_date > b.first_air_date) {
        return 1;
      }

      return 0;
    });

    return data.cast;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

module.exports = PersonCastCredits;
