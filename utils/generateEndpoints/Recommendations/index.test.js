const generateRecommendationsEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateRecommendationsEndpoint', () => {
	it('Should return the full recommendations endpoint (TV)', () => {
		// Arrange and act
		const response = generateRecommendationsEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/tv/12/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full recommendations endpoint (Movie)', () => {
		// Arrange and act
		const response = generateRecommendationsEndpoint(12, 'movie');
		const output = `${API_URI}/${API_VERSION}/movie/12/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

		// Assertion
		expect(response).toMatch(output);
	});
});
