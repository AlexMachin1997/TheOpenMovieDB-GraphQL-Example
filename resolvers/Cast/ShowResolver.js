const axios = require("axios");
const { has, filter, sortBy, forEach } = require("lodash");

const { generateCastURLEndpoint } = require("../../utils/generateEndpoints");
const generateAbsolutePath = require("../../utils/images/generateAbsolutePath");
const setValue = require("../../utils/objects/setValue");
const replaceKey = require("../../utils/objects/replaceKey");

const TVCastResolver = async (parent, args, context, info) => {
  try {
    const response = await axios.get(generateCastURLEndpoint(parent.id, "tv"));

    const featuredCast = filter(
      response.data.cast,
      (member) => member.order < 7
    );

    // Formatting the featured cast
    forEach(featuredCast, (member) => {
      if (has(member, "profile_path")) {
        replaceKey(member, "profile_path", "image");
        setValue(member, "image", generateAbsolutePath(member.image));
      }
    });

    return featuredCast;
  } catch (err) {
    console.log("The /credits (Cast) endpoint failed");
    console.log(err);
    return err.response;
  }
};

module.exports = TVCastResolver;
