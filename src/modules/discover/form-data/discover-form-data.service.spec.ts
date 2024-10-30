import { Test, TestingModule } from '@nestjs/testing';

import { DiscoverFormDataService } from './discover-form-data.service';
import { ENTERTAINMENT_TYPES, RESOURCE_TYPE } from '../../../graphql/generated/schema';
import { FilteringOptionsService } from '../options/filtering-options.service';

describe('DiscoverFormDataService', () => {
	let service: DiscoverFormDataService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DiscoverFormDataService,
				{
					provide: FilteringOptionsService,
					useValue: {
						getCountryOptions: jest.fn().mockReturnValue([
							{ value: 'US', label: 'United States' },
							{ value: 'GB', label: 'United Kingdom' }
						]),
						getSortByOptions: jest.fn().mockReturnValue([
							{ value: 'popularity.desc', label: 'Popularity Descending' },
							{ value: 'vote_average.desc', label: 'Rating Descending' }
						]),
						getShowMeRadioOptions: jest.fn().mockReturnValue([
							{ value: 'all', label: 'Everything' },
							{ value: 'watchlist', label: 'My Watchlist' }
						]),
						getAvailabilityOptions: jest.fn().mockReturnValue([
							{ value: 'free', label: 'Free' },
							{ value: 'ads', label: 'Ads' }
						]),
						getGenreOptions: jest.fn().mockReturnValue([
							{ value: '28', label: 'Action' },
							{ value: '12', label: 'Adventure' }
						]),
						getCertificateOptions: jest.fn().mockReturnValue([
							{ value: 'G', label: 'G' },
							{ value: 'PG', label: 'PG' }
						]),
						getReleaseTypeOptions: jest.fn().mockReturnValue([
							{ value: '1', label: 'Premiere' },
							{ value: '2', label: 'Limited Release' }
						]),
						getLanguageOptions: jest.fn().mockReturnValue([
							{ value: 'en', label: 'English' },
							{ value: 'es', label: 'Spanish' }
						]),
						getOttProviderOptions: jest.fn().mockReturnValue([
							{ value: 'netflix', label: 'Netflix' },
							{ value: 'prime', label: 'Amazon Prime' }
						])
					}
				}
			]
		}).compile();

		service = module.get<DiscoverFormDataService>(DiscoverFormDataService);
	});

	describe('getDiscoverFormData', () => {
		describe('Movies', () => {
			const movieResourceTypes = [
				RESOURCE_TYPE.POPULAR,
				RESOURCE_TYPE.NOW_PLAYING,
				RESOURCE_TYPE.UPCOMING,
				RESOURCE_TYPE.TOP_RATED
			];
			movieResourceTypes.forEach((resourceType) => {
				// eslint-disable-next-line jest/valid-title
				describe(resourceType, () => {
					it(`should handle ${resourceType} movies without default values`, () => {
						expect.assertions(6);

						const result = service.getDiscoverFormData({
							entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
							resourceType,
							isAuthenticated: false
						});

						expect(result.sort_by).toBe(
							resourceType === RESOURCE_TYPE.TOP_RATED ? 'vote_average.desc' : 'popularity.desc'
						);
						expect(result.show_me).toBe('all');
						expect(result.with_watch_monetization_types).toEqual(['all']);
						expect(result.with_genres).toEqual([]);
						expect(result.certifications).toEqual([]);
						expect(result.with_release_types).toEqual(['all']);
					});

					it(`should handle ${resourceType} movies with default values`, () => {
						expect.assertions(5);

						const result = service.getDiscoverFormData({
							entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
							resourceType,
							isAuthenticated: true,
							defaultValues: {
								sort_by: 'vote_average.desc',
								show_me: 'watchlist',
								with_genres: ['28'],
								certifications: ['PG'],
								with_release_types: ['1']
							}
						});

						expect(result.sort_by).toBe('vote_average.desc');
						expect(result.show_me).toBe('watchlist');
						expect(result.with_genres).toEqual(['28']);
						expect(result.certifications).toEqual(['PG']);
						expect(result.with_release_types).toEqual(['1']);
					});
				});
			});
		});

		describe('TV Shows', () => {
			const tvResourceTypes = [
				RESOURCE_TYPE.POPULAR,
				RESOURCE_TYPE.AIRING_TODAY,
				RESOURCE_TYPE.ON_THE_AIR,
				RESOURCE_TYPE.TOP_RATED
			];

			tvResourceTypes.forEach((resourceType) => {
				describe(`${resourceType}`, () => {
					it(`should handle ${resourceType} TV shows without default values`, () => {
						expect.assertions(3);

						const result = service.getDiscoverFormData({
							entertainmentType: ENTERTAINMENT_TYPES.TV,
							resourceType,
							isAuthenticated: false
						});

						expect(result.sort_by).toBe(
							resourceType === RESOURCE_TYPE.TOP_RATED ? 'vote_average.desc' : 'popularity.desc'
						);
						expect(result.search_first_air_date).toBe(true);
						expect(result.show_me).toBe('all');
					});

					it(`should handle ${resourceType} TV shows with default values`, () => {
						expect.assertions(4);

						const result = service.getDiscoverFormData({
							entertainmentType: ENTERTAINMENT_TYPES.TV,
							resourceType,
							isAuthenticated: true,
							defaultValues: {
								sort_by: 'popularity.desc',
								show_me: 'watchlist',
								with_genres: ['28'],
								search_first_air_date: false
							}
						});

						expect(result.sort_by).toBe('popularity.desc');
						expect(result.show_me).toBe('watchlist');
						expect(result.with_genres).toEqual(['28']);
						expect(result.search_first_air_date).toBe(false);
					});
				});
			});
		});

		describe('Resource Type Corrections', () => {
			it('should correct invalid movie/AIRING_TODAY combination to NOW_PLAYING', () => {
				expect.assertions(1);

				const result = service.getDiscoverFormData({
					entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
					resourceType: RESOURCE_TYPE.AIRING_TODAY,
					isAuthenticated: false
				});

				expect(result.sort_by).toBe('popularity.desc');
			});

			it('should correct invalid TV/NOW_PLAYING combination to AIRING_TODAY', () => {
				expect.assertions(1);

				const result = service.getDiscoverFormData({
					entertainmentType: ENTERTAINMENT_TYPES.TV,
					resourceType: RESOURCE_TYPE.NOW_PLAYING,
					isAuthenticated: false
				});

				expect(result.sort_by).toBe('popularity.desc');
			});
		});

		describe('Where To Watch Section', () => {
			it('should handle where to watch options without default values', () => {
				expect.assertions(3);

				const result = service.getDiscoverFormData({
					entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
					resourceType: RESOURCE_TYPE.POPULAR,
					isAuthenticated: false
				});

				expect(result.restrict_services).toBe(false);
				expect(result.with_ott_providers).toEqual([]);
			});

			it('should handle where to watch options with default values', () => {
				expect.assertions(3);

				const result = service.getDiscoverFormData({
					entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
					resourceType: RESOURCE_TYPE.POPULAR,
					isAuthenticated: true,
					defaultValues: {
						restrict_services: true,
						with_ott_providers: ['netflix', 'prime']
					}
				});

				expect(result.restrict_services).toBe(true);
				expect(result.with_ott_providers).toEqual(['netflix', 'prime']);
			});
		});
	});
});
