/* eslint-disable import/extensions */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EntertainmentService } from 'src/entertainment/entertainment.service';
import { UtilsService } from 'src/utils/utils.service';

import { TheOpenMovieDatabaseMovie } from './movie';
import { BelongsToCollection, Cast, Movie, Review, Crew, Keyword, Social } from '../graphql.schema';

@Injectable()
export class MovieService {
	constructor(
		private readonly httpService: HttpService,
		private readonly utilService: UtilsService,
		private readonly entertainmentLookupService: EntertainmentService
	) {}

	async getMovie(): Promise<Movie> {
		const { data } = await firstValueFrom(
			this.httpService.get<TheOpenMovieDatabaseMovie>(
				'https://api.themoviedb.org/3/movie/19995?language=en-U',
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

		const getRunTime = (): `${number}h ${number}m` => {
			const numberOfHours = Math.floor(data.runtime / 60);
			const numberOfMinutes = data.runtime % 60;
			return `${numberOfHours}h ${numberOfMinutes}m`;
		};

		const getOriginalLanguage = () => {
			if (data.original_language.length !== 0 && data.spoken_languages.length === 0) {
				const foundFriendlyLanguage = data.spoken_languages.find(
					(el) => el.iso_639_1 === data.original_language
				);

				if (typeof foundFriendlyLanguage !== 'undefined') {
					return foundFriendlyLanguage.name;
				}

				return data.original_language;
			}

			return data.original_language;
		};

		const getCollection = (): BelongsToCollection | null => {
			if (data.belongs_to_collection !== null) {
				return {
					backgroundUrl: this.utilService.getFullImageUrlPath(data.belongs_to_collection.backdrop),
					id: data.belongs_to_collection.id,
					name: data.belongs_to_collection.name,
					posterUrl: data.belongs_to_collection.poster_path
				};
			}

			return data.belongs_to_collection;
		};

		const movie: Movie = {
			// Common "entertainment" properties
			id: data.id,
			name: data.title === '' || data.title.length === 0 ? data.original_title : data.title,
			overview: data.overview,
			backgroundUrl: this.utilService.getFullImageUrlPath(data.backdrop_path),
			posterUrl: this.utilService.getFullImageUrlPath(data.poster_path),
			genres: data.genres,
			homepage: data.homepage,
			originalLanguage: getOriginalLanguage(),
			productionCompanies: data.production_companies.map((productionCompany) => ({
				id: productionCompany.id,
				logo: this.utilService.getFullImageUrlPath(productionCompany.logo_path),
				name: productionCompany.name
			})),
			releaseDate: data.release_date,
			voteAverage: data.vote_average,
			status: data.status,
			tagline: data.tagline,

			// Movie specific properties
			belongsToCollection: getCollection(),
			runtime: getRunTime(),
			budget: this.utilService.convertNumberToLocalCurrency(data.budget),
			revenue: this.utilService.convertNumberToLocalCurrency(data.revenue)
		};

		return movie;
	}

	async getReview(): Promise<Review | null> {
		return this.entertainmentLookupService.getReview();
	}

	async getTopBilledCast(): Promise<Cast[] | null> {
		return this.entertainmentLookupService.getTopBilledCast();
	}

	async getFeaturedCrewMembers(): Promise<Crew[] | null> {
		return this.entertainmentLookupService.getFeaturedCrewMembers();
	}

	async getKeywords(): Promise<Keyword[] | null> {
		return this.entertainmentLookupService.getKeywords();
	}

	async getSocials(): Promise<Social> {
		return this.entertainmentLookupService.getSocials();
	}
}
