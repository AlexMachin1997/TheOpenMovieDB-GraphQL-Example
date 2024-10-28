/* eslint-disable import/extensions */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { ITheOpenMovieDatabaseMovie } from './movie';
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
		const { data: movie } = await firstValueFrom(
			this.httpService.get<ITheOpenMovieDatabaseMovie>(
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
			id: movie.id,
			name: !movie.title ? movie.original_title : movie.title,
			overview: movie.overview,
			backgroundUrl: this.utilService.getFullImageUrlPath(movie.backdrop_path),
			posterUrl: this.utilService.getFullImageUrlPath(movie.poster_path),
			genres: movie.genres,
			homepage: movie.homepage,
			originalLanguage: this.entertainmentService.getOriginalLanguage({
				originalLanguage: movie.original_language,
				spokenLanguages: movie.spoken_languages
			}),
			productionCompanies: movie.production_companies.map((productionCompany) => ({
				id: productionCompany.id,
				logo: this.utilService.getFullImageUrlPath(productionCompany.logo_path),
				name: productionCompany.name
			})),
			releaseDate: movie.release_date,
			voteAverage: movie.vote_average,
			status: movie.status,
			tagline: movie.tagline,
			belongsToCollection: this.entertainmentService.getCollection(movie.belongs_to_collection),

			// Movie specific properties
			runtime: this.getMovieRunTime(movie.runtime),
			budget: this.utilService.convertNumberToLocalCurrency(movie.budget),
			revenue: this.utilService.convertNumberToLocalCurrency(movie.revenue)
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
