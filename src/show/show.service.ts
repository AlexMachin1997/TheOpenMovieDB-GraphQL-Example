/* eslint-disable @typescript-eslint/naming-convention */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { IAggregatedCreditsQueryResponse, ITheOpenMovieDatabaseShow } from './show';
import { EntertainmentService } from '../entertainment/entertainment.service';
import { CurrentSeason, ENTERTAINMENT_TYPES } from '../graphql.schema';
import { Nullable } from '../types/Nullable';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ShowService {
	constructor(
		private readonly httpService: HttpService,
		private readonly utilService: UtilsService,
		private readonly entertainmentService: EntertainmentService,
		private readonly configService: ConfigService
	) {}

	private getCurrentSeason({
		last_episode_to_air = null,
		seasons = []
	}: Pick<ITheOpenMovieDatabaseShow, 'last_episode_to_air' | 'seasons'>): Nullable<CurrentSeason> {
		if (last_episode_to_air !== null && seasons.length === 0) return null;

		const currentSeason = seasons.find(
			(el) => el.season_number === last_episode_to_air?.season_number
		);

		if (typeof currentSeason === 'undefined') return null;

		return {
			backgroundUrl: this.utilService.getFullImageUrlPath(last_episode_to_air?.still_path),
			episodeCount: last_episode_to_air?.season_number ?? 0,
			overview: currentSeason.overview,
			seasonNumber: currentSeason.season_number,
			year: `${new Date(last_episode_to_air?.air_date ?? '').getFullYear()}`
		};
	}

	async getShow(showId: number) {
		const { data } = await firstValueFrom(
			this.httpService.get<ITheOpenMovieDatabaseShow>(
				`https://api.themoviedb.org/3/tv/${showId}?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${this.configService.get('THE_OPEN_MOVIE_DATABASE_API_KEY')}`
					}
				}
			)
		);

		return {
			// Common "entertainment" properties
			id: data.id,
			name: data.name.length === 0 ? data.original_name : data.name,
			overview: data.overview,
			backgroundUrl: this.utilService.getFullImageUrlPath(data.backdrop_path),
			posterUrl: this.utilService.getFullImageUrlPath(data.poster_path),
			genres: data.genres,
			homepage: data.homepage,
			originalLanguage: this.entertainmentService.getOriginalLanguage({
				originalLanguage: data.original_language,
				spokenLanguages: data.spoken_languages
			}),
			productionCompanies: data.production_companies.map((productionCompany) => ({
				id: productionCompany.id,
				logo: this.utilService.getFullImageUrlPath(productionCompany.logo_path),
				name: productionCompany.name
			})),
			releaseDate: data.first_air_date,
			voteAverage: data.vote_average,
			status: data.status,
			tagline: data.tagline,
			belongsToCollection: this.entertainmentService.getCollection(data.belongs_to_collection),
			currentSeason: this.getCurrentSeason({
				last_episode_to_air: data.last_episode_to_air,
				seasons: data.seasons
			})
		};
	}

	async getReview(showId: number) {
		return this.entertainmentService.getReview({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getCastAggregatedCredits(showId: number) {
		const { data } = await firstValueFrom(
			this.httpService.get<IAggregatedCreditsQueryResponse>(
				`https://api.themoviedb.org/3/tv/${showId}/aggregate_credits?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${this.configService.get('THE_OPEN_MOVIE_DATABASE_API_KEY')}`
					}
				}
			)
		);

		return data;
	}

	async getTopBilledCast(showId: number) {
		// Get the top billed cast members
		const topBilledCast = await this.entertainmentService.getTopBilledCast({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});

		// Since the episode count isn't available via getTopBilledCast perform an additional lookup to get the additional credit
		// data like a list of the users roles for the particular show being queried
		const aggregatedCredits = await this.getCastAggregatedCredits(showId);

		return topBilledCast.map((topBilledCastMember) => {
			// Find the cast members credits data, found via the aggregate_credits endpoint
			const aggregatedCredit = aggregatedCredits.cast.find(
				(el) => el.id === topBilledCastMember.id
			);

			// If the aggregatedCredit is available then total up the cast members episode count
			if (typeof aggregatedCredit !== 'undefined') {
				return {
					...topBilledCastMember,
					episodeCount: aggregatedCredit.roles.reduce(
						(total, role) => total + role.episode_count,
						0
					)
				};
			}

			return {
				...topBilledCastMember,
				episodeCount: 0
			};
		});
	}

	async getFeaturedCrewMembers(showId: number) {
		return this.entertainmentService.getFeaturedCrewMembers({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getKeywords(showId: number) {
		return this.entertainmentService.getKeywords({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getSocials(showId: number) {
		return this.entertainmentService.getSocials({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getYouTubeVideo(showId: number) {
		return this.entertainmentService.getYouTubeVideo({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}
}
