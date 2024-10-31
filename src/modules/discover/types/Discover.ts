/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/naming-convention */
import { ISelectOption } from './SelectOption';
import { Nullable } from '../../../common/types/Nullable';
import { ICommonTheOpenMovieDatabaseEntertainmentModel } from '../../../core/entertainment/types';
import {
	DiscoverFormData,
	DiscoverFormDataInput,
	ENTERTAINMENT_TYPES,
	RESOURCE_TYPE
} from '../../../graphql/generated/schema';

// Setup Dropdown Form Data types

interface IGetDropdownFormDataSingleSelectResult {
	isMultiple: false;
	value: Nullable<string>;
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

// Setup Release Date FormData types

export type GetReleaseDateOptions = {
	entertainmentType: ENTERTAINMENT_TYPES;
	resourceType: RESOURCE_TYPE;
};

export type GetReleaseDateResult = {
	gte: Nullable<string>;
	lte: Nullable<string>;
};

// Setup Air Date FormData types

export type GetAirDateFormDataOptions = {
	entertainmentType: ENTERTAINMENT_TYPES;
	resourceType: RESOURCE_TYPE;
	searchFirstAirDate: boolean;
};

export type GetAirDateFormDataResult = {
	gte: Nullable<string>;
	lte: Nullable<string>;
};

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
	gte: Nullable<number>;
	lte: Nullable<number>;
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
	defaultValues?: Pick<DiscoverFormDataInput, 'restrict_services' | 'with_ott_providers'>;
	countryOptions: Array<ISelectOption>;
};

export type GetWhereToWatchSectionFormDataResult = Pick<
	DiscoverFormData,
	'restrict_services' | 'with_ott_providers'
>;

// Get Sort Section FormData types

export type GetSortSectionFormDataOptions = {
	resourceType: RESOURCE_TYPE;
	defaultValues?: Pick<DiscoverFormDataInput, 'sort_by'>;
};

export type GetSortSectionFormDataResult = Pick<DiscoverFormData, 'sort_by'>;

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

export type ITheOpenMovieDatabaseDiscoverResult = Omit<
	ICommonTheOpenMovieDatabaseEntertainmentModel,
	'production_companies' | 'production_countries' | 'genres'
>;
