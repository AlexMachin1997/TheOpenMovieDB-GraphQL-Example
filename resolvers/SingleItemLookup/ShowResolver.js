const axios = require('axios');
const { find, has } = require('lodash');

const generateSingleItemLookupEndpoint = require('../../utils/generateEndpoints/SingleItemLookup');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const generateSearchEndpoint = require('../../utils/generateEndpoints/Search');
const generateYear = require('../../utils/dates/generateYear');
const toPercentage = require('../../utils/maths/toPercentage');

// eslint-disable-next-line no-unused-vars
const SearchForAShowResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateSearchEndpoint(args.search, 'tv'));

		const SingleItemLookup = find(response.data.results, (show) => show.id === args.id);
		try {
			const SingleItemLookupResponse = await axios.get(
				generateSingleItemLookupEndpoint(SingleItemLookup.id, 'tv')
			);

			const { data } = SingleItemLookupResponse;

			const releaseDate = generateYear(data.first_air_date);
			const voteAverage = toPercentage(data.vote_average);

			const Show = {
				id: String(data.id) ? data.id : 0,
				name: data.name ?? '',
				overview: data.overview ?? '',
				backgroundUrl: generateAbsolutePath(data.backdrop_path) ?? '',
				posterUrl: generateAbsolutePath(data.poster_path) ?? '',
				genres: data.genres.length !== 0 ? data.genres : [],
				homepage: data.homepage ?? '',
				originalLanguage: data.original_language,
				productionCompanies: [],
				releaseDate: releaseDate !== '-' ? releaseDate : '',
				voteAverage: String(voteAverage) ? voteAverage : '',
				status: data.status ?? '',
				tagline: data.tagline ?? '',
				belongsToCollection: {
					id: 0,
					name: '',
					backgroundUrl: '',
					posterUrl: ''
				},
				runtime: data.episode_run_time ?? '',

				// Show Specific fields
				type: data.type ?? '',
				numberOfEpisodes: String(data.number_of_episodes) ?? 0,
				numberOfSeasons: String(data.number_of_seasons) ?? 0,
				CurrentSeason: {
					backgroundUrl: '',
					seasonNumber: 0,
					year: '',
					episodeCount: 0,
					overview: ''
				}
			};

			// Name
			// When the name isn't available try to use the
			if (Show.name === '') {
				Show.name = data.original_name;
			}

			// Original language
			// If the below conditions are met overwrite the default originalLanguage to something meaningful e.g. "en" -> "English"
			if (
				has(data, 'original_language') === true &&
				has(data, 'languages') === true &&
				data.languages.length !== 0
			) {
				// Finds the first language which matches the original_Language assigned to the Show
				const language = data.languages.find((el) => el === data.original_language);

				Show.originalLanguage = language;
			}

			// Production companies
			// When the production company is available and there isn't 0 companies
			if (has(data, 'production_companies') === true && data.production_companies.length !== 0) {
				const productionCompanies = [];

				data.production_companies.forEach((singleCompany) => {
					const company = {
						id: String(singleCompany.id) ? singleCompany.id : 0,
						logo: generateAbsolutePath(singleCompany.logo_path) ?? '',
						name: singleCompany.name ?? ''
					};

					// Push the new production company object to the productionCompanies array
					productionCompanies.push(company);
				});

				Show.productionCompanies = productionCompanies;
			}

			// Show Collections
			// When the belongs_to_collection is available update the default values
			if (has(data, 'belongs_to_collection') === true) {
				// eslint-disable-next-line camelcase
				const { belongs_to_collection } = data;

				/*

				Setting the collection values:

				- Numbers are converted to string to check to see if they are truthy or false value

				- When a number has been converted make sure to return it as a number

				*/

				// Sets the collection id
				Show.belongsToCollection.id = String(belongs_to_collection.id)
					? belongs_to_collection.id
					: '';

				// Sets the collection name
				Show.belongsToCollection.name = belongs_to_collection.name ?? '';

				// Sets the backgroundUrl (Used as the background for the collection card)
				Show.belongsToCollection.backgroundUrl =
					generateAbsolutePath(belongs_to_collection.backdrop_path) ?? '';

				// Sets the posterUrl (Not used in the collection card, but it could be eventually)
				Show.belongsToCollection.posterUrl =
					generateAbsolutePath(belongs_to_collection.poster_path) ?? '';
			}

			// Runtime
			// When the runtime is available overwrite with a movie/show length e.g. 1hr 2min
			if (Show.runtime !== '') {
				// Select the longest runtime
				const runtime = Math.max(...data.episode_run_time);

				const hours = Math.floor(runtime / 60);
				const minutes = runtime % 60;
				Show.runtime = `${hours}h ${minutes}m`;
			}

			/*

			Show specific fields

			*/

			if (has(data, 'last_episode_to_air') === true && has(data, 'seasons') === true) {
				// eslint-disable-next-line camelcase
				const { last_episode_to_air, seasons } = data;

				Show.CurrentSeason.backgroundUrl =
					generateAbsolutePath(last_episode_to_air.still_path) ?? '';

				Show.CurrentSeason.seasonNumber = String(last_episode_to_air.season_number)
					? last_episode_to_air.season_number
					: 0;

				Show.CurrentSeason.year = generateYear(last_episode_to_air.air_date) ?? '';

				/*

				CurrentSeason functionality

				To get the episodeCount and overview we need the CurrentSeasonIndex, this requires additional checks to be put in place.

				Checks put in place:

				- To ensure the index is found we check to see if the index is available ie not -1 which findIndex returns.

				- Once we have the index we then need to check if the properties actual exist in the object, if they are available set them otherwise the default values will be used (Show object)

				*/
				const CurrentSeasonIndex = seasons.findIndex(
					(season) => season.season_number === data.last_episode_to_air.season_number
				);

				if (CurrentSeasonIndex !== -1) {
					// Episode count
					if (has(seasons[CurrentSeasonIndex], 'episode_count') === true) {
						Show.CurrentSeason.episodeCount = seasons[CurrentSeasonIndex].episode_count;
					}

					// Overview
					if (has(seasons[CurrentSeasonIndex], 'overview') === true) {
						Show.CurrentSeason.overview = seasons[CurrentSeasonIndex].overview;
					}
				}
			}

			return Show;
		} catch (err) {
			console.log(`The /tv endpoint failed`);
			console.log(err);
			return err.response;
		}
	} catch (err) {
		console.log('The /Search endpoint failed');
		console.log(err);
		return err.response;
	}
};

module.exports = SearchForAShowResolver;
