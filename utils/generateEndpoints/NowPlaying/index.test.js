const generateNowPlayingEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateNowPlayingEndpoint', () => {
	it('Should return the full now playing endpoint (TV)', () => {
		// Generated URL
		const input = generateNowPlayingEndpoint('tv');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/tv/airing_today?api_key=${API_KEY}&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});

	it('Should return the full now playing endpoint (Movie)', () => {
		// Generated URL
		const input = generateNowPlayingEndpoint('movie');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/movie/now_playing?api_key=${API_KEY}&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});
});
