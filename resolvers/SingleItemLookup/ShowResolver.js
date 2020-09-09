const axios = require('axios');
const { find, has, forEach } = require('lodash');

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

		try {
			const SingleItemLookupResponse = await axios.get(
				generateSingleItemLookupEndpoint(SingleItemLookup.id, 'tv')
			);

			const { data } = SingleItemLookupResponse;

			if (has(data, 'last_air_date') === true) {
				replaceKey(data, 'first_air_date', 'releaseDate');
				setValue(data, 'releaseDate', generateYear(data.releaseDate));
			}

			if (has(data, 'created_by') === true) {
				forEach(data.created_by, (creator) => {
					if (has(creator, 'profile_path') === true) {
						setValue(creator, 'profile_path', generateAbsolutePath(creator.profile_path));
					}
				});
			}

			if (has(data, 'last_episode_to_air') === true && has(data, 'seasons') === true) {
				const CurrentSeasonIndex = data.seasons.findIndex(
					(season) => season.season_number === data.last_episode_to_air.season_number
				);

				// eslint-disable-next-line camelcase
				const { last_episode_to_air, seasons } = data;

				const currentSeason = {
					image: setValue(
						last_episode_to_air,
						'still_path',
						generateAbsolutePath(last_episode_to_air.still_path)
					),
					season_number: setValue(
						last_episode_to_air,
						'season_number',
						last_episode_to_air.season_number
					),
					year: setValue(
						last_episode_to_air,
						'air_date',
						generateYear(last_episode_to_air.air_date)
					),
					episode_count: setValue(
						seasons[CurrentSeasonIndex],
						'episode_count',
						seasons[CurrentSeasonIndex].episode_count
					),
					overview: setValue(
						seasons[CurrentSeasonIndex],
						'overview',
						seasons[CurrentSeasonIndex].overview
					)
				};

				data.current_season = currentSeason;
			}

			if (has(data, 'backdrop_path') === true) {
				setValue(data, 'backdrop_path', generateAbsolutePath(data.backdrop_path));
			}

			if (has(data, 'poster_path') === true) {
				setValue(data, 'poster_path', generateAbsolutePath(data.poster_path));
			}

			if (has(data, 'vote_average') === true) {
				setValue(data, 'vote_average', toPercentage(data.vote_average));
			}

			if (has(data, 'networks') === true) {
				forEach(data.networks, (network) => {
					if (has(network, 'logo_path') === true) {
						setValue(network, 'logo_path', generateAbsolutePath(network.logo_path));
					}
				});
			}

			return data;
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
