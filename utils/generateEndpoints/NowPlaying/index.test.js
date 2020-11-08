const generateNowPlayingEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateNowPlayingEndpoint', () => {
	it('Should return the full now playing endpoint (TV)', () => {
		// Arrange and act
		const response = generateNowPlayingEndpoint('tv');
		const output = `${API_URI}/${API_VERSION}/tv/airing_today?api_key=${API_KEY}&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full now playing endpoint (Movie)', () => {
		// Arrange and act
		const response = generateNowPlayingEndpoint('movie');
		const output = `${API_URI}/${API_VERSION}/movie/now_playing?api_key=${API_KEY}&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});
});
