const { has } = require('lodash');

const formatDate = require('../../../dates/custom');
const toPercentage = require('../../../maths/toPercentage');
const generateAbsolutePath = require('../../../images/generateAbsolutePath');

const setMovies = (movies) => {
	// Create the Movies array
	const Movies = [];

	// Loop through each movie and created a new custom object which matches the Movies schema
	movies.forEach((movie) => {
		const Movie = {
			id: String(movie.id) ?? 0, // Id is cast to a string to perform truthy/falsy checks
			name: movie.name ?? '',
			overview: movie.overview ?? '',
			backgroundUrl: movie.backdrop_path ?? '',
			posterUrl: movie.poster_path ?? '',
			genres: movie.genre_ids.length !== 0 ? movie.genre_ids : [], // The array length is checked, an array is not a falsy value
			releaseDate: movie.release_date ?? '',
			originalLanguage: movie.original_language ?? '',
			voteAverage: movie.vote_average ?? '',
			popularity: String(movie.popularity) ?? 0 // popularity  is cast to a string to perform truthy/falsy checks
		};

		// Id
		if (has(movie, 'id') === true) {
			Movie.id = movie.id;
		}

		// Name
		if (has(movie, 'title') === true) {
			Movie.name = movie.title;
		} else {
			Movie.name = movie.original_title;
		}

		// Overview
		if (has(movie, 'overview') === true) {
			Movie.overview = movie.overview;
		}

		// Background url
		if (has(movie, 'backdrop_path') === true) {
			Movie.backgroundUrl = generateAbsolutePath(movie.backdrop_path);
		}

		// Poster url
		if (has(movie, 'poster_path') === true) {
			Movie.posterUrl = generateAbsolutePath(movie.poster_path);
		}

		// Genres
		if (has(movie, 'genre_ids') === true) {
			Movie.genres = movie.genre_ids;
		}

		// Release rate
		if (has(movie, 'release_date') === true) {
			Movie.releaseDate = formatDate(movie.release_date, 'MMMM Do, YYYY');
		}

		// Original language
		if (has(movie, 'original_language') === true) {
			Movie.originalLanguage = movie.original_language;
		}

		// Vote average
		if (has(movie, 'vote_average') === true) {
			Movie.voteAverage = toPercentage(movie.vote_average);
		}

		if (has(movie, 'popularity') === true) {
			Movie.popularity = movie.popularity;
		}

		// Pushes the current object to the Movies array
		Movies.push(Movie);
	});

	// Return the new array to the GraphQL resolver
	return Movies;
};

module.exports = setMovies;
