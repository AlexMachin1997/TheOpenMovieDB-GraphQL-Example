const reorderGroupByYear = require('./index');

describe('reorderGroupByYear', () => {
	it('The order should be The Walking Dead, Devs and Westworld', () => {
		// Arrange and act
		const response = reorderGroupByYear([
			{
				releaseDate: '-',
				name: 'Westworld'
			},
			{
				releaseDate: '2020',
				name: 'Devs'
			},
			{
				releaseDate: '2010',
				name: 'The Walking Dead'
			}
		]);
		const output = [
			{
				releaseDate: '2020',
				name: 'Devs'
			},
			{
				releaseDate: '2010',
				name: 'The Walking Dead'
			},
			{
				releaseDate: '-',
				name: 'Westworld'
			}
		];
		// Assertion
		expect(response).toStrictEqual(output);
	});
});
