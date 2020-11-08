const { isEmpty } = require('lodash');

const generateAbsolutePath = (imageName) => {
	// Empty image check
	if (isEmpty(imageName) === true) {
		return '';
	}

	// Return the absolute path
	return `https://image.tmdb.org/t/p/original${imageName}`;
};

module.exports = generateAbsolutePath;
