const axios = require("axios");
const { filter } = require("lodash");

const MovieVideoResolver = async (parent, args, context, info) => {
  try {
    // 1. Send a request to the movie videos endpoint
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${parent.id}/videos?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US`
    );

    // 2. Destructure the response
    const { data } = response;
    const { results } = data;

    const YoutubeVideos = filter(
      results,
      video => video.type === "Trailer" && video.site === "YouTube"
    );
    console.log(YoutubeVideos);

    // 3. Return the data
    return YoutubeVideos;
  } catch (err) {
    console.log(err);
    console.log("The movie/videos endpoint failed");
    return err.data;
  }
};

module.exports = MovieVideoResolver;
