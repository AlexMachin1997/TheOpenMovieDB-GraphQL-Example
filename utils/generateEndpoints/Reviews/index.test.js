const generateReviewEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateReviewEndpoint', () => {
	it('Should return the full reviews endpoint (TV)', () => {
		// Arrange and act
		const response = generateReviewEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/tv/12/reviews?api_key=${API_KEY}&language=en-US&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full reviews endpoint (Movie)', () => {
		// Arrange and act
		const response = generateReviewEndpoint(12, 'movie');
		const output = `${API_URI}/${API_VERSION}/movie/12/reviews?api_key=${API_KEY}&language=en-US&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});
});
