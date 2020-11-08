const generatedTopRatedEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generatedTopRatedEndpoint', () => {
	it('Should return the full popular endpoint (TV)', () => {
		// Arrange and act
		const response = generatedTopRatedEndpoint('tv');
		const output = `${API_URI}/${API_VERSION}/tv/top_rated?api_key=${API_KEY}&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full popular endpoint (TV)', () => {
		// Arrange and act
		const response = generatedTopRatedEndpoint('movie');
		const output = `${API_URI}/${API_VERSION}/movie/top_rated?api_key=${API_KEY}&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});
});
