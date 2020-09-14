const setValues = require('./index');

describe('setValues', () => {
	const input = [
		{ name: 'New girl', release_date: '2014-09-24' },
		{ name: 'WestWorld', release_date: '2016-09-24' },
		{ name: 'The Walking Dead', release_date: '2010-09-24' }
	];

	const output = [
		{ name: 'New girl', release_date: '2014' },
		{ name: 'WestWorld', release_date: '2016' },
		{ name: 'The Walking Dead', release_date: '2010' }
	];

	// Arrange and act

	// Perform action
	const response = setValues(input);

	// New Girl output
	const NewGirlInput = response.find((el) => el.name === 'New girl');
	const NewGirlOutput = output.find((el) => el.name === 'New girl');

	// WestWorld output
	const WestWorldInput = response.find((el) => el.name === 'WestWorld');
	const WestWorldOutput = output.find((el) => el.name === 'WestWorld');

	// The Walking Dead output
	const TheWalkingDeadInput = response.find((el) => el.name === 'The Walking Dead');
	const TheWalkingDeadOutput = output.find((el) => el.name === 'The Walking Dead');

	describe('release_date value generating', () => {
		// Assertion
		it('New girl should return 2014', () => {
			expect(NewGirlInput.release_date).toBe(NewGirlOutput.release_date);
		});

		// Assertion
		it('WestWorld should return 2016', () => {
			expect(WestWorldInput.release_date).toBe(WestWorldOutput.release_date);
		});

		// Assertion
		it('The Walking Dead should return 10', () => {
			expect(TheWalkingDeadInput.release_date).toBe(TheWalkingDeadOutput.release_date);
		});
	});
});
