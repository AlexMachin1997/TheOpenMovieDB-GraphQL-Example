const reorderGroupByReleaseDate = require('../reorderGroupByReleaseDate');
const orderGroupByYear = require('../reorderGroupByYear');
const filterGroupByMediaType = require('../filterGroupByMediaType');
const replaceKeys = require('../replaceKeys');
const setValues = require('../setValues');

const formatGroup = (singleGroup, mediaType) => {
	let group = singleGroup;

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
