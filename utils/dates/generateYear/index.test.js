const generateYear = require('./index');

describe("generateYear unit test's", () => {
	test('The result should be 2020', () => {
		// Arrange and act
		const response = generateYear('2020-04-25');
		const output = '2020';

		// Assertion
		expect(response).toBe(output);
	});

	test('The result should be a dash e.g. -', () => {
		// Arrange and act
		const response = generateYear('');
		const output = '-';

		// Assertion
		expect(response).toBe(output);
	});
});
