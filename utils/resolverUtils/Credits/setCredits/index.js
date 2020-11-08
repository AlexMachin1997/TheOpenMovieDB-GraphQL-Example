const formatGroup = require('./formatGroup');

/**
 * @typedef {Object} CrewInput
 * @property {array} cast
 * @property {array} crew
 * @property {number} id
 */

/**
 * @typedef {Object} FormattedGroup
 * @property {string} releaseDate
 * @property {string} title
 * @property {string} episodeCount
 * @property {string} mediaType
 */

/**
 * @typedef {Object} Result
 * @property {FormattedGroup[]} ActingGroup
 * @property {FormattedGroup[]} ProductionGroup
 * @property {FormattedGroup[]} WritingGroup
 * @property {FormattedGroup[]} DirectingGroup
 * @property {FormattedGroup[]} CrewGroup
 */

/**
 * @description This utility is used to create the persons credits table
 * @param {CrewInput} data
 * @returns {Result}
 */
const formatGroups = (data) => {
	// Acting group
	let ActingGroup = data.cast;

	ActingGroup = formatGroup(ActingGroup);

	// Production group
	let ProductionGroup = data.crew.filter((crew) => crew.department === 'Production');

	ProductionGroup = formatGroup(ProductionGroup);

	// Writing group
	let WritingGroup = data.crew.filter((crew) => crew.department === 'Writing');

	WritingGroup = formatGroup(WritingGroup);

	// Directing group
	let DirectingGroup = data.crew.filter((crew) => crew.department === 'Directing');

	DirectingGroup = formatGroup(DirectingGroup);

	// Crew group
	let CrewGroup = data.crew.filter((crew) => crew.department === 'Crew');

	CrewGroup = formatGroup(CrewGroup);

	return {
		ActingGroup,
		ProductionGroup,
		WritingGroup,
		DirectingGroup,
		CrewGroup
	};
};

module.exports = formatGroups;
