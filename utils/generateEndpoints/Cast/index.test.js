const generateCastEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('GenerateCastEndpoint', () => {
	it('Should return the full cast endpoint (TV)', () => {
		// Generated URL
		const input = generateCastEndpoint(12, 'tv');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/tv/12/credits?api_key=${API_KEY}`;

		// Test
		expect(input).toMatch(expectedOutput);
	});

	it('Should return the full cast endpoint (Movie)', () => {
		// Generated URL
		const input = generateCastEndpoint(14, 'movie');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/movie/14/credits?api_key=${API_KEY}`;

		// Test
		expect(input).toMatch(expectedOutput);
	});
});
