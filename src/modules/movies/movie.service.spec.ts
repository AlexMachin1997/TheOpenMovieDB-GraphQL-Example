/* eslint-disable max-len */
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosRequestHeaders } from 'axios';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { MovieService } from './movie.service';
import { EntertainmentService } from '../../core/entertainment/entertainment.service';
import { UtilsService } from '../utils/utils.service';

describe('MovieService', () => {
	let service: MovieService;
	let httpService: HttpService;
	let utilsService: UtilsService;
	let entertainmentService: EntertainmentService;

	const mockMovieResponse = {
		adult: false,
		backdrop_path: '/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
		belongs_to_collection: {
			id: 448150,
			name: 'Deadpool Collection',
			poster_path: '/4y20YJ1F3z7Biptt2XBX1RXOSUr.jpg',
			backdrop_path: '/hBQOWY8qWXJVFAc8yLTh1teIu43.jpg'
		},
		budget: 200000000,
		genres: [
			{
				id: 28,
				name: 'Action'
			},
			{
				id: 35,
				name: 'Comedy'
			},
			{
				id: 878,
				name: 'Science Fiction'
			}
		],
		homepage: 'https://www.marvel.com/movies/deadpool-and-wolverine',
		id: 533535,
		imdb_id: 'tt6263850',
		origin_country: ['US'],
		original_language: 'en',
		original_title: 'Deadpool & Wolverine',
		overview:
			'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
		popularity: 2031.043,
		poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
		production_companies: [
			{
				id: 420,
				logo_path: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
				name: 'Marvel Studios',
				origin_country: 'US'
			}
		],
		production_countries: [
			{
				iso_3166_1: 'US',
				name: 'United States of America'
			}
		],
		release_date: '2024-07-24',
		revenue: 1336816112,
		runtime: 128,
		spoken_languages: [
			{
				english_name: 'English',
				iso_639_1: 'en',
				name: 'English'
			}
		],
		status: 'Released',
		tagline: 'Come together.',
		title: 'Deadpool & Wolverine',
		video: false,
		vote_average: 7.708,
		vote_count: 4878
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MovieService,
				{
					provide: HttpService,
					useValue: {
						get: vi.fn().mockReturnValue(
							of({
								data: mockMovieResponse,
								status: 200,
								statusText: 'OK',
								headers: {},
								config: {
									headers: <AxiosRequestHeaders>{}
								}
							})
						)
					}
				},
				{
					provide: UtilsService,
					useValue: {
						getFullImageUrlPath: vi.fn().mockReturnValue('http://image.url'),
						convertNumberToLocalCurrency: vi.fn().mockReturnValue('$100,000,000')
					}
				},
				{
					provide: EntertainmentService,
					useValue: {
						getOriginalLanguage: vi.fn().mockReturnValue('English'),
						getCollection: vi.fn().mockReturnValue({
							id: 448150,
							name: 'Deadpool Collection',
							posterUrl: 'http://image.url',
							backgroundUrl: 'http://image.url'
						}),
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

		service = module.get<MovieService>(MovieService);
		httpService = module.get<HttpService>(HttpService);
		utilsService = module.get<UtilsService>(UtilsService);
		entertainmentService = module.get<EntertainmentService>(EntertainmentService);
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(service).toBeDefined();
	});

	describe('getMovie', () => {
		it('should return transformed movie data', async () => {
			expect.hasAssertions();
			vi.spyOn(httpService, 'get').mockReturnValueOnce(
				of({
					data: mockMovieResponse,
					status: 200,
					statusText: 'OK',
					headers: {},
					config: {
						headers: <AxiosRequestHeaders>{}
					}
				})
			);

			vi.spyOn(utilsService, 'getFullImageUrlPath').mockReturnValue('http://image.url');
			vi.spyOn(entertainmentService, 'getOriginalLanguage').mockReturnValue('English');
			vi.spyOn(entertainmentService, 'getCollection').mockReturnValue({
				id: 448150,
				name: 'Deadpool Collection',
				posterUrl: 'http://image.url',
				backgroundUrl: 'http://image.url'
			});

			const result = await service.getMovie(533535);

			expect(result).toEqual({
				id: 533535,
				name: 'Deadpool & Wolverine',
				overview:
					'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
				backgroundUrl: 'http://image.url',
				posterUrl: 'http://image.url',
				genres: mockMovieResponse.genres,
				homepage: 'https://www.marvel.com/movies/deadpool-and-wolverine',
				originalLanguage: 'English',
				productionCompanies: [
					{
						id: 420,
						logo: 'http://image.url',
						name: 'Marvel Studios'
					}
				],
				releaseDate: '2024-07-24',
				voteAverage: 7.708,
				status: 'Released',
				tagline: 'Come together.',
				belongsToCollection: {
					id: 448150,
					name: 'Deadpool Collection',
					posterUrl: 'http://image.url',
					backgroundUrl: 'http://image.url'
				},
				budget: '$100,000,000',
				revenue: '$100,000,000',
				runtime: '2h 8m'
			});
		});
	});
});
