const generateUpcomingEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generatedTopRatedEndpoint', () => {
	it('Should return the full upcoming endpoint (TV)', () => {
		// Arrange and act
		const response = generateUpcomingEndpoint('tv');
		const output = `${API_URI}/${API_VERSION}/tv/on_the_air?api_key=${API_KEY}&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full upcoming endpoint (TV)', () => {
		// Arrange and act
		const response = generateUpcomingEndpoint('movie');
		const output = `${API_URI}/${API_VERSION}/movie/upcoming?api_key=${API_KEY}&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});
});
