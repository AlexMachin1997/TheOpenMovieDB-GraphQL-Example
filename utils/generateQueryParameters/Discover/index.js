const { isEmpty } = require('lodash');

/**
 * @typedef {Object} Arguments
 * @property {string} sortBy
 * @property {string} genres
 * @property {string} certifications
 * @property {string} userscore
 * @property {string} runtime
 */

/**
 * @description This utility creates the discover endpoint url
 * @param {string} discoverURL
 * @param {Arguments} args
 * @returns {string}
 */
const generateQueryParameter = (discoverURL, args) => {
	// Query parameters supported within TheOpenMovieDB Discover endpoint
	const { sortBy, genres, certifications, userscore, runtime } = args;

	// Base Url
	let url = discoverURL;

	// Sort by query
	if (isEmpty(sortBy) === false) {
		url += `&sort_by=${sortBy}`;
	}

	// Generes query
	if (isEmpty(genres) === false) {
		// Genres query e.g. &with_genres=14&with_genres=15
		let genresQuery = '';

		// Split the numbers provided and for each number append it to genresQuery with a query parameter
		genres.split(',').map((data) => {
			genresQuery += `&with_genres=${data}`;
		});

		// Append the formatted genres query to the API URL
		url += genresQuery;
	}

	// Certifications query
	if (isEmpty(certifications) === false) {
		// Split the values passed in and for each certification provided join it with |
		const certs = certifications.split(',').join('|');
		url += `&certification=${certs}`;
	}

	// Userscore query
	if (isEmpty(userscore) === false) {
		// Add the query parameter required for the vote count
		url += `&vote_count.gte=${userscore}`;
	}

	// Runtime query
	if (isEmpty(runtime) === false) {
		url += `&with_runtime.gte=${runtime}`;
	}

	// Encode the created url
	const encodedURL = encodeURI(url);

	//  Return the new url back to the resolver
	return encodedURL;
};

module.exports = generateQueryParameter;
