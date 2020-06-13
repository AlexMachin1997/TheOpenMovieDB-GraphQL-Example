const generateSearchEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateReviewEndpoint', () => {
	it('Should return the full search endpoint (TV)', () => {
		// Generated URL
		const input = generateSearchEndpoint('Westworld', 'tv');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/search/tv?api_key=${API_KEY}&language=en-US&query=Westworld&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});

	it('Should return the full search endpoint (Movie)', () => {
		// Generated URL
		const input = generateSearchEndpoint('Avengers', 'movie');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/search/movie?api_key=${API_KEY}&language=en-US&query=Avengers&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});
});
