const generateRecomendationsEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateRecomendationsEndpoint', () => {
	it('Should return the full recomendations endpoint (TV)', () => {
		// Generated URL
		const input = generateRecomendationsEndpoint(12, 'tv');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/tv/12/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});

	it('Should return the full recomendations endpoint (Movie)', () => {
		// Generated URL
		const input = generateRecomendationsEndpoint(12, 'movie');

		// Actual URL
		const expectedOutput = `${API_URI}/${API_VERSION}/movie/12/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

		// Test
		expect(input).toMatch(expectedOutput);
	});
});
