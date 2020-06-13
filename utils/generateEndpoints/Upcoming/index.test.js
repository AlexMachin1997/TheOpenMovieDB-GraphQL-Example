const generateUpcomingEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generatedTopRatedEndpoint', () => {
	it('Should return the full upcoming endpoint (TV)', () => {
		// Generated URL
		const input = generateUpcomingEndpoint('tv');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/tv/on_the_air?api_key=${API_KEY}&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});

	it('Should return the full upcoming endpoint (TV)', () => {
		// Generated URL
		const input = generateUpcomingEndpoint('movie');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/movie/upcoming?api_key=${API_KEY}&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});
});
