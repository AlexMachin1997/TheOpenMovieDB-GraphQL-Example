const replaceKey = require('./');

describe('objects -> replaceKey', () => {
	// Test data
	const mockedData = {
		name: 'ALex James Machin',
		date_of_birth: '25/04/2020'
	};

	// Checking the property doesn't exists
	it('Should return true', () => {
		expect(mockedData).not.toHaveProperty('dob');
	});

	// Checking the property exists
	it('Should return true', () => {
		const input = replaceKey(mockedData, 'date_of_birth', 'dob');
		expect(input).toHaveProperty('dob');
	});
});
