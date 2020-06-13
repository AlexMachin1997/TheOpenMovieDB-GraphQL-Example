const setValue = require('./index');

describe("replaceKey unit test's", () => {
	const input = {
		name: 'Alex James Machin',
		dob: '25/04/2020'
	};

	it('It should return true', () => {
		input.dob = setValue(input, 'dob', '20/11/1997');
		expect(input.dob).toBe('20/11/1997');
	});
});
