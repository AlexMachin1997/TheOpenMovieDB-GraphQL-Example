const generateBirthday = require('./');

describe("generateBirthday unit test's", () => {
	test('It should return 20/11/1997 (22 years old)', () => {
		// Data
		const input = generateBirthday('1997-11-20');
		const expectedOutput = '20/11/1997 (22 years old)';

		// Test
		expect(input).toBe(expectedOutput);
	});
});
