const generateSearchEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateReviewEndpoint', () => {
	it('Should return the full search endpoint (TV)', () => {
		// Arrange and act
		const response = generateSearchEndpoint('Westworld', 'tv');
		const output = `${API_URI}/${API_VERSION}/search/tv?api_key=${API_KEY}&language=en-US&query=Westworld&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full search endpoint (Movie)', () => {
		// Arrange and act
		const response = generateSearchEndpoint('Avengers', 'movie');
		const output = `${API_URI}/${API_VERSION}/search/movie?api_key=${API_KEY}&language=en-US&query=Avengers&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});
});
