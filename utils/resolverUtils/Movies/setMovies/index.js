const formatDate = require('../../../dates/custom');
const toPercentage = require('../../../maths/toPercentage');
const generateAbsolutePath = require('../../../images/generateAbsolutePath');

/**
 *
 * A Movie
 * @typedef {Object} Movie
 * @property {number} id - The id of the movie
 * @property {string} name - The name of the movie
 * @property {string} overview - The overview of the movie
 * @property {string} backgroundUrl - The background image for the movie
 * @property {string} posterUrl - The poster image for the movie
 * @property {number[]} genres - The genre id's for the movie
 * @property {string} releaseDate - The release date of the movie
 * @property {string} originalLanguage - The original language the movie was produced in e.g. en
 * @property {number} voteAverage - The average rating for the movie e.g. 90
 *
 */

/**
 * @typedef {Object} IncomingMovieObject
 * @property {number} popularity The original
 * @property {number[]} genre_ids - The original genre ids
 * @property {string} backdrop_path - The source for the backgroundUrl
 * @property {string} poster_path - The source for the posterUrl
 * @property {string} original_language - The source for the originalLanguage
 * @property {number} vote_average - The source for the voteAverage
 * @property {number} vote_count The original
 * @property {boolean} video The original
 * @property {boolean} adult The original
 * @property {string} original_title The original
 * @property {string} title The original
 * @property {string} release_date The original
 * @property {number} id The original
 * @property {string} overview The original
 */

/**
 * @description A utility function for creating a custom movie object and pushing it to the Movies array.
 *
 * @param {IncomingMovieObject[]} movies
 * @return {Movie[]} Returns an array of movies
 */
const setMovies = (movies) => {
	/**
	 * Array of movies
	 * @type {Movie[]}
	 */
	const Movies = [];

	if (movies.length === 0) return [];

	// Loop through each movie and created a new custom object which matches the Movies schema
	movies.forEach(
		/**
		 * @param {IncomingMovieObject}
		 */

		(movie) => {
			const Movie = {
				id: String(movie.id) ? movie.id : 0, // Id is cast to a string to perform truthy/falsy checks
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
		}
	);

	// Return the new array to the GraphQL resolver
	return Movies;
};

module.exports = setMovies;
