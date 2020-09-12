const axios = require('axios');
const { find, has, isEmpty } = require('lodash');

const generateSingleItemLookupEndpoint = require('../../utils/generateEndpoints/SingleItemLookup');
const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const generateSearchEndpoint = require('../../utils/generateEndpoints/Search');
const generateYear = require('../../utils/dates/generateYear');
const toPercentage = require('../../utils/maths/toPercentage');
const setValue = require('../../utils/objects/setValue');
const replaceKey = require('../../utils/objects/replaceKey');

// eslint-disable-next-line no-unused-vars
const SearchForAShowResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateSearchEndpoint(args.search, 'tv'));

		const SingleItemLookup = find(response.data.results, (show) => show.id === args.id);

		const Show = {};

		try {
			const SingleItemLookupResponse = await axios.get(
				generateSingleItemLookupEndpoint(SingleItemLookup.id, 'tv')
			);

			const { data } = SingleItemLookupResponse;

			// ID
			if (has(data, 'id') === true) {
				Show.id = data.id;
			}

			// Name
			if (has(data, 'name') === true) {
				Show.name = data.name;
			} else {
				Show.name = data.original_name;
			}

			// Overview
			if (has(data, 'overview') === true) {
				Show.overview = data.overview;
			}

			// Background url
			if (has(data, 'backdrop_path') === true) {
				Show.backgroundUrl = generateAbsolutePath(data.backdrop_path);
			}

			// Poster url
			if (has(data, 'poster_path') === true) {
				Show.posterUrl = generateAbsolutePath(data.poster_path);
			}

			// Genres
			if (has(data, 'genres') === true) {
				Show.genres = data.genres;
			}

			// Homepage
			if (has(data, 'homepage') === true) {
				Show.homepage = data.homepage;
			}

			// Original language
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

			// Status
			if (has(data, 'status') === true) {
				Show.status = data.status;
			}

			// Tagline
			if (has(data, 'tagline') === true) {
				Show.tagline = data.tagline;
			}

			// Show Collections
			if (has(data, 'belongs_to_collection') === true) {
				const belongsToCollection = {
					id: 0,
					name: '',
					backgroundUrl: '',
					posterUrl: ''
				};

				const { belongs_to_collection } = data;

				// id
				if (has(belongsToCollection, 'id') === true) {
					belongsToCollection.id = belongs_to_collection.id;
				}

				// name
				if (has(belongsToCollection, 'name') === true) {
					belongsToCollection.name = belongs_to_collection.name;
				}

				// background url
				if (has(belongsToCollection, 'backdrop_path') === true) {
					belongsToCollection.backgroundUrl = generateAbsolutePath(
						belongs_to_collection.backdrop_path
					);
				}

				// poster url
				if (has(belongsToCollection, 'poster_path') === true) {
					belongsToCollection.posterUrl = generateAbsolutePath(belongs_to_collection.poster_path);
				}
			}

			// Runtime
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

			// Type e.g. scripted
			if (has(data, 'type') === true) {
				Show.type = data.type;
			}

			// Number of episodes
			if (has(data, 'number_of_episodes') === true) {
				Show.numberOfEpisodes = data.number_of_episodes;
			}

			// Number of seasons
			if (has(data, 'number_of_seasons') === true) {
				Show.numberOfSeasons = data.number_of_seasons;
			}

			if (has(data, 'last_episode_to_air') === true && has(data, 'seasons') === true) {
				const CurrentSeasonIndex = data.seasons.findIndex(
					(season) => season.season_number === data.last_episode_to_air.season_number
				);

				const CurrentSeason = {
					backgroundUrl: '',
					seasonNumber: 0,
					year: '',
					episodeCount: 0,
					overview: ''
				};

				const { last_episode_to_air, seasons } = data;

				// Background url
				if (has(last_episode_to_air, 'still_path') === true) {
					CurrentSeason.backgroundUrl = generateAbsolutePath(last_episode_to_air.still_path);
				}

				// Season number
				if (has(last_episode_to_air, 'season_number') === true) {
					CurrentSeason.seasonNumber = last_episode_to_air.season_number;
				}

				// year
				if (has(last_episode_to_air, 'air_date') === true) {
					CurrentSeason.year = generateYear(last_episode_to_air.air_date);
				}

				if (CurrentSeasonIndex !== -1) {
					// Episode count
					if (has(seasons[CurrentSeasonIndex], 'episode_count') === true) {
						CurrentSeason.episodeCount = seasons[CurrentSeasonIndex].episode_count;
					}

					// Overview
					if (has(seasons[CurrentSeasonIndex], 'overview') === true) {
						CurrentSeason.overview = seasons[CurrentSeasonIndex].overview;
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
