/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/naming-convention */
import { ISelectOption } from 'src/types/SelectOption';

import {
	DiscoverFormData,
	DiscoverFormDataInput,
	ENTERTAINMENT_TYPES,
	RESOURCE_TYPE
} from '../graphql.schema';

// Setup Dropdown Form Data types

interface IGetDropdownFormDataSingleSelectResult {
	isMultiple: false;
	value: string | null;
}

interface IGetDropdownFormDataMultiSelectResult {
	isMultiple: true;
	value: Array<string>;
}

export type GetDropdownFormDataResult =
	| IGetDropdownFormDataSingleSelectResult
	| IGetDropdownFormDataMultiSelectResult;

interface IGetDropdownFormDataMultiSelectOptions {
	isMultiple: true;
	defaultValue: Array<string>;
	options: Array<ISelectOption>;
}

interface IGetDropdownFormDataSingleSelectOptions {
	isMultiple: false;
	defaultValue: string;
	options: Array<ISelectOption>;
}

export type GetDropdownFormDataOptions =
	| IGetDropdownFormDataMultiSelectOptions
	| IGetDropdownFormDataSingleSelectOptions;

// Setup Checkbox Form Data types

export type GetCheckboxFormDataOptions = {
	defaultValue: Array<string>;
	options: Array<ISelectOption>;
};

export type GetCheckboxFormDataResult = Array<string>;

// Setup Date Range FormData types

export type GetReleaseDateOptions = {
	entertainmentType: ENTERTAINMENT_TYPES;
	resourceType: RESOURCE_TYPE;
};

export type GetReleaseDateResult = {
	gte: string | null;
	lte: string | null;
};

export type GetAirDateFormDataOptions = {
	entertainmentType: ENTERTAINMENT_TYPES;
	resourceType: RESOURCE_TYPE;
	searchFirstAirDate: boolean;
};

export type GetAirDateFormDataResult = {
	gte: null | string;
	lte: string | null;
};

export interface GetDateRangeFormDataAirDate {
	type: 'airDate';
	gte: string;
	lte: string;
}

export interface GetDateRangeFormDataReleaseDate {
	type: 'releaseDate';
	gte: string;
	lte: string;
}

export type GetDateRangeFormDataResult =
	| GetDateRangeFormDataAirDate
	| GetDateRangeFormDataReleaseDate;

// Get Vote Average Filter FormData types

export type GetVoteAverageFilterFormDataOptions = {
	voteAverageLte?: number;
	voteAverageGte?: number;
};

export type GetVoteAverageFilterFormDataResult = {
	lte: number;
	gte: number;
};

// Get With Runtime Filter FormData types

export type GetWithRuntimeFilterFormDataOptions = {
	withRuntimeLte?: number;
	withRuntimeGte?: number;
};

export type GetWithRuntimeFilterFormDataResult = {
	lte: number;
	gte: number;
};

// Get Vote Count Filter FormData type

export type GetVoteCountFilterFormDataOptions = {
	voteCountGte?: number;
	entertainmentType: ENTERTAINMENT_TYPES;
	resourceType: RESOURCE_TYPE;
};

export type GetVoteCountFilterFormDataResult = {
	gte: number | null;
	lte: number | null;
};

// Get Filters section FormData type

export type GetFiltersSectionFormDataOptions = {
	entertainmentType: ENTERTAINMENT_TYPES;
	resourceType: RESOURCE_TYPE;
	isAuthenticated: boolean;
	defaultValues?: Pick<
		DiscoverFormDataInput,
		| 'show_me'
		| 'with_watch_monetization_types'
		| 'with_genres'
		| 'certifications'
		| 'with_release_types'
		| 'with_original_language'
		| 'region'
		| 'vote_average'
		| 'with_runtime'
		| 'vote_count'
		| 'search_first_air_date'
	>;
	countryOptions: Array<ISelectOption>;
};

export type GetFiltersSectionFormDataResult = Pick<
	DiscoverFormData,
	| 'show_me'
	| 'with_watch_monetization_types'
	| 'with_genres'
	| 'certifications'
	| 'with_release_types'
	| 'with_original_language'
	| 'region'
	| 'vote_average'
	| 'with_runtime'
	| 'vote_count'
	| 'search_first_air_date'
	| 'release_date'
	| 'air_date'
>;

// Get Where To Watch Section FormData types

export type GetWhereToWatchSectionFormDataOptions = {
	defaultValues?: Pick<
		DiscoverFormDataInput,
		'restrict_services' | 'ott_region' | 'with_ott_providers'
	>;
	countryOptions: Array<ISelectOption>;
};

export type GetWhereToWatchSectionFormDataResult = Pick<
	DiscoverFormData,
	'restrict_services' | 'ott_region' | 'with_ott_providers'
>;

// Get Sort Section FormData types

export type GetSortSectionFormDataOptions = {
	resourceType: RESOURCE_TYPE;
	defaultValues?: Pick<DiscoverFormDataInput, 'sort'>;
};

export type GetSortSectionFormDataResult = Pick<DiscoverFormData, 'sort'>;

// Get Discover FormData types

export type GetDiscoverFormDataOptions = {
	entertainmentType: ENTERTAINMENT_TYPES;
	resourceType: RESOURCE_TYPE;
	isAuthenticated?: boolean;
	defaultValues?: GetSortSectionFormDataOptions['defaultValues'] &
		GetFiltersSectionFormDataOptions['defaultValues'] &
		GetWhereToWatchSectionFormDataOptions['defaultValues'];
};

export interface GetDiscoverFormDataResult
	extends GetSortSectionFormDataResult,
		GetFiltersSectionFormDataResult,
		GetWhereToWatchSectionFormDataResult {}
