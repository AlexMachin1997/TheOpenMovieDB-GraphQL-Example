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
 * These properties are marked as optional as they are only needed to set the above values, but they need to part of the typeDef anyway
 * @property {number[]} [genre_ids] - The original genre ids
 * @property {string} [backdrop_path] - The source for the backgroundUrl
 * @property {string} [poster_path] - The source for the posterUrl
 * @property {string} [first_air_date] - The source for the releaseDate
 * @property {string} [original_language] - The source for the originalLanguage
 * @property {string} [vote_average] - The source for the voteAverage
 * @property {string} [original_name] - Used only when the name isn't available
 */

/**
 * @description A utility function for creating a custom movie object and pushing it to the Movies array.
 *
 * @param {Movie[]} movies
 * @return {Movie[]} Returns an array of movies
 */
const setMovies = (movies) => {
	/**
	 * Array of movies
	 * @type {Array.<Object>}
	 */
	const Movies = [];

	if (Movies.length === 0) return [];

	// Loop through each movie and created a new custom object which matches the Movies schema
	movies.forEach(
		/**
		 * @param {Movie}
		 */

		(movie) => {
			/**
			 * @type {Movie}
			 */
			const Movie = {
				id: String(movie.id) ? movie.id : 0, // Id is cast to a string to perform truthy/falsy checks
				name: movie.name ?? '',
				overview: movie.overview ?? '',
				backgroundUrl: generateAbsolutePath(movie.backdrop_path) ?? '',
				posterUrl: generateAbsolutePath(movie.poster_path) ?? '',
				genres: movie.genre_ids.length !== 0 ? movie.genre_ids : [], // The array length is checked, an array is not a falsy value
				releaseDate: formatDate(movie.first_air_date, 'MMMM Do, YYYY') ?? '',
				originalLanguage: movie.original_language ?? '',
				voteAverage: toPercentage(movie.vote_average) ?? 0
			};

			// When the name is blank
			if (Movie.name === '') {
				Movie.name = movie.original_name;
			}

			// Pushes the current object to the Movies array
			Movies.push(Movie);
		}
	);

	// Return the new array to the GraphQL resolver
	return Movies;
};

module.exports = setMovies;
