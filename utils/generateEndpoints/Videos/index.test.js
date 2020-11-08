const generateVideoEndpoint = require('./');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generatedTopRatedEndpoint', () => {
	it('Should return the full video endpoint (TV)', () => {
		// Arrange and act
		const response = generateVideoEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/tv/12/videos?api_key=${API_KEY}&language=en-US`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full video endpoint (TV)', () => {
		// Arrange and act
		const response = generateVideoEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/tv/12/videos?api_key=${API_KEY}&language=en-US`;

		// Assertion
		expect(response).toMatch(output);
	});
});
