const generatePopularEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generatePopularEndpoint', () => {
	it('Should return the full popular endpoint (TV)', () => {
		// Arrange and act
		const response = generatePopularEndpoint('tv');
		const output = `${API_URI}/${API_VERSION}/tv/popular?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full popular endpoint (Movie)', () => {
		// Arrange and act
		const response = generatePopularEndpoint('movie');
		const output = `${API_URI}/${API_VERSION}/movie/popular?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});
});
