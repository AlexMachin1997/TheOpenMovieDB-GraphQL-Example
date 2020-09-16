// const { has } = require('lodash');

const generateAbsolutePath = require('../../../images/generateAbsolutePath');
const formatDate = require('../../../dates/custom');
const toPercentage = require('../../../maths/toPercentage');

/**
 *
 * @param {array} shows
 */
const setShows = (shows) => {
	const Shows = [];

	if (shows.length === 0) return [];

	shows.forEach((show) => {
		const Show = {
			id: String(show.id) ? show.id : 0, // Id is cast to a string to perform truthy/falsy checks
			name: show.name ?? '',
			overview: show.overview ?? '',
			backgroundUrl: generateAbsolutePath(show.backdrop_path) ?? '',
			posterUrl: generateAbsolutePath(show.poster_path) ?? '',
			genres: show.genre_ids.length !== 0 ? show.genre_ids : [], // The array length is checked, an array is not a falsy value
			releaseDate: formatDate(show.first_air_date, 'MMMM Do, YYYY') ?? '',
			originalLanguage: show.original_language ?? '',
			voteAverage: toPercentage(show.vote_average) ?? ''
		};

		// When the name is blank
		if (Show.name === '') {
			Show.name = show.original_name;
		}

		// Pushes the current object to the Shows array
		Shows.push(Show);
	});

	// Return the new array to the GraphQL resolver
	return Shows;
};

module.exports = setShows;
