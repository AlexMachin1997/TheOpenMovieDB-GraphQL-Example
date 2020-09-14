const replaceKeys = require('./index');

describe('replaceKeys', () => {
	// Will return the title if it can find the field
	it('name field -> original_title field ', () => {
		// Arrange and act
		const input = replaceKeys([{ name: 'Westworld' }]);

		// Assertion
		expect(input[0].original_title).toBe('Westworld');
	});

	// Will return the title if it can find the field
	it('first_air_date field -> release_date field ', () => {
		// Arrange and act
		const input = replaceKeys([{ first_air_date: '2019' }]);

		// Assertion
		expect(input[0].release_date).toBe('2019');
	});
});
