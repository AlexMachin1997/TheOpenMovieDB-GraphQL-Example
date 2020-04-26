const axios = require("axios");

const generatePersonCreditsEndpoint = require("../../utils/generateEndpoints/Credits");
const formatGroups = require("../../utils/resolverUtils/Credits/formatGroups");
const mediaType = require("../../utils/resolverUtils/Credits/formatGroup/types");

const CreditsResolver = async (parent, args, info, context) => {
  try {
    const response = await axios.get(generatePersonCreditsEndpoint(parent.id));

    const {
      ActingGroup,
      ProductionGroup,
      WritingGroup,
      DirectingGroup,
      CrewGroup,
    } = formatGroups(response.data, mediaType.ALL);

    return {
      ActingGroup,
      ProductionGroup,
      WritingGroup,
      DirectingGroup,
      CrewGroup,
    };
  } catch (err) {
    return err.response;
  }
};

module.exports = CreditsResolver;
