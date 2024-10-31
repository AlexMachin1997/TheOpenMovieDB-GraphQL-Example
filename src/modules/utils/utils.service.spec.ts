import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
	let service: UtilsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UtilsService]
		}).compile();

		service = module.get<UtilsService>(UtilsService);
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(service).toBeDefined();
	});

	describe('getFullImageUrlPath', () => {
		it('should return null when input is null', () => {
			expect.hasAssertions();
			expect(service.getFullImageUrlPath(null)).toBeNull();
		});

		it('should return null when input is undefined', () => {
			expect.hasAssertions();
			expect(service.getFullImageUrlPath()).toBeNull();
		});

		it('should return full image URL when path is provided', () => {
			expect.hasAssertions();
			const imagePath = '/test-image.jpg';
			expect(service.getFullImageUrlPath(imagePath)).toBe(
				`https://image.tmdb.org/t/p/original${imagePath}`
			);
		});
	});

	describe('getNumberAsPercentage', () => {
		it('should return 0% when input is null', () => {
			expect.hasAssertions();
			expect(service.getNumberAsPercentage(null, 10)).toBe('0%');
		});

		it('should correctly calculate percentage', () => {
			expect.hasAssertions();
			expect(service.getNumberAsPercentage(0.8, 100)).toBe('80%');
			expect(service.getNumberAsPercentage(0.5, 10)).toBe('5%');
		});
	});

	describe('convertNumberToLocalCurrency', () => {
		it('should format number as GBP currency', () => {
			expect.hasAssertions();
			expect(service.convertNumberToLocalCurrency(1000)).toBe('£1,000.00');
			expect(service.convertNumberToLocalCurrency(1234567.89)).toBe('£1,234,567.89');
			expect(service.convertNumberToLocalCurrency(0)).toBe('£0.00');
		});
	});

	describe('getGender', () => {
		it('should return Female for gender 1', () => {
			expect.hasAssertions();
			expect(service.getGender(1)).toBe('Female');
		});

		it('should return Male for gender 2', () => {
			expect.hasAssertions();
			expect(service.getGender(2)).toBe('Male');
		});

		it('should return Non-binary for gender 3', () => {
			expect.hasAssertions();
			expect(service.getGender(3)).toBe('Non-binary');
		});

		it('should return Not set / not specified for unknown gender', () => {
			expect.hasAssertions();
			expect(service.getGender(0)).toBe('Not set / not specified');
		});
	});
});
