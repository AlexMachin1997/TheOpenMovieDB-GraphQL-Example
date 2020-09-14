const generateDiscoverEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateDiscoverEndpoint', () => {
	it('Should return the full discover endpoint (TV)', () => {
		// Arrange and act
		const response = generateDiscoverEndpoint('tv');
		const output = `${API_URI}/${API_VERSION}/discover/tv?api_key=${API_KEY}&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full discover endpoint (Movie)', () => {
		// Arrange and act
		const response = generateDiscoverEndpoint('movie');
		const output = `${API_URI}/${API_VERSION}/discover/movie?api_key=${API_KEY}&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});
});
