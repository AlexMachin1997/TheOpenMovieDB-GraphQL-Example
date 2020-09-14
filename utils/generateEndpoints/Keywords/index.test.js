const generateKeywordsEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateKeywordsEndpoint', () => {
	it('Should return the full discover endpoint (TV)', () => {
		// Arrange and act
		const response = generateKeywordsEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/tv/12/keywords?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full discover endpoint (Movie)', () => {
		// Arrange and act
		const response = generateKeywordsEndpoint(12, 'movie');
		const output = `${API_URI}/${API_VERSION}/movie/12/keywords?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});
});
