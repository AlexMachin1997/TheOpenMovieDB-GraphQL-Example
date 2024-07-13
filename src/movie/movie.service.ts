/* eslint-disable import/extensions */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { TheOpenMovieDatabaseMovie } from './movie';
import { EntertainmentService } from '../entertainment/entertainment.service';
import { ENTERTAINMENT_TYPES } from '../graphql.schema';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class MovieService {
	constructor(
		private readonly httpService: HttpService,
		private readonly utilService: UtilsService,
		private readonly entertainmentService: EntertainmentService,
		private readonly configService: ConfigService
	) {}

	private getMovieRunTime(runtime: number): `${number}h ${number}m` {
		const numberOfHours = Math.floor(runtime / 60);
		const numberOfMinutes = runtime % 60;
		return `${numberOfHours}h ${numberOfMinutes}m`;
	}

	async getMovie(movieId: number) {
		const { data } = await firstValueFrom(
			this.httpService.get<TheOpenMovieDatabaseMovie>(
				`https://api.themoviedb.org/3/movie/${movieId}?language=en-U`,
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
			name: data.title === '' || data.title.length === 0 ? data.original_title : data.title,
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
			releaseDate: data.release_date,
			voteAverage: data.vote_average,
			status: data.status,
			tagline: data.tagline,
			belongsToCollection: this.entertainmentService.getCollection(data.belongs_to_collection),

			// Movie specific properties
			runtime: this.getMovieRunTime(data.runtime),
			budget: this.utilService.convertNumberToLocalCurrency(data.budget),
			revenue: this.utilService.convertNumberToLocalCurrency(data.revenue)
		};
	}

	async getReview(movieId: number) {
		return this.entertainmentService.getReview({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getTopBilledCast(movieId: number) {
		return this.entertainmentService.getTopBilledCast({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getFeaturedCrewMembers(movieId: number) {
		return this.entertainmentService.getFeaturedCrewMembers({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getKeywords(movieId: number) {
		return this.entertainmentService.getKeywords({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getSocials(movieId: number) {
		return this.entertainmentService.getSocials({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getYouTubeVideo(movieId: number) {
		return this.entertainmentService.getYouTubeVideo({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}
}
