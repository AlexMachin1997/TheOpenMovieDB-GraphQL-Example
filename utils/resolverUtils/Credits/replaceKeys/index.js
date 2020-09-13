const replaceKey = require('../../../objects/replaceKey');

// TODO: When the schema is updated remove replaceKey

// Any keys which need replacing place them here (Check https://developers.themoviedb.org/3/people/get-person-combined-credits for the schema)
const replaceKeys = (group) => {
	group.map((data) => {
		// Replace first_air_dates (TV credits) with the release_date
		replaceKey(data, 'first_air_date', 'release_date');

		// Replace the name with the original_title key (Movies already have this, but for TV it will need to be converted)
		replaceKey(data, 'name', 'original_title');
	});

	return group;
};

module.exports = replaceKeys;
