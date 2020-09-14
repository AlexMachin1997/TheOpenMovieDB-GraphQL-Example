const generateBirthday = require('./index');

describe("generateBirthday unit test's", () => {
	test('It should return 20/11/1997 (22 years old)', () => {
		// Arrange and act
		const response = generateBirthday('1997-11-20');
		const output = '20/11/1997 (22 years old)';

		// Assertion
		expect(response).toBe(output);
	});
});
