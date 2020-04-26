const formatGroup = require("../formatGroup");
const mediaTypes = require("../formatGroup/types");

const formatGroups = (data, mediaType) => {
  // Acting group
  let ActingGroup = data.cast;

  ActingGroup = formatGroup(ActingGroup, mediaType);

  // Production group
  let ProductionGroup = data.crew.filter(
    (crew) => crew.department === "Production"
  );

  ProductionGroup = formatGroup(ProductionGroup, mediaType);

  // Writing group
  let WritingGroup = data.crew.filter((crew) => crew.department === "Writing");

  WritingGroup = formatGroup(WritingGroup, mediaType);

  // Directing group
  let DirectingGroup = data.crew.filter(
    (crew) => crew.department === "Directing"
  );

  DirectingGroup = formatGroup(DirectingGroup, mediaType);

  // Crew group
  let CrewGroup = data.crew.filter((crew) => crew.department === "Crew");

  CrewGroup = formatGroup(CrewGroup, mediaType);

  return {
    ActingGroup,
    ProductionGroup,
    WritingGroup,
    DirectingGroup,
    CrewGroup,
  };
};

module.exports = formatGroups;
