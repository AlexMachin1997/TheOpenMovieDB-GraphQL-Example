/* eslint-disable no-plusplus */
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { FilteringOptionsService } from './filtering-options.service';

describe('FilteringOptionsService', () => {
	let service: FilteringOptionsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FilteringOptionsService]
		}).compile();

		service = module.get<FilteringOptionsService>(FilteringOptionsService);
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(service).toBeDefined();
	});

	describe('getReleaseTypeOptions', () => {
		it('should return all release type options when no exclusions', () => {
			expect.hasAssertions();
			const options = service.getReleaseTypeOptions();
			expect(options).toHaveLength(7); // Total number of release types
			expect(options[0].name).toBe('all');
		});

		it('should exclude specified options', () => {
			expect.hasAssertions();
			const options = service.getReleaseTypeOptions({
				excludeOptions: ['all', 'premiere']
			});
			expect(options).toHaveLength(5);
			expect(options.find((opt) => opt.name === 'all')).toBeUndefined();
			expect(options.find((opt) => opt.name === 'premiere')).toBeUndefined();
		});

		it('should maintain sort order by order property', () => {
			expect.hasAssertions();
			const options = service.getReleaseTypeOptions();
			for (let i = 1; i < options.length; i++) {
				expect(options[i].order).toBeGreaterThan(options[i - 1].order);
			}
		});
	});

	describe('getLanguageOptions', () => {
		it('should return language options with "None Selected" as first option', () => {
			expect.hasAssertions();
			const options = service.getLanguageOptions();
			expect(options[0].value).toBe('none');
			expect(options[0].label).toBe('None Selected');
		});

		it('should format language options correctly', () => {
			expect.hasAssertions();
			const options = service.getLanguageOptions();
			const nonNoneOption = options.find((opt) => opt.value !== 'none');
			expect(nonNoneOption?.label).toMatch(/^.+\s\([A-Z]{2}\)$/);
		});
	});

	describe('getOttProviderOptions', () => {
		it('should format provider options correctly', () => {
			expect.hasAssertions();
			const options = service.getOttProviderOptions();
			expect(options[0]).toHaveProperty('label');
			expect(options[0]).toHaveProperty('value');
			expect(options[0]).toHaveProperty('id');
			expect(options[0].id).toMatch(/^.+\s-\s\d+$/);
		});
	});
});
