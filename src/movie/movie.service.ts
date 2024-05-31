import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { TheOpenMovieDatabaseMovie } from './movie';
import { BelongsToCollection, Movie } from '../graphql.schema';

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
}
