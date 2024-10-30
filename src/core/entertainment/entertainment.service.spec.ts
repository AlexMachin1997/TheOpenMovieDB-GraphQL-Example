import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { EntertainmentService } from './entertainment.service';
import {
	IReviewQuery,
	IVideosQueryResponse,
	IKeywordsQueryResponse,
	ICreditGroupQueryResponse,
	ICast
} from './types';
import { ENTERTAINMENT_TYPES } from '../../graphql/generated/schema';
import { UtilsService } from '../../modules/utils/utils.service';
import { SocialsService } from '../socials/socials.service';

describe('EntertainmentService', () => {
	let service: EntertainmentService;

	const mockHttpService = {
		get: jest.fn()
	};

	const mockConfigService = {
		get: jest.fn()
	};

	const mockUtilsService = {
		getFullImageUrlPath: jest.fn(),
		getNumberAsPercentage: jest.fn(),
		getGender: jest.fn()
	};

	const mockSocialsService = {
		getSocials: jest.fn()
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EntertainmentService,
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
					provide: SocialsService,
					useValue: mockSocialsService
				}
			]
		}).compile();

		service = module.get<EntertainmentService>(EntertainmentService);
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(service).toBeDefined();
	});

	describe('getReview', () => {
		it('should properly format review data from external API', async () => {
			expect.hasAssertions();
			const mockReviewData: IReviewQuery = {
				id: 123,
				page: 1,
				results: [
					{
						author: 'John Doe',
						author_details: {
							name: 'John Doe',
							username: 'johndoe',
							avatar_path: '/avatar.jpg',
							rating: 8
						},
						content: 'Great movie!',
						created_at: '2023-01-01',
						id: 'review1',
						updated_at: '2023-01-01',
						url: 'http://review.url'
					}
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockReviewData }));
			mockUtilsService.getFullImageUrlPath.mockReturnValue('http://image.url/avatar.jpg');
			mockUtilsService.getNumberAsPercentage.mockReturnValue(80);

			const result = await service.getReview({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(mockUtilsService.getFullImageUrlPath).toHaveBeenCalledWith('/avatar.jpg');
			expect(mockUtilsService.getNumberAsPercentage).toHaveBeenCalledWith(8, 10);
			expect(result?.author?.avatarUrl).toBe('http://image.url/avatar.jpg');
			expect(result?.author?.rating).toBe(80);
			expect(result?.createdOn).toBe('1 Jan 2023');
		});

		it('should return null when no review with rating is found', async () => {
			expect.hasAssertions();
			const mockReviewData: IReviewQuery = {
				id: 123,
				page: 1,
				results: [
					{
						author: '',
						author_details: {
							name: '',
							username: '',
							avatar_path: null,
							rating: null
						},
						content: '',
						created_at: '',
						id: 'review1',
						updated_at: '',
						url: ''
					}
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockReviewData }));

			const result = await service.getReview({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result).toBeNull();
		});
	});

	describe('getTopBilledCast', () => {
		it('should properly format cast data from external API', async () => {
			expect.hasAssertions();
			const mockCastData: ICreditGroupQueryResponse = {
				id: 123,
				cast: [
					{
						id: 1,
						character: 'Main Character',
						profile_path: '/profile1.jpg',
						gender: 1,
						order: 2,
						name: 'Actor 1',
						original_name: 'Actor 1',
						popularity: 10,
						cast_id: 1,
						credit_id: 'credit1',
						adult: false,
						known_for_department: 'Acting'
					},
					{
						id: 2,
						character: 'Supporting Role',
						profile_path: '/profile2.jpg',
						gender: 2,
						order: 1,
						name: 'Actor 2',
						original_name: 'Actor 2',
						popularity: 8,
						cast_id: 2,
						credit_id: 'credit2',
						adult: false,
						known_for_department: 'Acting'
					}
				],
				crew: []
			};

			mockHttpService.get.mockReturnValue(of({ data: mockCastData }));
			mockUtilsService.getFullImageUrlPath
				.mockReturnValueOnce('http://image.url/profile2.jpg')
				.mockReturnValueOnce('http://image.url/profile1.jpg');
			mockUtilsService.getGender.mockReturnValueOnce('Female').mockReturnValueOnce('Male');

			const result = await service.getTopBilledCast({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			// Check sorting
			expect(result[0].id).toBe(2);
			expect(result[1].id).toBe(1);

			// Check transformations
			expect(mockUtilsService.getFullImageUrlPath).toHaveBeenCalledWith('/profile2.jpg');
			expect(mockUtilsService.getGender).toHaveBeenCalledWith(2);
			expect(result[0].profileImageUrl).toBe('http://image.url/profile2.jpg');
			expect(result[0].gender).toBe('Female');
		});

		it('should limit to top 9 cast members', async () => {
			expect.hasAssertions();
			const mockCastMember: ICast = {
				id: 1,
				character: 'Character',
				profile_path: '/profile.jpg',
				gender: 1,
				order: 1,
				name: 'Actor',
				original_name: 'Actor',
				popularity: 5,
				cast_id: 1,
				credit_id: 'credit1',
				adult: false,
				known_for_department: 'Acting'
			};

			const mockCastData: ICreditGroupQueryResponse = {
				id: 123,
				cast: Array.from({ length: 12 }, () => ({ ...mockCastMember })),
				crew: []
			};

			mockHttpService.get.mockReturnValue(of({ data: mockCastData }));
			mockUtilsService.getFullImageUrlPath.mockReturnValue('http://image.url/profile.jpg');
			mockUtilsService.getGender.mockReturnValue('Male');

			const result = await service.getTopBilledCast({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result).toHaveLength(9);
		});
	});

	describe('getFeaturedCrewMembers', () => {
		it('should properly format and deduplicate crew data', async () => {
			expect.hasAssertions();
			const mockCrewData: ICreditGroupQueryResponse = {
				id: 123,
				cast: [],
				crew: [
					{
						id: 1,
						name: 'Jane Doe',
						job: 'Director',
						profile_path: '/director.jpg',
						gender: 1,
						credit_id: 'credit1',
						department: 'Directing',
						adult: false,
						known_for_department: 'Directing',
						original_name: 'Jane Doe',
						popularity: 10
					},
					{
						id: 1,
						name: 'Jane Doe',
						job: 'Writer',
						profile_path: '/director.jpg',
						gender: 1,
						credit_id: 'credit2',
						department: 'Writing',
						adult: false,
						known_for_department: 'Writing',
						original_name: 'Jane Doe',
						popularity: 10
					},
					{
						id: 2,
						name: 'John Smith',
						job: 'Story',
						profile_path: '/writer.jpg',
						gender: 2,
						credit_id: 'credit3',
						department: 'Writing',
						adult: false,
						known_for_department: 'Writing',
						original_name: 'John Smith',
						popularity: 8
					}
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockCrewData }));

			const result = await service.getFeaturedCrewMembers({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result).toHaveLength(2);
			expect(result[0].name).toBe('Jane Doe');
			expect(result[0].roles).toBe('Director, Writer');
			expect(result[1].name).toBe('John Smith');
			expect(result[1].roles).toBe('Story');
		});

		it('should filter crew by specific job roles', async () => {
			expect.hasAssertions();
			const mockCrewData: ICreditGroupQueryResponse = {
				id: 123,
				cast: [],
				crew: [
					{
						id: 1,
						name: 'Jane Doe',
						job: 'Director',
						profile_path: '/director.jpg',
						credit_id: 'credit1',
						department: 'Directing',
						adult: false,
						gender: 1,
						known_for_department: 'Directing',
						original_name: 'Jane Doe',
						popularity: 10
					},
					{
						id: 2,
						name: 'John Smith',
						job: 'Cameraman',
						profile_path: '/camera.jpg',
						credit_id: 'credit2',
						department: 'Camera',
						adult: false,
						gender: 2,
						known_for_department: 'Camera',
						original_name: 'John Smith',
						popularity: 8
					}
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockCrewData }));

			const result = await service.getFeaturedCrewMembers({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result).toHaveLength(1);
			expect(result[0].name).toBe('Jane Doe');
		});
	});

	describe('getKeywords', () => {
		it('should properly format movie keywords', async () => {
			expect.hasAssertions();
			const mockKeywordData: IKeywordsQueryResponse = {
				id: 123,
				keywords: [
					{ id: '1', name: 'action' },
					{ id: '2', name: 'adventure' }
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockKeywordData }));

			const result = await service.getKeywords({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result).toEqual([
				{ id: '1', name: 'action' },
				{ id: '2', name: 'adventure' }
			]);
		});

		it('should properly format tv show keywords', async () => {
			expect.hasAssertions();
			const mockKeywordData: IKeywordsQueryResponse = {
				id: 456,
				keywords: [
					{ id: '3', name: 'drama' },
					{ id: '4', name: 'thriller' }
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockKeywordData }));

			const result = await service.getKeywords({
				entertainmentType: ENTERTAINMENT_TYPES.TV,
				entertainmentId: 456
			});

			expect(result).toEqual([
				{ id: '3', name: 'drama' },
				{ id: '4', name: 'thriller' }
			]);
		});
	});

	describe('getSocials', () => {
		it('should properly format social media links', async () => {
			expect.hasAssertions();
			mockSocialsService.getSocials.mockReturnValue({
				facebook: 'https://facebook.com/movie123',
				instagram: 'https://instagram.com/movie_insta',
				twitter: 'https://twitter.com/movie_twitter'
			});

			const result = await service.getSocials({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result.facebook).toBe('https://facebook.com/movie123');
			expect(result.instagram).toBe('https://instagram.com/movie_insta');
			expect(result.twitter).toBe('https://twitter.com/movie_twitter');
		});
	});

	describe('getYouTubeVideo', () => {
		it('should properly format YouTube video URLs and prioritize trailers', async () => {
			expect.hasAssertions();
			const mockVideoData: IVideosQueryResponse = {
				id: 123,
				results: [
					{
						site: 'YouTube',
						type: 'Clip',
						key: 'clip123',
						id: '1',
						iso_639_1: 'en',
						iso_3166_1: 'US',
						name: 'Clip',
						official: true,
						published_at: '2023-01-01',
						size: 1080
					},
					{
						site: 'YouTube',
						type: 'Trailer',
						key: 'trailer456',
						id: '2',
						iso_639_1: 'en',
						iso_3166_1: 'US',
						name: 'Trailer',
						official: true,
						published_at: '2023-01-01',
						size: 1080
					},
					{
						site: 'Vimeo',
						type: 'Trailer',
						key: 'vimeo789',
						id: '3',
						iso_639_1: 'en',
						iso_3166_1: 'US',
						name: 'Vimeo Trailer',
						official: true,
						published_at: '2023-01-01',
						size: 1080
					}
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockVideoData }));

			const result = await service.getYouTubeVideo({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result?.url).toBe('https://www.youtube.com/watch?v=trailer456');
			expect(result?.type).toBe('Trailer');
		});

		it('should fall back to clips when no trailer is available', async () => {
			expect.hasAssertions();
			const mockVideoData: IVideosQueryResponse = {
				id: 123,
				results: [
					{
						site: 'YouTube',
						type: 'Clip',
						key: 'clip123',
						id: '1',
						iso_639_1: 'en',
						iso_3166_1: 'US',
						name: 'Clip',
						official: true,
						published_at: '2023-01-01',
						size: 1080
					}
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockVideoData }));

			const result = await service.getYouTubeVideo({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result?.url).toBe('https://www.youtube.com/watch?v=clip123');
			expect(result?.type).toBe('Clip');
		});

		it('should return null for non-YouTube videos', async () => {
			expect.hasAssertions();
			const mockVideoData: IVideosQueryResponse = {
				id: 123,
				results: [
					{
						site: 'Vimeo',
						type: 'Trailer',
						key: 'vimeo123',
						id: '1',
						iso_639_1: 'en',
						iso_3166_1: 'US',
						name: 'Vimeo Trailer',
						official: true,
						published_at: '2023-01-01',
						size: 1080
					}
				]
			};

			mockHttpService.get.mockReturnValue(of({ data: mockVideoData }));

			const result = await service.getYouTubeVideo({
				entertainmentType: ENTERTAINMENT_TYPES.MOVIE,
				entertainmentId: 123
			});

			expect(result).toBeNull();
		});
	});
});
