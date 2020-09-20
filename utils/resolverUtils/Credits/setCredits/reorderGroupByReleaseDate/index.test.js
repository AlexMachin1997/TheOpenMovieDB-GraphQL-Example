const reorderGroupByReleaseDate = require('./index');

describe('reorderGroupByReleaseDate', () => {
	const data = [
		{
			releaseDate: '05/05/2020',
			name: 'Devs'
		},
		{
			releaseDate: '-',
			name: 'Westworld'
		},
		{
			releaseDate: '05/05/2010',
			name: 'The Walking Dead'
		}
	];

	const expectedResult = [
		{
			releaseDate: '-',
			name: 'Westworld'
		},
		{
			releaseDate: '05/05/2020',
			name: 'Devs'
		},
		{
			releaseDate: '05/05/2010',
			name: 'The Walking Dead'
		}
	];

	it('Westworld should be the first element in the array', () => {
		// Arrange and act
		const response = reorderGroupByReleaseDate(data);

		// Assertion
		expect(response).toStrictEqual(expectedResult);
	});
});
