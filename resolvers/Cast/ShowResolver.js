const axios = require("axios");
const { has, filter, sortBy, forEach } = require("lodash");

const { generateCastURLEndpoint } = require("../../utils/generateEndpoints");
const generateImageURL = require("../../utils/generateImageURL");
const setValue = require("../../utils/objects/setValue");
const replaceKey = require("../../utils/objects/replaceKey");

const TVCastResolver = async (parent, args, context, info) => {
  try {
    // Make a cast request using the TV object id field
    const response = await axios.get(generateCastURLEndpoint(parent.id, "tv"));

    // Sort the cast by order number
    sortBy(response.data.cast, (member) => member.order);

    // Finding the featured cast (top 6 actors)
    const featuredCast = filter(
      response.data.cast,
      (member) => member.order < 7
    );

    // Formatting the featured cast
    forEach(featuredCast, (member) => {
      if (has(member, "profile_path")) {
        replaceKey(member, "profile_path", "image");
        setValue(member, "image", generateImageURL(member.image));
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
