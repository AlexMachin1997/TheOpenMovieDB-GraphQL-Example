const axios = require("axios");
const { filter, forEach } = require("lodash");

const { generateVideoEndpoint } = require("../../utils/generateEndpoints");

const MovieVideoResolver = async (parent, args, context, info) => {
  try {
    // Send a request to the movie videos endpoint
    const response = await axios.get(generateVideoEndpoint(parent.id, "movie"));

    const { data } = response;
    const { results } = data;

    // Filter to find the Trailers which are from YouTube
    const YoutubeVideos = filter(results, (video) => video.site === "YouTube");

    // Add the url for each video
    forEach(YoutubeVideos, (video) => {
      video.url = `https://www.youtube.com/watch?v=${video.key}`;
    });

    return YoutubeVideos;
  } catch (err) {
    console.log("The movie/videos endpoint failed");
    return err.response;
  }
};

module.exports = MovieVideoResolver;
