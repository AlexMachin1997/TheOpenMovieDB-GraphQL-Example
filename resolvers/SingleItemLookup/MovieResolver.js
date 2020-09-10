const axios = require('axios');
const { find, has, isEmpty } = require('lodash');

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

			const Movie = {};

			// ID
			Movie.id = data.id;

			// Name
			if (has(data, 'title') === true) {
				Movie.name = data.title;
			} else {
				Movie.name = data.original_title;
			}

			// Overview
			if (has(data, 'overview') === true) {
				Movie.overview = data.overview;
			}

			// Background url
			if (has(data, 'backdrop_path') === true) {
				Movie.backgroundUrl = generateAbsolutePath(data.backdrop_path);
			}

			// Poster url
			if (has(data, 'poster_path') === true) {
				Movie.posterUrl = generateAbsolutePath(data.poster_path);
			}

			// Genres
			if (has(data, 'genres') === true) {
				Movie.genres = data.genres;
			}

			// Homepage
			if (has(data, 'homepage') === true) {
				Movie.homepage = data.homepage;
			}

			// Original language
			if (
				has(data, 'original_language') === true &&
				has(data, 'spoken_languages') === true &&
				data.spoken_languages.length !== 0
			) {
				data.originalLanguage = data.spoken_languages.filter(
					(language) => language.name === data.original_language
				);
			}

			// Production companies
			if (has(data, 'production_companies') === true) {
				const productionCompanies = [];

				data.production_companies.forEach((singleCompany) => {
					const company = {
						id: singleCompany.id ?? '',
						logo: singleCompany.logo_path ?? '',
						name: singleCompany.name ?? ''
					};

					// Check if the logo path is not empty
					if (isEmpty(company.logo) === false) {
						company.logo = generateAbsolutePath(company.logo);
					}

					// Push the new production company object to the productionCompanies array
					productionCompanies.push(company);
				});

				Movie.productionCompanies = productionCompanies;
			}

			// Release rate
			if (has(data, 'release_date') === true) {
				Movie.releaseDate = generateYear(data.release_date);
			}

			// Vote average
			if (has(data, 'vote_average') === true) {
				Movie.voteAverage = toPercentage(data.vote_average);
			}

			// Status
			if (has(data, 'status') === true) {
				Movie.status = data.status;
			}

			// Tagline
			if (has(data, 'tagline') === true) {
				Movie.tagline = data.tagline;
			}

			// Movie Collections
			if (has(data, 'belongs_to_collection') === true) {
				Movie.belongsToCollection = {
					id: data.belongs_to_collection.id,
					name: data.belongs_to_collection.name,
					backgroundUrl: generateAbsolutePath(data.belongs_to_collection.backdrop_path),
					posterUrl: generateAbsolutePath(data.belongs_to_collection.poster_path)
				};
			}

			// Runtime
			if (has(data, 'runtime') === true) {
				const hours = Math.floor(data.runtime / 60);
				const minutes = data.runtime % 60;
				Movie.runtime = `${hours}h ${minutes}m`;
			}

			/*
				Movie Specific fields
			*/

			// Budget
			if (has(data, 'budget') === true) {
				Movie.budget = `$${data.budget.toLocaleString()}`;
			}

			// Revenue
			if (has(data, 'revenue') === true) {
				Movie.revenue = `$${data.revenue.toLocaleString()}`;
			}

			return Movie;
		} catch (err) {
			console.log(`The /Movie endpoint failed`);
			return err.response;
		}
	} catch (err) {
		console.log('The /Search endpoint failed');
		return err.response;
	}
};

module.exports = SearchForAMovieResolver;
