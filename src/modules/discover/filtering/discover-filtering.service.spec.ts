import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { DiscoverFilteringService } from './discover-filtering.service';
import { ENTERTAINMENT_TYPES } from '../../../graphql/generated/schema';
import { UtilsService } from '../../utils/utils.service';
import { FilteringOptionsService } from '../options/filtering-options.service';

describe('DiscoverFilteringService', () => {
	let service: DiscoverFilteringService;

	const mockHttpService = {
		get: jest.fn()
	};

	const mockConfigService = {
		get: jest.fn()
	};

	const mockUtilsService = {
		getFullImageUrlPath: jest.fn()
	};

	const mockFilteringOptionsService = {
		getAvailabilityOptions: jest.fn(),
		getReleaseTypeOptions: jest.fn()
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DiscoverFilteringService,
				{
					provide: HttpService,
					useValue: mockHttpService
				},
				{
					provide: ConfigService,
					useValue: mockConfigService
				},
				{
					provide: UtilsService,
					useValue: mockUtilsService
				},
				{
					provide: FilteringOptionsService,
					useValue: mockFilteringOptionsService
				}
			]
		}).compile();

		service = module.get<DiscoverFilteringService>(DiscoverFilteringService);
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(service).toBeDefined();
	});

	describe('getDiscoverUrlSearchParameters', () => {
		it('should handle sort_by filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: { sort_by: 'popularity.desc' },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('sort_by')).toBe('popularity.desc');
		});

		it('should handle with_watch_monetization_types filter', () => {
			expect.hasAssertions();
			mockFilteringOptionsService.getAvailabilityOptions.mockReturnValue([
				{ value: 'free' },
				{ value: 'ads' }
			]);
			const params = service.getDiscoverUrlSearchParameters({
				filters: { with_watch_monetization_types: ['free', 'ads'] },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('with_watch_monetization_types')).toBe(
				'with_watch_monetization_types=free|ads'
			);
		});

		it('should handle with_genres filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: { with_genres: ['28', '35'] },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('with_genres')).toBe('with_genres=28|35');
		});

		it('should handle certifications filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: { certifications: ['PG', 'R'] },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('certifications')).toBe('certifications=PG|R');
		});

		it('should handle with_release_types filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: { with_release_types: ['1', '2'] },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('with_release_types')).toBe('with_release_types=1|2');
		});

		it('should handle release_date filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: {
					release_date: {
						gte: '2020-01-01',
						lte: '2023-12-31'
					}
				},
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('release_date.gte')).toBe('2020-01-01');
			expect(params.get('release_date.lte')).toBe('2023-12-31');
		});

		it('should handle air_date filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: {
					search_first_air_date: true,
					air_date: {
						gte: '2020-01-01',
						lte: '2023-12-31'
					}
				},
				entertainmentType: ENTERTAINMENT_TYPES.TV
			});
			expect(params.get('first_air_date.gte')).toBe('2020-01-01');
			expect(params.get('first_air_date.lte')).toBe('2023-12-31');
		});

		it('should handle with_original_language filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: { with_original_language: 'en' },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('with_original_language')).toBe('en');
		});

		it('should handle region filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: { region: 'US' },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('region')).toBe('US');
		});

		it('should handle vote_average filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: {
					vote_average: {
						gte: 7,
						lte: 10
					}
				},
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});

			expect(params.get('vote_average.gte')).toBe('7');
			expect(params.get('vote_average.lte')).toBe('10');
		});

		it('should handle with_runtime filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: {
					with_runtime: {
						gte: 90,
						lte: 180
					}
				},
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('with_runtime.gte')).toBe('90');
			expect(params.get('with_runtime.lte')).toBe('180');
		});

		it('should handle vote_count filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: {
					vote_count: {
						gte: 1000,
						lte: 5000
					}
				},
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('vote_count.gte')).toBe('1000');
			expect(params.get('vote_count.lte')).toBe('5000');
		});

		it('should handle restrict_services filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: { restrict_services: true },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('restrict_services')).toBe('true');
		});

		it('should handle with_ott_providers filter', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: { with_ott_providers: ['8', '384'] },
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect(params.get('with_watch_providers')).toBe('with_watch_providers=8|384');
		});

		it('should not include parameters when filters are empty or undefined', () => {
			expect.hasAssertions();
			const params = service.getDiscoverUrlSearchParameters({
				filters: {},
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE
			});
			expect([...params.keys()]).toHaveLength(0);
		});
	});
});
