const generatedTopRatedEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generatedTopRatedEndpoint', () => {
	it('Should return the full popular endpoint (TV)', () => {
		// Generated URL
		const input = generatedTopRatedEndpoint('tv');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/tv/top_rated?api_key=${API_KEY}&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});

	it('Should return the full popular endpoint (TV)', () => {
		// Generated URL
		const input = generatedTopRatedEndpoint('movie');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/movie/top_rated?api_key=${API_KEY}&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});
});
