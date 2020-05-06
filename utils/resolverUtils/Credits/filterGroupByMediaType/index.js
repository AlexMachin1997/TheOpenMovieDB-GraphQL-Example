const mediaTypes = require("./types");

const filterGroupByMediaType = (type = mediaTypes.ALL, group) => {
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

module.exports = filterGroupByMediaType;
