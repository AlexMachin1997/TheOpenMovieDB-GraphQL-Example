const formatDate = require('../../../dates/custom');
const toPercentage = require('../../../maths/toPercentage');
const generateAbsolutePath = require('../../../images/generateAbsolutePath');

/**
 * @typedef {Object} IncomingMovieObject
 * @property {number} popularity Stores the popularity of the movie e.g. 45.55324
 * @property {number[]} genre_ids Stores the genre id's associated to the movie e.g. [3333]
 * @property {string} backdrop_path Stores the background path for the movie (Only a partial path)
 * @property {string} poster_path Stores the poster path for the movie (Only a partial path)
 * @property {string} original_language - Stores the original language for the movie e.g. En
 * @property {number} vote_average - Stores the vote average for the movie e.g. 45.553323
 * @property {number} vote_count Stores the vote count for the movie e.g. 34,000
 * @property {boolean} video Stores the video property (Not sure what this does actually :D )
 * @property {boolean} adult Stores the adult property (Not sure what this does actually :D )
 * @property {string} original_title Stores the original title for the movie e.g. Mad Max: Fury Road
 * @property {string} title Stores the title for the movie e.g. Mad Max: Fury Road
 * @property {string} release_date Stores the release date for the movie  e.g. 09-20-2015
 * @property {number} id Stores the id for the movie e.g. 33243243232
 * @property {string} overview Stores the overview for the movie e.g. Awesome Movie Description
 */

/**
 *
 * A Movie
 * @typedef {Object} Movie
 * @property {number} id Stores the new id for the movie
 * @property {string} name Stores the name for the movie (It's either the title or the original_title)
 * @property {string} overview Stores the overview for the movie e.g. Awesome movie description
 * @property {string} backgroundUrl Stores an absolute path to the background image for the movie
 * @property {string} posterUrl Stores the absolute path to the poster image for the movie
 * @property {number[]} genres Stores the genre ids associated to the movie
 * @property {string} releaseDate Stores the release year of the movie (Transformed via a date util)
 * @property {string} originalLanguage Stores the original language for the movie e.g. en
 * @property {number} voteAverage Stores the average vote to zero decimal places e.g. 40, used to display a rating on the FE
 *
 */

/**
 * @description This utility is used to create a new movie array, this is used in the Upcoming, TopRated, Recommendations, Popular, NowPlaying and Discover resolvers.
 * @param {IncomingMovieObject[]} movies
 * @returns {Movie[]} Returns an array of movies
 */
const setMovies = (movies) => {
	/**
	 * @type {Movie[]}
	 * @description  This is the new Movie object, the properties must match the properties defined in the schema
	 */
	const Movies = [];

	// Check to see if any movies exist
	if (movies.length === 0) return [];

	// Loop through each movie and created a new custom Movie object
	movies.forEach((movie) => {
		const Movie = {
			id: movie.id ? movie.id : 0, // Id is cast to a string to perform truthy/falsy checks
			name: movie.title ?? '',
			overview: movie.overview ?? '',
			backgroundUrl: generateAbsolutePath(movie.backdrop_path) ?? '',
			posterUrl: generateAbsolutePath(movie.poster_path) ?? '',
			genres: movie.genre_ids.length !== 0 ? movie.genre_ids : [], // The array length is checked, an array is not a falsy value
			releaseDate: formatDate(movie.release_date, 'MMMM Do, YYYY') ?? '',
			originalLanguage: movie.original_language ?? '',
			voteAverage: toPercentage(movie.vote_average) ?? 0
		};

		// When the name is blank
		if (Movie.name === '') {
			Movie.name = movie.original_title;
		}

		// Pushes the current object to the Movies array
		Movies.push(Movie);
	});

	// Return the new array to the GraphQL resolver
	return Movies;
};

module.exports = setMovies;
