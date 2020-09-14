const generateAbsolutePath = require('./');

describe('images -> generateAbsolutePath', () => {
	// Valid image path
	test('It should return an absolute image path', () => {
		// Arrange and act
		const response = generateAbsolutePath('/gVVaukIifGJD78llZKgyT5FQbAe.jpg');
		const output = 'https://image.tmdb.org/t/p/original/gVVaukIifGJD78llZKgyT5FQbAe.jpg';

		// Assertion
		expect(response).toBe(output);
	});

	// No image resource provided
	test('It should return "Please provide a relative path" ', () => {
		// Arrange and act
		const response = generateAbsolutePath();
		const output = '';

		// Assertion
		expect(response).toBe(output);
	});
});
