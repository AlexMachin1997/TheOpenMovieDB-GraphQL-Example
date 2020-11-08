const generateCrewEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateCrewEndpoint', () => {
	it('Should return the full crew endpoint (TV)', () => {
		// Arrange and act
		const response = generateCrewEndpoint(12, 'tv');
		const output = `${API_URI}/${API_VERSION}/tv/12/credits?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full crew endpoint (Movie)', () => {
		// Arrange and act
		const response = generateCrewEndpoint(14, 'movie');
		const output = `${API_URI}/${API_VERSION}/movie/14/credits?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});
});
