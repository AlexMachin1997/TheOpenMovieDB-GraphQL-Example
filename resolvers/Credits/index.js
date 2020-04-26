const axios = require("axios");

const generatePersonCreditsEndpoint = require("../../utils/generateEndpoints/Credits");
const generateYear = require("../../utils/dates/generateYear");
const replaceObjectKey = require("../../utils/objects/replaceKey");
const setValue = require("../../utils/objects/setValue");

moveCreditDate = (arrary, object, index) => {
  if (object.release_date === "-") {
    arrary.splice(index, 1);
    arrary.unshift(object);
  }
};

orderGroupByYear = (group) => {
  const groupSorted = group.sort((a, b) => {
    if (a.release_date > b.release_date) {
      return -1;
    }

    if (a.release_date < b.release_date) {
      return 1;
    }

    return 0;
  });

  return groupSorted;
};

formatGroup = (group) => {
  // Remapping keys and formatting data
  group.map((data) => {
    replaceObjectKey(data, "first_air_date", "release_date");
    setValue(data, "release_date", generateYear(data.release_date));
  });

  // Sorting by release date
  group = orderGroupByYear(group);

  // Taking all the release_dates which have - and making them the first elements
  group.map((data, index) => {
    moveCreditDate(group, data, index);
  });

  return group;
};

const CreditsResolver = async (parent, args, info, context) => {
  try {
    const response = await axios.get(generatePersonCreditsEndpoint(parent.id));

    // Acting group
    let ActingGroup = response.data.cast;

    ActingGroup = formatGroup(ActingGroup);

    // Production group
    let ProductionGroup = response.data.crew.filter(
      (crew) => crew.department === "Production"
    );

    ProductionGroup = formatGroup(ProductionGroup);

    // Writing group
    let WritingGroup = response.data.crew.filter(
      (crew) => crew.department === "Writing"
    );

    WritingGroup = formatGroup(WritingGroup);

    // Directing group
    let DirectingGroup = response.data.crew.filter(
      (crew) => crew.department === "Directing"
    );

    DirectingGroup = formatGroup(DirectingGroup);

    // Crew group
    let CrewGroup = response.data.crew.filter(
      (crew) => crew.department === "Crew"
    );

    CrewGroup = formatGroup(CrewGroup);

    CrewGroup.map((data) => {
      replaceObjectKey(data, "original_name", "original_title");
      replaceObjectKey(data, "name", "original_title");
    });

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
