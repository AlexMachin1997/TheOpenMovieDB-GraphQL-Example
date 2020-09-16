const axios = require('axios');
const { find, has, isEmpty } = require('lodash');

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

			/*

			Default SHow Object:

			- Passes in any default values or values which are just being assigned to the object

			- If any of the properties need overwriting they can be done so below e.g. releaseDate

			- If any of the properties aren't available then use the defaults e.g. '', 0, []

			*/
			const Show = {
				id: String(data.id) ?? '',
				name: data.name ?? '',
				overview: data.overview ?? '',
				backgroundUrl: data.backdrop_path ?? '',
				posterUrl: data.poster_path ?? '',
				genres: data.genres.length !== 0 ? data.genres : [],
				originalLanguage: data.original_language,
				productionCompanies: [],
				releaseDate: data.first_air_date ?? '',
				voteAverage: String(data.vote_average) ?? '',
				status: data.status ?? '',
				tagline: data.tagline ?? '',
				belongsToCollection: {
					id: 0,
					name: '',
					backgroundUrl: '',
					posterUrl: ''
				},
				runtime: '',

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
			if (has(data, 'name') === false) {
				Show.name = data.original_name;
			}

			// Background url
			// Overwrite the existing backgroundUrl with an absolute image path
			if (has(data, 'backdrop_path') === true) {
				Show.backgroundUrl = generateAbsolutePath(data.backdrop_path);
			}

			// Poster url
			// Overwrite the existing posterUrl with an absolute image path
			if (has(data, 'poster_path') === true) {
				Show.posterUrl = generateAbsolutePath(data.poster_path);
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
			if (has(data, 'production_companies') === true) {
				const productionCompanies = [];

				data.production_companies.forEach((singleCompany) => {
					const company = {
						id: String(singleCompany.id) ?? 0,
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

				Show.productionCompanies = productionCompanies;
			}

			// Release rate
			if (has(data, 'first_air_date') === true) {
				Show.releaseDate = generateYear(data.first_air_date);
			}

			// Vote average
			if (has(data, 'vote_average') === true) {
				Show.voteAverage = toPercentage(data.vote_average);
			}

			// Show Collections
			if (has(data, 'belongs_to_collection') === true) {
				const { belongs_to_collection } = data;

				Show.belongsToCollection.id = String(belongs_to_collection.id) ?? '';
				Show.belongsToCollection.name = belongs_to_collection.name ?? '';
				Show.belongsToCollection.backgroundUrl =
					generateAbsolutePath(belongs_to_collection.backdrop_path) ?? '';
				Show.belongsToCollection.posterUrl =
					generateAbsolutePath(belongs_to_collection.poster_path) ?? '';
			}

			// Runtime
			// When the episode_run_time is avaliable overwrite with a movie/show length e.g. 1hr 2min
			if (has(data, 'episode_run_time') === true) {
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
				const { last_episode_to_air, seasons } = data;

				Show.CurrentSeason.backgroundUrl =
					generateAbsolutePath(last_episode_to_air.still_path) ?? '';

				Show.CurrentSeason.seasonNumber = String(last_episode_to_air.season_number) ?? '';

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
