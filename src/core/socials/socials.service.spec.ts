import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { SocialsService } from './socials.service';
import { ENTERTAINMENT_TYPES } from '../../graphql/generated/schema';

describe('SocialsService', () => {
	let service: SocialsService;

	const mockHttpService = {
		get: vi.fn()
	};

	const mockConfigService = {
		get: vi.fn()
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SocialsService,
				{
					provide: HttpService,
					useValue: mockHttpService
				},
				{
					provide: ConfigService,
					useValue: mockConfigService
				}
			]
		}).compile();

		service = module.get<SocialsService>(SocialsService);
		vi.clearAllMocks();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(service).toBeDefined();
	});

	describe('getSocials', () => {
		it('should properly format social media links when all IDs are present', async () => {
			expect.hasAssertions();

			const mockSocialData = {
				facebook_id: 'facebookUser',
				instagram_id: 'InstagramUser',
				twitter_id: 'twitterUser',
				tiktok_id: 'tiktokUser',
				youtube_id: 'youtubeChannelId'
			};

			mockHttpService.get.mockReturnValue(of({ data: mockSocialData }));
			mockConfigService.get.mockReturnValue('mock-api-key');

			const result = await service.getSocials({
				resourceType: ENTERTAINMENT_TYPES.MOVIE,
				resourceId: 123
			});

			expect(result.facebook).toBe('https://www.facebook.com/facebookUser');
			expect(result.instagram).toBe('https://www.instagram.com/instagramuser');
			expect(result.twitter).toBe('https://www.twitter.com/twitterUser');
			expect(result.tiktok).toBe('https://www.tiktok.com/@tiktokUser/');
			expect(result.youtube).toBe('https://www.youtube.com/channel/youtubeChannelId');
		});

		it('should return null for missing social media IDs', async () => {
			expect.hasAssertions();

			const mockSocialData = {
				facebook_id: null,
				instagram_id: null,
				twitter_id: null,
				tiktok_id: null,
				youtube_id: null
			};

			mockHttpService.get.mockReturnValue(of({ data: mockSocialData }));
			mockConfigService.get.mockReturnValue('mock-api-key');

			const result = await service.getSocials({
				resourceType: ENTERTAINMENT_TYPES.MOVIE,
				resourceId: 123
			});

			expect(result.facebook).toBeNull();
			expect(result.instagram).toBeNull();
			expect(result.twitter).toBeNull();
			expect(result.tiktok).toBeNull();
			expect(result.youtube).toBeNull();
		});

		it('should make HTTP request with correct parameters', async () => {
			expect.hasAssertions();

			const mockSocialData = {
				facebook_id: 'facebookUser'
			};

			mockHttpService.get.mockReturnValue(of({ data: mockSocialData }));
			mockConfigService.get.mockReturnValue('mock-api-key');

			await service.getSocials({
				resourceType: ENTERTAINMENT_TYPES.MOVIE,
				resourceId: 123
			});

			expect(mockHttpService.get).toHaveBeenCalledWith(
				'https://api.themoviedb.org/3/movie/123/external_ids?language=en-U',
				{
					headers: {
						Accept: 'application/json',
						Authorization: 'Bearer mock-api-key'
					}
				}
			);
		});
	});
});
