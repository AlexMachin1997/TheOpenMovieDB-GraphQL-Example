const formatDate = require('./');

describe("Custom date unit test's", () => {
	// Valid date
	test('It should return April 23rd, 2020', () => {
		// Arrange and act
		const response = formatDate('2020-04-23', 'MMMM Do, YYYY');
		const output = 'April 23rd, 2020';

		// Assertion
		expect(response).toBe(output);
	});

	// Default date (No date provided)
	test('No date provided', () => {
		// Arrange and act
		const response = formatDate('', 'MMMM Do, YYYY');
		const output = '-';

		// Assertion
		expect(response).toBe(output);
	});

	// Invalid pattern
	test('It should return a pattern error message', () => {
		// Arrange and act
		const response = formatDate('2020-04-23', '');
		const output = '-';

		// Assertion
		expect(response).toBe(output);
	});
});
