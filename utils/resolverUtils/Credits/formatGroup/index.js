const generateYear = require("../../../dates/generateYear");
const replaceKey = require("../../../objects/replaceKey");
const setValue = require("../../../objects/setValue");
const mediaTypes = require("./types");

const reorderGroupByReleaseDate = (group) => {
  group.map((data, index) => {
    if (data.release_date === "-") {
      group.splice(index, 1);
      group.unshift(data);
    }
  });
  return group;
};

const orderGroupByYear = (group) => {
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

const filterGroupByMediaType = (type, group) => {
  switch (type) {
    case mediaTypes.ALL: {
      return group;
    }
    case mediaTypes.MOVIE: {
      return group.filter((data) => data.media_type === "movie");
    }
    case mediaTypes.TV: {
      return group.filter((data) => data.media_type === "tv");
    }
    default: {
      return group;
    }
  }
};

// Any keys which need replacing place them here (Check https://developers.themoviedb.org/3/people/get-person-combined-credits for the schema)
const replaceKeys = (group) => {
  group.map((data) => {
    // Replace first_air_dates (TV credits) with the release_date
    replaceKey(data, "first_air_date", "release_date");

    // Replace the name with the original_title key (Movies already have this, but for TV it will need to be converted)
    replaceKey(data, "name", "original_title");
  });

  return group;
};

const setValues = (group) => {
  group.map((data) => {
    setValue(data, "release_date", generateYear(data.release_date));
  });
  return group;
};

const formatGroup = (group, mediaType) => {
  // Replace any specified keys
  group = replaceKeys(group);

  // Replace any specified values
  group = setValues(group);

  // Conditional filtering (based on the mediaType which is ALL, MOVIE or TV. Default is ALL)
  group = filterGroupByMediaType(mediaType, group);

  // Sort the group by release_date
  group = orderGroupByYear(group);

  // Taking all the release_dates which have - and making them the first elements
  group = reorderGroupByReleaseDate(group);

  return group;
};

module.exports = formatGroup;
