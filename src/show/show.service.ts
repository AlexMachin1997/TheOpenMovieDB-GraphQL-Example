/* eslint-disable @typescript-eslint/naming-convention */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { TheOpenMovieDatabaseShow } from './show';
import { EntertainmentService } from '../entertainment/entertainment.service';
import {
	Cast,
	Crew,
	CurrentSeason,
	ENTERTAINMENT_TYPES,
	Keyword,
	Review,
	Show,
	Social
} from '../graphql.schema';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ShowService {
	constructor(
		private readonly httpService: HttpService,
		private readonly utilService: UtilsService,
		private readonly entertainmentService: EntertainmentService
	) {}

	private getCurrentSeason({
		last_episode_to_air = null,
		seasons = []
	}: Pick<TheOpenMovieDatabaseShow, 'last_episode_to_air' | 'seasons'>): CurrentSeason | null {
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

	async getShow(showId: number): Promise<Show> {
		const { data } = await firstValueFrom(
			this.httpService.get<TheOpenMovieDatabaseShow>(
				`https://api.themoviedb.org/3/tv/${showId}?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization:
							// eslint-disable-next-line max-len
							'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDMwNWQxNmE1ZThkN2E3ZWMwZmM2NTk5MzZiY2EzMCIsInN1YiI6IjViMzE0MjQ1OTI1MTQxM2M5MTAwNTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iqdLKFCSgeWG3SYso7Rqj297FORviPf9hDdn2kKygTA'
					}
				}
			)
		);

		const show: Show = {
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

		return show;
	}

	async getReview(showId: number): Promise<Review | null> {
		return this.entertainmentService.getReview({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getTopBilledCast(showId: number): Promise<Cast[] | null> {
		return this.entertainmentService.getTopBilledCast({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getFeaturedCrewMembers(showId: number): Promise<Crew[] | null> {
		return this.entertainmentService.getFeaturedCrewMembers({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getKeywords(showId: number): Promise<Keyword[] | null> {
		return this.entertainmentService.getKeywords({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getSocials(showId: number): Promise<Social> {
		return this.entertainmentService.getSocials({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}

	async getTrailerUrl(showId: number): Promise<string | null> {
		return this.entertainmentService.getTrailerUrl({
			entertainmentId: showId,
			entertainmentType: ENTERTAINMENT_TYPES.TV
		});
	}
}
