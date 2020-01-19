const axios = require("axios");

const TVSocialResolver = async (parent, args, info, context) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${parent.id}/external_ids?api_key=1b5adf76a72a13bad99b8fc0c68cb085      `
    );

    const { data } = response;

    return data;
  } catch (err) {
    console.log("The /external_ids (social) endpoint failed");
    console.log(err);
    return err;
  }
};

module.exports = TVSocialResolver;
