import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { TheOpenMovieDatabaseMovie, TheOpenMovieDatabaseMovieReview } from './movie';
import { BelongsToCollection, Movie, Review } from '../graphql.schema';

@Injectable()
export class MovieService {
	constructor(private readonly httpService: HttpService) {}

	async findMovie(): Promise<Movie> {
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

		const convertValueToLocalCurrency = (value: number) => {
			return value.toLocaleString('en-gb', {
				// The budget is a form of currency e.g. 10000
				style: 'currency',

				// TODO: Read the users current country code and output it in their format
				currency: 'GBP'
			});
		};

		const getCollection = (): BelongsToCollection | null => {
			if (data.belongs_to_collection !== null) {
				return {
					backgroundUrl: data.belongs_to_collection.backdrop,
					id: data.belongs_to_collection.id,
					name: data.belongs_to_collection.name,
					posterUrl: data.belongs_to_collection.poster_path
				};
			}

			return data.belongs_to_collection;
		};

		const movie: Movie = {
			id: data.id,
			name: data.title === '' || data.title.length === 0 ? data.original_title : data.title,
			overview: data.overview,
			backgroundUrl: data.backdrop_path,
			posterUrl: data.poster_path,
			genres: data.genres,
			homepage: data.homepage,
			originalLanguage: getOriginalLanguage(),
			productionCompanies: data.production_companies.map((productionCompany) => ({
				id: productionCompany.id,
				logo: productionCompany.logo_path,
				name: productionCompany.name
			})),
			releaseDate: data.release_date,
			voteAverage: data.vote_average,
			status: data.status,
			tagline: data.tagline,
			belongsToCollection: getCollection(),
			runtime: getRunTime(),

			budget: convertValueToLocalCurrency(data.budget),
			revenue: convertValueToLocalCurrency(data.revenue)
		};

		return movie;
	}

	async findMovieReview(): Promise<Review | null> {
		const convertToPercentage = (number: number, highestValueProvided: number): `${number}%` => {
			return `${number * highestValueProvided}%`;
		};

		const { data } = await firstValueFrom(
			this.httpService.get<{
				id: number;
				page: number;
				results: TheOpenMovieDatabaseMovieReview[];
			}>('https://api.themoviedb.org/3/movie/19995/reviews?language=en-U', {
				headers: {
					Accept: 'application/json',
					Authorization:
						// eslint-disable-next-line max-len
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDMwNWQxNmE1ZThkN2E3ZWMwZmM2NTk5MzZiY2EzMCIsInN1YiI6IjViMzE0MjQ1OTI1MTQxM2M5MTAwNTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iqdLKFCSgeWG3SYso7Rqj297FORviPf9hDdn2kKygTA'
				}
			})
		);

		// Get the first review with a rating
		// TODO: Add additional logic around this so if there isn't one page through the data until one is found
		const selectedReview = data.results.find((el) => el.author_details.rating !== null);

		// For now if there is no rating available don't return the review
		if (typeof selectedReview === 'undefined') {
			return null;
		}

		return {
			author: {
				name: selectedReview.author_details.name,
				username: selectedReview.author_details.username,
				avatarUrl: selectedReview.author_details.avatar_path,
				rating:
					selectedReview.author_details.rating !== null
						? convertToPercentage(selectedReview.author_details.rating, 10)
						: null
			},
			isFeatured: false, // Not sure how to work this out yet...
			content: selectedReview.content,
			createdOn: new Intl.DateTimeFormat('en-GB', {
				dateStyle: 'medium'
			}).format(new Date(selectedReview.created_at))
		};
	}
}
