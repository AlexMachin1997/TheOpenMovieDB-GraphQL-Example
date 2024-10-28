import { Injectable } from '@nestjs/common';
import { addDays, format, subDays } from 'date-fns';

import { FilteringOptionsService } from '../filtering-options/filtering-options.service';
import { ENTERTAINMENT_TYPES, RESOURCE_TYPE } from '../graphql.schema';
import { isNonNullable } from '../lib';
import {
	GetCheckboxFormDataResult,
	GetDropdownFormDataOptions,
	GetDropdownFormDataResult,
	GetVoteAverageFilterFormDataOptions,
	GetVoteAverageFilterFormDataResult,
	GetWithRuntimeFilterFormDataOptions,
	GetWithRuntimeFilterFormDataResult,
	GetVoteCountFilterFormDataOptions,
	GetVoteCountFilterFormDataResult,
	GetFiltersSectionFormDataOptions,
	GetFiltersSectionFormDataResult,
	GetWhereToWatchSectionFormDataOptions,
	GetWhereToWatchSectionFormDataResult,
	GetSortSectionFormDataOptions,
	GetSortSectionFormDataResult,
	GetDiscoverFormDataOptions,
	GetDiscoverFormDataResult,
	GetCheckboxFormDataOptions
} from '../types/Discover';

@Injectable()
export class DiscoverFormDataService {
	constructor(private readonly filteringOptionsService: FilteringOptionsService) {}

	private getCheckboxFormData = ({
		defaultValue = [],
		options = []
	}: GetCheckboxFormDataOptions): GetCheckboxFormDataResult => {
		// If there are more than 0 options but it's not included in the
		if (
			defaultValue.length > 0 &&
			!options.map((option) => option.value).some((value) => defaultValue.includes(value))
		) {
			return ['all'];
		}

		// Check to see if the defaultValue has any other value (Excludes 'all')
		const hasOtherOptions = defaultValue.filter((value) => value !== 'all').length > 0;

		// Check to see if the 'all' option is available
		const hasTheAllOption = defaultValue.find((value) => value === 'all') !== undefined;

		/*
      If there is the 'all' options and other options available then filter out the 'all' option,
	    it return returns all the options which aren't all
    */
		if (hasTheAllOption && hasOtherOptions) {
			return defaultValue.filter((value) => value !== 'all');
		}

		// If there no 'all' option but there are other options return the defaultValue
		if (!hasTheAllOption && hasOtherOptions) {
			return defaultValue;
		}

		return ['all'];
	};

	private getDropdownFormData = ({
		isMultiple = false,
		defaultValue,
		options = []
	}: GetDropdownFormDataOptions): GetDropdownFormDataResult => {
		// If there are no options available, return an empty value for the dropdown
		if (options.length === 0) {
			if (isMultiple) {
				return {
					isMultiple: true,
					value: []
				};
			}
			return {
				isMultiple: false,
				value: null
			};
		}

		// For multi-select
		if (isMultiple) {
			const selectedOptions = options.filter((option) => defaultValue.includes(option.value));

			return {
				isMultiple: true,
				value: selectedOptions.map((option) => option.value) // return the actual values, not option objects
			};
		}

		// For single-select
		const selectedOption = options.find((option) => option.value === defaultValue);

		return {
			isMultiple: false,
			value: selectedOption?.value ?? null // return the value of the option, or null if not found
		};
	};

	private setupDateFilters = ({
		resourceType,
		mediaType,
		searchFirstAirDate
	}: {
		resourceType: RESOURCE_TYPE;
		mediaType: ENTERTAINMENT_TYPES;
		searchFirstAirDate: boolean;
	}) => {
		// gte - "From"
		// lte - "To"

		// Set the release_date values for the /movie/popular route
		if (resourceType === RESOURCE_TYPE.POPULAR && mediaType === ENTERTAINMENT_TYPES.MOVIE) {
			return {
				release_date: {
					gte: '',
					lte: format(addDays(new Date(), 181), 'yyyy-MM-dd')
				},
				air_date: {
					gte: null,
					lte: null
				}
			};
		}

		// Set the air_date values for the /tv/popular route
		if (resourceType === RESOURCE_TYPE.POPULAR && mediaType === ENTERTAINMENT_TYPES.TV) {
			// Get the "From" value (gte)
			const gte = '';

			// Get the "To" value (lte)
			const lte = format(addDays(new Date(), 180), 'yyyy-MM-dd');

			if (searchFirstAirDate) {
				return {
					air_date: {
						gte,
						lte
					},
					release_date: {
						gte: null,
						lte: null
					}
				};
			}

			return {
				air_date: {
					gte: null,
					lte: null
				},
				release_date: {
					gte,
					lte
				}
			};
		}

		// Set the release_date values for the /tv/now-playing route
		if (resourceType === RESOURCE_TYPE.NOW_PLAYING && mediaType === ENTERTAINMENT_TYPES.MOVIE) {
			return {
				air_date: {
					gte: null,
					lte: null
				},
				release_date: {
					gte: format(subDays(new Date(), 40), 'yyyy-MM-dd'),
					lte: format(addDays(new Date(), 2), 'yyyy-MM-dd')
				}
			};
		}

		// Set the air_date values for the /tv/airing-today route
		if (resourceType === RESOURCE_TYPE.AIRING_TODAY && mediaType === ENTERTAINMENT_TYPES.TV) {
			// Get the "From" value (gte)
			const gte = format(new Date(), 'yyyy-MM-dd');

			// Get the "To" value (lte)
			const lte = format(new Date(), 'yyyy-MM-dd');

			// When using the first_air fate filter set the air_date values otherwise just set the release_date
			// NOTE: Add find out more about this filter's functionality
			if (searchFirstAirDate) {
				return {
					air_date: {
						gte,
						lte
					},
					release_date: {
						gte: null,
						lte: null
					}
				};
			}

			return {
				release_date: {
					gte,
					lte
				},
				air_date: {
					gte: null,
					lte: null
				}
			};
		}

		// Set the release_date values for the /movie/upcoming route
		if (resourceType === RESOURCE_TYPE.UPCOMING && mediaType === ENTERTAINMENT_TYPES.MOVIE) {
			return {
				release_date: {
					gte: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
					lte: format(addDays(new Date(), 24), 'yyyy-MM-dd')
				},
				air_date: {
					gte: null,
					lte: null
				}
			};
		}

		// Set the air_date values for the /tv/on-the-air route
		if (resourceType === RESOURCE_TYPE.ON_THE_AIR && mediaType === ENTERTAINMENT_TYPES.TV) {
			// Get the "From" value (gte)
			const gte = format(new Date(), 'yyyy-MM-dd');

			// Get the "To" value (lte)
			const lte = format(addDays(new Date(), 7), 'yyyy-MM-dd');

			// When using the first_air fate filter set the air_date values otherwise just set the release_date
			// NOTE: Add find out more about this filter's functionality
			if (searchFirstAirDate) {
				return {
					air_date: {
						gte,
						lte
					},
					release_date: {
						gte: null,
						lte: null
					}
				};
			}

			return {
				release_date: {
					gte,
					lte
				},
				air_date: {
					gte: null,
					lte: null
				}
			};
		}

		// Set the release_date values for the /movie/top-rated route
		if (resourceType === RESOURCE_TYPE.TOP_RATED && mediaType === ENTERTAINMENT_TYPES.MOVIE) {
			return {
				release_date: {
					gte: '',
					lte: format(addDays(new Date(), 181), 'yyyy-MM-dd')
				},
				air_date: {
					gte: null,
					lte: null
				}
			};
		}

		// Set the release_date values for the /tv/top-rated route
		// Get the "From" value (gte)
		const gte = '';

		// Get the "To" value (lte)
		const lte = format(addDays(new Date(), 180), 'yyyy-MM-dd');

		// When using the first_air fate filter set the air_date values otherwise just set the release_date
		// NOTE: Add find out more about this filter's functionality
		if (searchFirstAirDate) {
			return {
				air_date: {
					gte,
					lte
				},
				release_date: {
					gte: null,
					lte: null
				}
			};
		}

		return {
			release_date: {
				gte,
				lte
			},
			air_date: {
				gte: null,
				lte: null
			}
		};
	};

	private getVoteAverageFilterFormData({
		voteAverageGte = 10,
		voteAverageLte = 10
	}: GetVoteAverageFilterFormDataOptions): GetVoteAverageFilterFormDataResult {
		let lte = voteAverageLte;
		let gte = voteAverageGte;

		if (voteAverageLte < 0 || voteAverageLte > 10 || voteAverageLte > voteAverageGte) {
			lte = 10;
		}

		if (voteAverageGte < 0 || voteAverageGte > 10 || voteAverageGte > voteAverageLte) {
			gte = 0;
		}

		return {
			lte,
			gte
		};
	}

	private getWithRuntimeFilterFormData({
		withRuntimeGte = 0,
		withRuntimeLte = 400
	}: GetWithRuntimeFilterFormDataOptions): GetWithRuntimeFilterFormDataResult {
		let lte = withRuntimeLte;
		let gte = withRuntimeGte;

		if (withRuntimeLte < 0 || withRuntimeLte > 400 || withRuntimeGte > withRuntimeLte) {
			lte = 400;
		}

		if (withRuntimeGte < 0 || withRuntimeGte > 400 || withRuntimeGte > withRuntimeLte) {
			gte = 0;
		}

		return {
			lte,
			gte
		};
	}

	private getVoteCountFilterFormData({
		voteCountGte = 0,
		resourceType,
		entertainmentType
	}: GetVoteCountFilterFormDataOptions): GetVoteCountFilterFormDataResult {
		let gte = voteCountGte;

		// TODO: Add support for this functionality in the UI layer first
		const lte = null;

		if (
			entertainmentType === ENTERTAINMENT_TYPES.MOVIE &&
			resourceType === RESOURCE_TYPE.TOP_RATED
		) {
			gte = 300;
		} else if (
			entertainmentType === ENTERTAINMENT_TYPES.TV &&
			resourceType === RESOURCE_TYPE.TOP_RATED
		) {
			gte = 150;
		} else if (voteCountGte > 500) {
			gte = 0;
		}

		return {
			lte,
			gte
		};
	}

	private getFilterSectionFormData({
		entertainmentType,
		resourceType,
		isAuthenticated,
		defaultValues,
		countryOptions
	}: GetFiltersSectionFormDataOptions): GetFiltersSectionFormDataResult {
		// Get the "Show Me" dropdown options, used by the Filters "Show Me" filter
		const showMeRadioOptions = this.filteringOptionsService.getShowMeRadioOptions({
			entertainmentType,
			isAuthenticated
		});

		// Get the "Availabilities" checkbox options, used by the "Availabilities" filter
		const availabilityOptions = this.filteringOptionsService.getAvailabilityOptions();

		// Get the "Genres" dropdown options, used the "Genres" filter
		const genreOptions = this.filteringOptionsService.getGenreOptions();

		// Get the "Certification" dropdown options, used by the "Certification" filter
		const certificationOptions = this.filteringOptionsService.getCertificateOptions();

		// Get the "Release Type" dropdown options, used by the "Release Types" filter
		const releaseTypeOptions = this.filteringOptionsService.getReleaseTypeOptions();

		// Get the "Language" dropdown options, used by the "Language" filter
		const languageOptions = this.filteringOptionsService.getLanguageOptions();

		let showMe = defaultValues?.show_me ?? showMeRadioOptions[0].value;

		if (
			!isAuthenticated ||
			!showMeRadioOptions.map((option) => option.value).includes(defaultValues?.show_me ?? '')
		) {
			showMe = showMeRadioOptions[0].value;
		}

		// Get the "With Ott "
		const withWatchMonetizationTypes = this.getCheckboxFormData({
			defaultValue: (defaultValues?.with_watch_monetization_types ?? []).filter(isNonNullable),
			options: availabilityOptions
		});

		const withGenres = this.getDropdownFormData({
			isMultiple: true,
			defaultValue: (defaultValues?.with_genres ?? []).filter(isNonNullable),
			options: genreOptions
		});

		const certification = this.getDropdownFormData({
			isMultiple: true,
			defaultValue: (defaultValues?.certifications ?? []).filter(isNonNullable),
			options: certificationOptions
		});

		const withReleaseTypes = this.getCheckboxFormData({
			defaultValue: (defaultValues?.with_release_types ?? ['all']).filter(isNonNullable),
			options: releaseTypeOptions
		});

		const withOriginalLanguage = this.getDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.with_original_language ?? 'none',
			options: languageOptions
		});

		const region = this.getDropdownFormData({
			isMultiple: false,

			/*

      TODO:
      - Default to the users device locale instead of defaulting to US
      - Should default to US if the local isn't founded or provided

      */
			defaultValue: defaultValues?.region ?? 'US',

			options: countryOptions
		});

		const voteAverage = this.getVoteAverageFilterFormData({
			voteAverageGte: defaultValues?.vote_average?.gte ?? undefined,
			voteAverageLte: defaultValues?.vote_average?.lte ?? undefined
		});

		const withRuntime = this.getWithRuntimeFilterFormData({
			withRuntimeGte: defaultValues?.with_runtime?.gte ?? undefined,
			withRuntimeLte: defaultValues?.with_runtime?.lte ?? undefined
		});

		const voteCountFilter = this.getVoteCountFilterFormData({
			entertainmentType,
			voteCountGte: defaultValues?.vote_count?.gte ?? undefined,
			resourceType
		});

		let searchFirstAirDate =
			defaultValues?.search_first_air_date ?? entertainmentType === ENTERTAINMENT_TYPES.TV;

		if (entertainmentType === ENTERTAINMENT_TYPES.MOVIE) {
			searchFirstAirDate = false;
		}

		const dateFilters = this.setupDateFilters({
			resourceType,
			mediaType: entertainmentType,
			searchFirstAirDate
		});

		return {
			show_me: showMe,
			with_watch_monetization_types: withWatchMonetizationTypes,
			with_genres: withGenres.isMultiple ? withGenres.value : [],
			certifications: certification.isMultiple ? certification.value : [],
			with_release_types: withReleaseTypes,
			release_date: dateFilters.release_date,
			air_date: dateFilters.air_date,
			with_original_language: !withOriginalLanguage.isMultiple ? withOriginalLanguage.value : null,
			region: !region.isMultiple ? region.value : null,
			vote_average: voteAverage,
			vote_count: voteCountFilter,
			with_runtime: withRuntime,
			search_first_air_date: searchFirstAirDate
		};
	}

	private getWhereToWatchSectionFormData({
		defaultValues,
		countryOptions
	}: GetWhereToWatchSectionFormDataOptions): GetWhereToWatchSectionFormDataResult {
		// Get the "OTT Providers" e.g. "Netflix", "Amazon Prime" etc, used by the "Where To Watch" filters
		const ottProviders = this.filteringOptionsService.getOttProviderOptions();

		// Get the dropdown form data, validates the option actually exists in the options list
		const ottRegionValue = this.getDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.ott_region ?? 'US',
			options: countryOptions
		});

		// Get the dropdown form data, validates the option actually exists in the options list
		const ottProvidersValues = this.getDropdownFormData({
			isMultiple: true,
			defaultValue: (defaultValues?.with_ott_providers ?? []).filter(isNonNullable),
			options: ottProviders
		});

		return {
			restrict_services: defaultValues?.restrict_services ?? false,
			ott_region: !ottRegionValue.isMultiple ? ottRegionValue.value : null,
			with_ott_providers: ottProvidersValues.isMultiple ? ottProvidersValues.value : []
		};
	}

	private getSortSectionFormData({
		resourceType,
		defaultValues
	}: GetSortSectionFormDataOptions): GetSortSectionFormDataResult {
		// Get "Sort By" dropdown options, used by the "Sort Results By" dropdown
		const sortingOptions = this.filteringOptionsService.getSortByOptions();

		/* Sort By */

		let defaultSortBy = 'popularity.desc';

		if (typeof defaultValues?.sort_by !== 'undefined' && defaultValues.sort_by !== null) {
			// If there is an existing value use that
			defaultSortBy = defaultValues.sort_by;
		} else if (resourceType === RESOURCE_TYPE.TOP_RATED) {
			// If there is no value but the resource type is "top-rated" then sort the results by vote_average in descending order
			defaultSortBy = 'vote_average.desc';
		}

		// Get the dropdown form data, validates the option actually exists in the options list
		const generatedSortByValue = this.getDropdownFormData({
			isMultiple: false,
			defaultValue: defaultSortBy,
			options: sortingOptions
		});

		if (!generatedSortByValue.isMultiple) {
			return {
				sort_by: generatedSortByValue.value
			};
		}

		return {
			sort_by: null
		};
	}

	public getDiscoverFormData({
		entertainmentType,
		resourceType,
		isAuthenticated = false,
		defaultValues
	}: GetDiscoverFormDataOptions): GetDiscoverFormDataResult {
		// Get the "Country" dropdown options, used by the "Where To Watch" filters
		// NOTE: Shared between 2 form sections so instead of getting twice it's fetched once
		const countryOptions = this.filteringOptionsService.getCountryOptions();

		let selectedResourceType = resourceType;

		/*

		******************************************************************************
		Additional context around these checks:
		******************************************************************************

		The following combinations aren't valid:
		- entertainmentType: 'movie' & resourceType: 'Airing Today'
		- entertainmentType 'tv' & resourceType: 'Now Playing'

		To avoid throwing an error we can make an educated guess as to what section, if users come to an unsupported
		section we switch it to the equivalent e.g. 'movie' & 'Airing Today' === 'Now Playing'

		*/
		if (
			entertainmentType === ENTERTAINMENT_TYPES.MOVIE &&
			resourceType === RESOURCE_TYPE.AIRING_TODAY
		) {
			selectedResourceType = RESOURCE_TYPE.NOW_PLAYING;
		}

		if (
			entertainmentType === ENTERTAINMENT_TYPES.TV &&
			resourceType === RESOURCE_TYPE.NOW_PLAYING
		) {
			selectedResourceType = RESOURCE_TYPE.AIRING_TODAY;
		}

		return {
			// "Sort By" section formData
			...this.getSortSectionFormData({ defaultValues, resourceType: selectedResourceType }),

			// "Filters" filtering form data
			...this.getFilterSectionFormData({
				entertainmentType,
				resourceType: selectedResourceType,
				countryOptions,
				defaultValues,
				isAuthenticated
			}),

			// "Where to watch" filtering form data
			...this.getWhereToWatchSectionFormData({
				countryOptions,
				defaultValues
			})
		};
	}
}
