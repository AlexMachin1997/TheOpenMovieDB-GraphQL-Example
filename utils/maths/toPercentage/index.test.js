const toPercentage = require('./');

describe('maths -> toPercentage', () => {
	test('It should return 40', () => {
		// Arrange and act
		const response = toPercentage(6.4);
		const output = 64;

		// Assertion
		expect(response).toBe(output);
	});

	test('It should return 50', () => {
		// Arrange and act
		const response = toPercentage(5);
		const output = 50;

		// Assertion
		expect(response).toBe(output);
	});

	test('It should return 10', () => {
		// Arrange and act
		const response = toPercentage(1);
		const output = 10;

		// Assertion
		expect(response).toBe(output);
	});
});
