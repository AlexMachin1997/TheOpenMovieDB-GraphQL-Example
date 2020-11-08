const axios = require('axios');
const { find, has } = require('lodash');

const generateSingleItemLookupEndpoint = require('../../utils/generateEndpoints/SingleItemLookup');
const generateSearchEndpoint = require('../../utils/generateEndpoints/Search');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const toPercentage = require('../../utils/maths/toPercentage');
const generateYear = require('../../utils/dates/generateYear');

// eslint-disable-next-line no-unused-vars
const SearchForAMovieResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateSearchEndpoint(args.search, 'movie'));

		const SingleMovie = find(response.data.results, (movie) => movie.id === args.id);

		try {
			const SingleMovieResponse = await axios.get(
				generateSingleItemLookupEndpoint(SingleMovie.id, 'movie')
			);

			const { data } = SingleMovieResponse;

			const releaseDate = generateYear(data.release_date);
			const voteAverage = toPercentage(data.vote_average);

			const Movie = {
				id: data.id ? data.id : 0,
				name: data.title || '',
				overview: data.overview || '',
				backgroundUrl: generateAbsolutePath(data.backdrop_path) || '',
				posterUrl: generateAbsolutePath(data.poster_path) || '',
				genres: data.genres.length !== 0 ? data.genres : [],
				homepage: data.homepage || '',
				originalLanguage: data.original_language,
				productionCompanies: [],
				releaseDate: releaseDate !== '-' ? releaseDate : '',
				voteAverage: String(voteAverage) ? voteAverage : '',
				status: data.status || '',
				tagline: data.tagline || '',
				belongsToCollection: {
					id: 0,
					name: '',
					backgroundUrl: '',
					posterUrl: ''
				},
				runtime: data.runtime || '',

				// Movie Specific fields
				budget: data.budget ? `$${data.budget.toLocaleString()}` : '-',
				revenue: data.revenue ? `$${data.revenue.toLocaleString()}` : '-'
			};

			// Name
			if (Movie.name === '') {
				Movie.name = data.original_title;
			}

			// Original language
			if (
				Movie.originalLanguage !== '' &&
				has(data, 'spoken_languages') === true &&
				data.spoken_languages.length !== 0
			) {
				// Finds the first language which matches the original_Language assigned to the movie
				const language = data.spoken_languages.find(
					/**
					 * @param {Object} el
					 */
					(el) => el.iso_639_1 === data.original_language
				);

				Movie.originalLanguage = language.name;
			}

			// Production companies
			// When the production company is available and there isn't 0 companies
			if (has(data, 'production_companies') === true) {
				const productionCompanies = [];

				data.production_companies.forEach((singleCompany) => {
					const company = {
						id: String(singleCompany.id) ? singleCompany.id : 0,
						logo: generateAbsolutePath(singleCompany.logo_path) || '',
						name: singleCompany.name || ''
					};

					// Push the new production company object to the productionCompanies array
					productionCompanies.push(company);
				});

				Movie.productionCompanies = productionCompanies;
			}

			// Show Collections
			// When the belongs_to_collection is available and the collection is not null update the default values
			if (has(data, 'belongs_to_collection') === true && data.belongs_to_collection !== null) {
				// eslint-disable-next-line camelcase
				const { belongs_to_collection } = data;

				/*

				Setting the collection values:

				- Numbers are converted to string to check to see if they are truthy or false value

				- When a number has been converted make sure to return it as a number

				*/

				// Sets the collection id
				Movie.belongsToCollection.id = String(belongs_to_collection.id)
					? belongs_to_collection.id
					: '';

				// Sets the collection name
				Movie.belongsToCollection.name = belongs_to_collection.name || '';

				// Sets the backgroundUrl (Used as the background for the collection card)
				Movie.belongsToCollection.backgroundUrl =
					generateAbsolutePath(belongs_to_collection.backdrop_path) || '';

				// Sets the posterUrl (Not used in the collection card, but it could be eventually)
				Movie.belongsToCollection.posterUrl =
					generateAbsolutePath(belongs_to_collection.poster_path) || '';
			}

			// Runtime
			// When the runtime is available overwrite with a movie/show length e.g. 1hr 2min
			if (Movie.runtime !== '') {
				const hours = Math.floor(data.runtime / 60);
				const minutes = data.runtime % 60;
				Movie.runtime = `${hours}h ${minutes}m`;
			}

			return Movie;
		} catch (err) {
			console.log(`The /Movie endpoint failed`);
			console.log(err);

			return err.response;
		}
	} catch (err) {
		console.log('The /Search endpoint failed');
		console.log(err.message);
		return err.response;
	}
};

module.exports = SearchForAMovieResolver;
