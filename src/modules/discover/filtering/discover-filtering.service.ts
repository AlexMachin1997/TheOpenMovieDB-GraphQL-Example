/* eslint-disable @typescript-eslint/naming-convention */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { isNonNullable } from '../../../common/lib';
import { Pagination } from '../../../common/models/Pagination';
import { Nullable } from '../../../common/types/Nullable';
import {
	DiscoverFormData,
	DiscoverFormDataInput,
	DiscoverResult,
	ENTERTAINMENT_TYPES,
	PaginatedDiscoverResult
} from '../../../graphql/generated/schema';
import { UtilsService } from '../../utils/utils.service';
import { FilteringOptionsService } from '../options/filtering-options.service';
import { ITheOpenMovieDatabaseDiscoverResult } from '../types/Discover';

@Injectable()
export class DiscoverFilteringService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		private readonly utilService: UtilsService,
		private readonly filteringOptionsService: FilteringOptionsService
	) {}

	private handleMultiFilter({
		operation = 'OR',
		filterValues = [],
		searchParameter
	}: {
		operation?: 'AND' | 'OR';
		filterValues: null | undefined | Array<Nullable<string>>;
		searchParameter: string;
	}) {
		const noneNullValues = filterValues?.filter(isNonNullable) ?? [];

		if (noneNullValues.length === 0) return '';

		if (operation === 'OR') {
			return `${searchParameter}=${noneNullValues.join('|')}`;
		}

		return `${searchParameter}=${noneNullValues.join(',')}`;
	}

	private handleSearchParameterSetting(
		searchParameters: URLSearchParams,
		key: string,
		value: null | string | undefined
	) {
		if (value) {
			searchParameters.set(key, value);
		}
	}

	public getDiscoverUrlSearchParameters({
		filters,
		entertainmentType
	}: {
		filters: DiscoverFormDataInput;
		entertainmentType: ENTERTAINMENT_TYPES;
	}) {
		const searchParameters = new URLSearchParams();

		// Certificate filter
		this.handleSearchParameterSetting(
			searchParameters,
			'certifications',
			this.handleMultiFilter({
				filterValues: filters.certifications,
				searchParameter: 'certifications'
			})
		);

		// Original language filter
		this.handleSearchParameterSetting(
			searchParameters,
			'with_original_language',
			filters.with_original_language
		);

		// Region filter
		this.handleSearchParameterSetting(searchParameters, 'region', filters.region);

		// Watch monetization types filter e.g. flatrate, free, adds, rent, buy etc
		this.handleSearchParameterSetting(
			searchParameters,
			'with_watch_monetization_types',
			this.handleMultiFilter({
				filterValues:
					filters.with_watch_monetization_types?.length === 1 &&
					filters.with_watch_monetization_types[0] === 'all'
						? this.filteringOptionsService
								.getAvailabilityOptions({
									excludeOptions: ['all']
								})
								.map((option) => option.value)
						: filters.with_watch_monetization_types,
				searchParameter: 'with_watch_monetization_types'
			})
		);

		// Genre filter
		this.handleSearchParameterSetting(
			searchParameters,
			'with_genres',
			this.handleMultiFilter({
				filterValues: filters.with_genres,
				searchParameter: 'with_genres'
			})
		);

		// Sort by filter e.g. popularity.desc, vote_average.desc, first_air_date.desc, release_date.desc
		this.handleSearchParameterSetting(searchParameters, 'sort_by', filters.sort_by);

		// Release type filter e.g. 1, 2, 3, 4, 5, 6 etc
		this.handleSearchParameterSetting(
			searchParameters,
			'with_release_types',
			this.handleMultiFilter({
				filterValues:
					filters.with_release_types?.length === 1 && filters.with_release_types[0] === 'all'
						? this.filteringOptionsService
								.getReleaseTypeOptions({
									excludeOptions: ['all']
								})
								.map((option) => option.value)
						: filters.with_release_types,
				searchParameter: 'with_release_types'
			})
		);

		// Vote count filter e.g. vote_average.gte, vote_average.lte
		this.handleSearchParameterSetting(
			searchParameters,
			'vote_average.gte',
			filters.vote_count?.gte?.toString()
		);

		this.handleSearchParameterSetting(
			searchParameters,
			'vote_average.lte',
			filters.vote_count?.lte?.toString()
		);

		// OTT provider filter e.g. netflix, disney, amazon_prime, hulu, apple_tv, etc
		this.handleSearchParameterSetting(
			searchParameters,
			'with_watch_providers',
			this.handleMultiFilter({
				filterValues: filters.with_ott_providers,

				searchParameter: 'with_watch_providers'
			})
		);

		// If the user is using the "search first air date" filter then instead of using "release_date" we use "first_air_date"
		if (entertainmentType === ENTERTAINMENT_TYPES.TV && filters.search_first_air_date) {
			this.handleSearchParameterSetting(
				searchParameters,
				'first_air_date.gte',
				filters.air_date?.gte
			);

			this.handleSearchParameterSetting(
				searchParameters,
				'first_air_date.lte',
				filters.air_date?.lte
			);
		} else {
			this.handleSearchParameterSetting(
				searchParameters,
				'release_date.gte',
				filters.release_date?.gte
			);

			this.handleSearchParameterSetting(
				searchParameters,
				'release_date.lte',
				filters.release_date?.lte
			);
		}

		// Genre filter e.g. 28,16,35,80,99 (Ids that represent genres)
		this.handleSearchParameterSetting(
			searchParameters,
			'with_genres',
			this.handleMultiFilter({
				filterValues: filters.with_genres,

				searchParameter: 'with_genres'
			})
		);

		/*
		 Runtime filter e.g. with_runtime.gte, with_runtime.lte

		 NOTE:
		 - We currently only use the "gte" filter due to limited FE controls
		 - TODO: Add support for the "lte" filter via the TanStack range slider library
		*/

		this.handleSearchParameterSetting(
			searchParameters,
			'with_runtime.gte',
			filters.with_runtime?.gte?.toString()
		);

		this.handleSearchParameterSetting(
			searchParameters,
			'with_runtime.lte',
			filters.with_runtime?.lte?.toString()
		);

		// Release type filter e.g. 1, 2, 3, 4, 5, 6 (Ids that represent release types e.g. Theatrical, TV, Streaming etc)

		this.handleSearchParameterSetting(
			searchParameters,
			'with_release_types',
			this.handleMultiFilter({
				filterValues: filters.with_release_types,
				searchParameter: 'with_release_types'
			})
		);

		return searchParameters;
	}

	private async discoverResource({
		filters,
		entertainmentType,
		pageNumber
	}: {
		filters: DiscoverFormData;
		entertainmentType: ENTERTAINMENT_TYPES;
		pageNumber: number;
	}): Promise<Pagination<DiscoverResult>> {
		const discoverSearchParameters = this.getDiscoverUrlSearchParameters({
			filters,
			entertainmentType
		});

		const { data: discoverData } = await firstValueFrom(
			this.httpService.get<{
				results: Array<
					ITheOpenMovieDatabaseDiscoverResult & {
						first_air_date: Nullable<string>;
						release_date: Nullable<string>;
					}
				>;
				total_pages: number;
				total_results: number;
			}>(
				`https://api.themoviedb.org/3/discover/${entertainmentType.toLocaleLowerCase()}?include_adult=false&include_video=false&language=en-US&page=${pageNumber}${discoverSearchParameters.toString()}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${this.configService.get('THE_OPEN_MOVIE_DATABASE_API_KEY')}`
					}
				}
			)
		);

		return new Pagination(
			discoverData.results.map((result) => ({
				adult: result.adult,
				backdropUrl: this.utilService.getFullImageUrlPath(result.backdrop_path),
				posterUrl: this.utilService.getFullImageUrlPath(result.poster_path),
				name: result.title.length === 0 ? result.original_title : result.title,
				homepage: result.homepage,
				id: result.id.toString(),
				originCountry: result.origin_country,
				originalLanguage: result.original_language,
				overview: result.overview,
				popularity: result.popularity,
				posterPath: result.poster_path,
				status: result.status,
				tagline: result.tagline,
				voteAverage: result.vote_average,
				voteCount: result.vote_count,
				releaseDate: result.release_date ?? result.first_air_date
			})),
			pageNumber,
			discoverData.total_pages,
			discoverData.total_results
		);
	}

	public async getDiscoverShows({
		filters,
		pageNumber
	}: {
		filters: DiscoverFormDataInput;
		pageNumber: number;
	}): Promise<PaginatedDiscoverResult> {
		return this.discoverResource({
			entertainmentType: ENTERTAINMENT_TYPES.TV,
			filters,
			pageNumber
		});
	}

	public async getDiscoverMovies({
		filters,
		pageNumber
	}: {
		filters: DiscoverFormDataInput;
		pageNumber: number;
	}): Promise<PaginatedDiscoverResult> {
		return this.discoverResource({
			entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
			filters,
			pageNumber
		});
	}
}
