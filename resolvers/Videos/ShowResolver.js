const axios = require("axios");
const { filter } = require("lodash");

const { generateVideoEndpoint } = require("../../utils/generateEndpoints");

const ShowVideoResolver = async (parent, args, context, info) => {
  try {
    // Send a request to the movie videos endpoint
    const response = await axios.get(generateVideoEndpoint(parent.id, "tv"));

    const { data } = response;
    const { results } = data;

    // Filter to find the Trailers which are from YouTube
    const YoutubeVideos = filter(
      results,
      video => video.type === "Trailer" && video.site === "YouTube"
    );

    return YoutubeVideos;
  } catch (err) {
    console.log("The tv/videos endpoint failed");
    return err.data;
  }
};

module.exports = ShowVideoResolver;
