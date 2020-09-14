const setFeaturedVideo = require('./index');

describe('setFeaturedVideo', () => {
	const billAndTedVideos = [
		{
			id: '5edf93a6f36a32001d8edf04',
			iso_639_1: 'en',
			iso_3166_1: 'US',
			key: '0hAL7emClFM',
			name: 'BILL & TED FACE THE MUSIC Official Trailer #1 (2020)',
			site: 'YouTube',
			size: 1080,
			type: 'Trailer'
		},
		{
			id: '5f199125db952d0035964faf',
			iso_639_1: 'en',
			iso_3166_1: 'US',
			key: '1gPGeAYo3yU',
			name: 'BILL & TED FACE THE MUSIC Official Trailer #2 (2020)',
			site: 'YouTube',
			size: 1080,
			type: 'Trailer'
		},
		{
			id: '5f2c2c08fab3fa0036fecdec',
			iso_639_1: 'en',
			iso_3166_1: 'US',
			key: 'yevysSJlRdQ',
			name: 'BILL & TED FACE THE MUSIC: Behind the Scenes - A Most Triumphant Duo',
			site: 'YouTube',
			size: 1080,
			type: 'Behind the Scenes'
		}
	];

	describe('id', () => {
		it('Should be a blank id', () => {
			// Arrange and act
			const response = setFeaturedVideo([]);

			// Assertion
			expect(response.id).toBe('');
		});

		it('Should not be a blank id', () => {
			// Arrange and act
			const response = setFeaturedVideo(billAndTedVideos);
			const output = '5edf93a6f36a32001d8edf04';

			// Assertion
			expect(response.id).toBe(output);
		});
	});

	describe('name', () => {
		it('Should be a blank name', () => {
			// Arrange and act
			const response = setFeaturedVideo([]);
			const output = '';

			// Assertion
			expect(response.name).toBe(output);
		});

		it('Should not be a blank name', () => {
			// Arrange and act
			const response = setFeaturedVideo(billAndTedVideos);
			const output = 'BILL & TED FACE THE MUSIC Official Trailer #1 (2020)';

			// Assertion
			expect(response.name).toBe(output);
		});
	});

	describe('url', () => {
		it('Should be a blank url', () => {
			// Arrange and act
			const response = setFeaturedVideo([]);
			const output = '';

			// Assertion
			expect(response.url).toBe(output);
		});

		it('Should not be a blank url', () => {
			// Arrange and act
			const response = setFeaturedVideo(billAndTedVideos);
			const output = 'https://www.youtube.com/watch?v=0hAL7emClFM';

			// Assertion
			expect(response.url).toBe(output);
		});
	});

	describe('type', () => {
		it('Should be of type Trailer', () => {
			// Arrange and act
			const response = setFeaturedVideo([]);
			const output = 'Trailer';

			// Assertion
			expect(response.type).toBe(output);
		});
	});

	describe('site', () => {
		it('Should be of site YouTube', () => {
			// Arrange and act
			const response = setFeaturedVideo([]);
			const output = 'YouTube';

			// Assertion
			expect(response.site).toBe(output);
		});
	});
});
