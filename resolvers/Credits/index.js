const axios = require("axios");
const { isEmpty, forEach } = require("lodash");

const fs = require("fs");

const {
  generatePersonCreditsEndpoint,
} = require("../../utils/generateEndpoints");
const { generateYear } = require("../../utils/formatDates");

const replaceObjectKey = (object, oldKey, newKey) => {
  if (isEmpty(object[oldKey]) === false) {
    object[newKey] = object[oldKey];
    delete object[oldKey];
    return object;
  }
  return object;
};

reorderDate = (arrary, object, index) => {
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
    data.release_date = generateYear(data.release_date);
  });

  // Sorting by release date
  group = orderGroupByYear(group);

  // Taking all the release_dates which have - and making them the first elements
  group.map((data, index) => {
    reorderDate(group, data, index);
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

    let CrewGroup = response.data.crew.filter(
      (crew) => crew.department === "Crew"
    );

    CrewGroup = formatGroup(CrewGroup);

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
