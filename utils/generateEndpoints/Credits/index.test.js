const generateCreditsEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateCreditsEndpoint', () => {
	it('Should return the full credits endpoint (TV)', () => {
		// Arrange and act
		const response = generateCreditsEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/person/12/combined_credits?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full credits endpoint (Movie)', () => {
		// Arrange and act
		const response = generateCreditsEndpoint(14, 'movie');
		const output = `${API_URI}/${API_VERSION}/person/14/combined_credits?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});
});
