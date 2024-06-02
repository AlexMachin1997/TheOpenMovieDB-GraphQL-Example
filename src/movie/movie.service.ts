/* eslint-disable import/extensions */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UtilsService } from 'src/utils/utils.service';

import {
	TheOpenMovieDatabaseMovie,
	TheOpenMovieDatabaseMovieCast,
	TheOpenMovieDatabaseMovieCrew,
	TheOpenMovieDatabaseMovieKeywords,
	TheOpenMovieDatabaseMovieReview
} from './movie';
import { BelongsToCollection, Cast, Movie, Review, GENDER, Crew, Keyword } from '../graphql.schema';

@Injectable()
export class MovieService {
	constructor(
		private readonly httpService: HttpService,
		private readonly utilService: UtilsService
	) {}

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
			belongsToCollection: getCollection(),
			runtime: getRunTime(),

			budget: this.utilService.convertNumberToLocalCurrency(data.budget),
			revenue: this.utilService.convertNumberToLocalCurrency(data.revenue)
		};

		return movie;
	}

	async findMovieReview(): Promise<Review | null> {
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
				avatarUrl: this.utilService.getFullImageUrlPath(selectedReview.author_details.avatar_path),
				rating: this.utilService.getNumberAsPercentage(selectedReview.author_details.rating, 10)
			},
			isFeatured: false, // Not sure how to work this out yet...
			content: selectedReview.content,
			createdOn: new Intl.DateTimeFormat('en-GB', {
				dateStyle: 'medium'
			}).format(new Date(selectedReview.created_at))
		};
	}

	async findTopBilledCast(): Promise<Cast[] | null> {
		const { data } = await firstValueFrom(
			this.httpService.get<{ id: number; cast: TheOpenMovieDatabaseMovieCast[] }>(
				'https://api.themoviedb.org/3/movie/19995/credits?language=en-U',
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

		// Should already be in the correct order but just to be safe sort it ourselves
		const sortedCastByOrder = data.cast.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Return the first 9 cast members
		return sortedCastByOrder.slice(0, 9).map((el) => ({
			id: el.id,
			character: el.character,
			profileImageUrl: this.utilService.getFullImageUrlPath(el.profile_path),
			gender: el.gender === 2 ? GENDER.MALE : GENDER.FEMALE
		}));
	}

	async findFeaturedCrewMembers(): Promise<Crew[] | null> {
		const { data } = await firstValueFrom(
			this.httpService.get<{ id: number; crew: TheOpenMovieDatabaseMovieCrew[] }>(
				'https://api.themoviedb.org/3/movie/19995/credits?language=en-U',
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

		// Get the the crew members we are interested in and only get the first 6
		const filteredCrewByJob = data.crew
			.filter((crew) => {
				return (
					crew.job === 'Director' ||
					crew.job === 'Screenplay' ||
					crew.job === 'Writer' ||
					crew.job === 'Story'
				);
			})
			.slice(0, 6);

		const featuredCrewMembers: Crew[] = [];

		/*

		******************************************
		Creating the featured crew members:
		******************************************

		- The filteredCrewByJob can contain duplicate crew

		- For each "job" assigned to the crew member it has it's own entry added

		- To ensure we only display one crew member at a time we created a new object and that has a "roles" property which
			gets all the roles for that user and joins them together e.g. "Writer, Directory, Story"

		*/

		filteredCrewByJob.forEach((member) => {
			if (featuredCrewMembers.find((element) => element.name === member.name) === undefined) {
				featuredCrewMembers.push({
					name: member.name,
					roles: [
						...new Set([...filteredCrewByJob.filter((i) => i.id === member.id).map((el) => el.job)])
					].join(', ')
				});
			}
		});

		return featuredCrewMembers;
	}

	async findKeywords(): Promise<Keyword[] | null> {
		const { data } = await firstValueFrom(
			this.httpService.get<TheOpenMovieDatabaseMovieKeywords>(
				'https://api.themoviedb.org/3/movie/19995/keywords?language=en-U',
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

		return data.keywords;
	}
}
