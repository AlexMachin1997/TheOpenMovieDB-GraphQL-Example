const axios = require("axios");
const { filter } = require("lodash");
const { generateVideoEndpoint } = require("../../config");

const ShowVideoResolver = async (parent, args, context, info) => {
  try {
    // 1. Send a request to the movie videos endpoint
    const response = await axios.get(generateVideoEndpoint(parent.id, "tv"));

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    const YoutubeVideos = filter(
      results,
      video => video.type === "Trailer" && video.site === "YouTube"
    );

    // 3. Return the data
    return YoutubeVideos;
  } catch (err) {
    console.log(err);
    console.log("The tv/videos endpoint failed");
    return err.data;
  }
};

module.exports = ShowVideoResolver;
