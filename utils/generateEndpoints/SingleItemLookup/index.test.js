const generateSingleItemLookEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateSingleItemLookEndpoint', () => {
	it('Should return the full single tv lookup endpoint (TV)', () => {
		// Arrange and act
		const response = generateSingleItemLookEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/tv/12?api_key=${API_KEY}&language=en-US`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full single movie lookup endpoint (Movie)', () => {
		// Arrange and act
		const response = generateSingleItemLookEndpoint(12, 'movie');
		const output = `${API_URI}/${API_VERSION}/movie/12?api_key=${API_KEY}&language=en-US`;

		// Assertion
		expect(response).toMatch(output);
	});
});
