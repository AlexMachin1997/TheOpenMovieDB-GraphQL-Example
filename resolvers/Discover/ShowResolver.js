const axios = require("axios");
const { has, forEach } = require("lodash");

const { generateDiscoverEndpoint } = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const formatDate = require("../../utils/dates/custom");
const generateQueryParameters = require("../../utils/generateQueryParameter");

const DiscoverTVResolver = async (parent, args, context, info) => {
  try {
    // Generate the /Discover shows endpoint
    const TheDiscoverTVURL = generateQueryParameters(
      generateDiscoverEndpoint("tv"),
      args
    );

    // Send a request to the discover tv endpoint
    const response = await axios.get(TheDiscoverTVURL);

    const { data } = response;
    const { results } = data;

    // Format the respones data
    forEach(results, (data) => {
      if (has(data, "poster_path") === true) {
        const { poster_path } = data;
        data.poster_path = generateImageURL(poster_path);
      }
      if (has(data, "backdrop_path") === true) {
        const { backdrop_path } = data;
        data.backdrop_path = generateImageURL(backdrop_path);
      }

      if (has(data, "release_date") === true) {
        const { release_date } = data;
        data.release_date = formatDate(release_date, "MMMM Do, YYYY");
      }
    });

    // Return the resolver to the models (Spits out the data in the request)
    return results;
  } catch (err) {
    console.log(err);
    console.log("The /Discover/TV endpoint failed");
    return err.response;
  }
};

module.exports = DiscoverTVResolver;
