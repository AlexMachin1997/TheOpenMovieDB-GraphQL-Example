const generateAbsolutePath = require('./');

describe("generateAbsolutePath unit test's", () => {
	// Valid image path
	test('It should return an absolute image path', () => {
		expect(generateAbsolutePath('/gVVaukIifGJD78llZKgyT5FQbAe.jpg')).toBe(
			'https://image.tmdb.org/t/p/original/gVVaukIifGJD78llZKgyT5FQbAe.jpg'
		);
	});

	// No image resource provided
	test('It should return "Please provide a relative path" ', () => {
		expect(generateAbsolutePath()).toBe('');
	});
});
