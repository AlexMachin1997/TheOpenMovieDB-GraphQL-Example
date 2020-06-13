const generateSingleItemLookEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateSingleItemLookEndpoint', () => {
	it('Should return the full single tv lookup endpoint (TV)', () => {
		// Generated URL
		const input = generateSingleItemLookEndpoint(12, 'tv');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/tv/12?api_key=${API_KEY}&language=en-US`;

		// Test
		expect(input).toMatch(expectedOutput);
	});

	it('Should return the full single movie lookup endpoint (Movie)', () => {
		// Generated URL
		const input = generateSingleItemLookEndpoint(12, 'movie');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/movie/12?api_key=${API_KEY}&language=en-US`;

		// Test
		expect(input).toMatch(expectedOutput);
	});
});
