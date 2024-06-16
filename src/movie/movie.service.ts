/* eslint-disable import/extensions */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EntertainmentService } from 'src/entertainment/entertainment.service';
import { UtilsService } from 'src/utils/utils.service';

import { TheOpenMovieDatabaseMovie } from './movie';
import { Cast, Movie, Review, Crew, Keyword, Social, ENTERTAINMENT_TYPES } from '../graphql.schema';

@Injectable()
export class MovieService {
	constructor(
		private readonly httpService: HttpService,
		private readonly utilService: UtilsService,
		private readonly entertainmentService: EntertainmentService
	) {}

	private getMovieRunTime(runtime: number): `${number}h ${number}m` {
		const numberOfHours = Math.floor(runtime / 60);
		const numberOfMinutes = runtime % 60;
		return `${numberOfHours}h ${numberOfMinutes}m`;
	}

	async getMovie(movieId: number): Promise<Movie> {
		const { data } = await firstValueFrom(
			this.httpService.get<TheOpenMovieDatabaseMovie>(
				`https://api.themoviedb.org/3/movie/${movieId}?language=en-U`,
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

		const movie: Movie = {
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

		return movie;
	}

	async getReview(movieId: number): Promise<Review | null> {
		return this.entertainmentService.getReview({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getTopBilledCast(movieId: number): Promise<Cast[] | null> {
		return this.entertainmentService.getTopBilledCast({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getFeaturedCrewMembers(movieId: number): Promise<Crew[] | null> {
		return this.entertainmentService.getFeaturedCrewMembers({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getKeywords(movieId: number): Promise<Keyword[] | null> {
		return this.entertainmentService.getKeywords({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getSocials(movieId: number): Promise<Social> {
		return this.entertainmentService.getSocials({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}

	async getTrailerUrl(movieId: number): Promise<string | null> {
		return this.entertainmentService.getTrailerUrl({
			entertainmentId: movieId,
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE
		});
	}
}
