import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse, AxiosRequestHeaders } from 'axios';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ShowService } from './show.service';
import { ITheOpenMovieDatabaseShow, IAggregatedCreditGroupQueryResponse } from './types';
import { EntertainmentService } from '../../core/entertainment/entertainment.service';
import { ENTERTAINMENT_TYPES } from '../../graphql/generated/schema';
import { UtilsService } from '../utils/utils.service';

describe('ShowService', () => {
	let service: ShowService;
	let httpService: HttpService;
	let utilsService: UtilsService;
	let entertainmentService: EntertainmentService;
	const mockShowResponse: ITheOpenMovieDatabaseShow = {
		adult: false,
		backdrop_path: '/yGNnjoIGOdQy3douq60tULY8teK.jpg',
		first_air_date: '2016-10-02',
		genres: [
			{
				id: 10765,
				name: 'Sci-Fi & Fantasy'
			},
			{
				id: 37,
				name: 'Western'
			}
		],
		homepage: 'http://www.hbo.com/westworld',
		id: 63247,
		name: 'Westworld',
		original_name: 'Westworld',
		overview: 'A dark odyssey about the dawn of artificial consciousness and the evolution of sin.',
		poster_path: '/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg',
		production_companies: [
			{
				id: 1957,
				logo_path: '/pJJw98MtNFC9cHn3o15G7vaUnnX.png',
				name: 'Warner Bros. Television',
				origin_country: 'US'
			}
		],
		status: 'Canceled',
		tagline: 'These violent delights have violent ends.',
		vote_average: 8.045,
		original_language: 'en',
		spoken_languages: [
			{
				english_name: 'English',
				iso_639_1: 'en',
				name: 'English'
			}
		],
		last_episode_to_air: {
			id: 123456,
			name: 'Episode Title',
			overview: 'Episode overview text',
			still_path: '/fgFhnAsAmFZxRaJjjf1WYYdbzYZ.jpg',
			vote_count: 100,
			episode_type: 'finale',
			show_id: 63247,
			season_number: 4,
			air_date: '2022-08-14',
			vote_average: 8.5,
			episode_number: '8',
			production_code: '408',
			runtime: 60
		},
		seasons: [
			{
				season_number: 4,
				overview: 'Season 4 overview',
				air_date: '2022-04-24',
				episode_count: 8,
				id: 284981,
				name: 'Season 4',
				poster_path: '/path/to/poster.jpg',
				vote_average: 8.5
			}
		],
		created_by: [],
		episode_run_time: [],
		in_production: false,
		languages: [],
		last_air_date: '',
		next_episode_to_air: null,
		networks: [],
		number_of_episodes: 0,
		number_of_seasons: 0,
		popularity: 0,
		type: '',
		title: '',
		original_title: '',
		belongs_to_collection: null,
		origin_country: [],
		production_countries: [],
		vote_count: 0
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ShowService,
				{
					provide: HttpService,
					useValue: {
						get: vi.fn()
					}
				},
				{
					provide: UtilsService,
					useValue: {
						getFullImageUrlPath: vi.fn(),
						getNumberAsPercentage: vi.fn()
					}
				},
				{
					provide: EntertainmentService,
					useValue: {
						getOriginalLanguage: vi.fn(),
						getCollection: vi.fn(),
						getReview: vi.fn(),
						getTopBilledCast: vi.fn(),
						getFeaturedCrewMembers: vi.fn(),
						getKeywords: vi.fn(),
						getSocials: vi.fn(),
						getYouTubeVideo: vi.fn()
					}
				},
				{
					provide: ConfigService,
					useValue: {
						get: vi.fn()
					}
				}
			]
		}).compile();

		service = module.get<ShowService>(ShowService);
		httpService = module.get<HttpService>(HttpService);
		utilsService = module.get<UtilsService>(UtilsService);
		entertainmentService = module.get<EntertainmentService>(EntertainmentService);
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(service).toBeDefined();
	});

	describe('getShow', () => {
		it('should return show details', async () => {
			expect.hasAssertions();
			const mockAxiosResponse: AxiosResponse<ITheOpenMovieDatabaseShow> = {
				data: mockShowResponse,
				status: 200,
				statusText: 'OK',
				headers: {},
				config: {
					headers: <AxiosRequestHeaders>{}
				}
			};

			vi.spyOn(httpService, 'get').mockReturnValueOnce(of(mockAxiosResponse));

			vi.spyOn(utilsService, 'getFullImageUrlPath').mockImplementation(
				(path) => `https://image.tmdb.org/t/p/original${path}`
			);

			vi.spyOn(entertainmentService, 'getOriginalLanguage').mockReturnValue('English');
			vi.spyOn(entertainmentService, 'getCollection').mockReturnValue(null);

			const result = await service.getShow(63247);

			expect(result).toEqual({
				id: 63247,
				name: 'Westworld',
				overview:
					'A dark odyssey about the dawn of artificial consciousness and the evolution of sin.',
				backgroundUrl: 'https://image.tmdb.org/t/p/original/yGNnjoIGOdQy3douq60tULY8teK.jpg',
				posterUrl: 'https://image.tmdb.org/t/p/original/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg',
				genres: mockShowResponse.genres,
				homepage: 'http://www.hbo.com/westworld',
				originalLanguage: 'English',
				productionCompanies: [
					{
						id: 1957,
						logo: 'https://image.tmdb.org/t/p/original/pJJw98MtNFC9cHn3o15G7vaUnnX.png',
						name: 'Warner Bros. Television'
					}
				],
				releaseDate: '2016-10-02',
				voteAverage: 8.045,
				status: 'Canceled',
				tagline: 'These violent delights have violent ends.',
				belongsToCollection: null,
				currentSeason: {
					backgroundUrl: 'https://image.tmdb.org/t/p/original/fgFhnAsAmFZxRaJjjf1WYYdbzYZ.jpg',
					episodeCount: 4,
					overview: 'Season 4 overview',
					seasonNumber: 4,
					year: '2022'
				}
			});
		});
	});

	describe('getReview', () => {
		it('should call entertainment service getReview with correct params', async () => {
			expect.hasAssertions();
			const spy = vi.spyOn(entertainmentService, 'getReview');
			await service.getReview(63247);

			expect(spy).toHaveBeenCalledWith({
				entertainmentId: 63247,
				entertainmentType: ENTERTAINMENT_TYPES.TV
			});
		});
	});

	describe('getTopBilledCast', () => {
		it('should return top billed cast with episode counts', async () => {
			expect.hasAssertions();
			const mockTopBilledCast = [
				{
					id: 1,
					name: 'Actor 1'
				}
			];

			const mockAggregatedCredits: IAggregatedCreditGroupQueryResponse = {
				cast: [
					{
						id: 1,
						cast_id: 1,
						character: 'Character 1',
						order: 1,
						adult: false,
						gender: 1,
						known_for_department: 'Acting',
						name: 'Actor 1',
						original_name: 'Actor 1',
						popularity: 10,
						profile_path: '/profile.jpg',
						credit_id: '1',
						roles: [
							{ credit_id: '1', job: 'Actor', episode_count: 5 },
							{ credit_id: '2', job: 'Actor', episode_count: 3 }
						]
					}
				],
				id: 0,
				crew: []
			};

			const mockAxiosResponse: AxiosResponse = {
				data: mockAggregatedCredits,
				status: 200,
				statusText: 'OK',
				headers: {},
				config: {
					headers: <AxiosRequestHeaders>{}
				}
			};

			vi.spyOn(entertainmentService, 'getTopBilledCast').mockResolvedValue(mockTopBilledCast);
			vi.spyOn(httpService, 'get').mockReturnValueOnce(of(mockAxiosResponse));

			const result = await service.getTopBilledCast(63247);

			expect(result).toEqual([
				{
					id: 1,
					name: 'Actor 1',
					episodeCount: 8
				}
			]);
		});
	});
});
