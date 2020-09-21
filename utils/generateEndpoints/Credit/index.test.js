const generateCreditEndpoint = require('./index');
const { API_URI, API_VERSION, API_KEY } = require('../../../config');

describe('generateCreditEndpoint', () => {
	it('Should return the full credits endpoint (TV)', () => {
		// Arrange and act
		const response = generateCreditEndpoint('12');
		const output = `${API_URI}/${API_VERSION}/credit/12/?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});

	it('Should return the full credits endpoint (Movie)', () => {
		// Arrange and act
		const response = generateCreditEndpoint('14');
		const output = `${API_URI}/${API_VERSION}/credit/14/?api_key=${API_KEY}`;

		// Assertion
		expect(response).toMatch(output);
	});
});
