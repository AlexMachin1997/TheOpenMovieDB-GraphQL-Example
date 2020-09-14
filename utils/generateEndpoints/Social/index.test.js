const generateSocialEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateSingleItemLookEndpoint', () => {
	it('Should return the full external_id lookup endpoint (TV)', () => {
		// Arrange and act
		const response = generateSocialEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/tv/12/external_ids?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full external_id lookup endpoint (TV)', () => {
		// Arrange and act
		const response = generateSocialEndpoint(12, 'movie');
		const output = `${API_URI}/${API_VERSION}/movie/12/external_ids?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});
});
