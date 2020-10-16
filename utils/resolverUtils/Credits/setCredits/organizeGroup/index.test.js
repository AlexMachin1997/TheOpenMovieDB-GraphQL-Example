const organizeGroup = require('./index');

describe('organizeGroup', () => {
	const credits = organizeGroup([
		{
			releaseDate: '2021',
			title: 'Black Widow',
			episodeCount: '0',
			mediaType: 'movie',
			role: 'Natasha Romanoff / Black Widow'
		},
		{
			releaseDate: '2021',
			title: 'Sing 2',
			episodeCount: '0',
			mediaType: 'tv',
			role: 'Ash (voice)'
		}
	])[0];

	describe('year property', () => {
		it('The year should be 2021', () => {
			// Arrange and act
			const response = credits.year;
			const output = '2021';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('credits property', () => {
		it('The length should be 2', () => {
			// Arrange and act
			const response = credits.credits.length;
			const output = 2;

			// Assertion
			expect(response).toBe(output);
		});
	});
});
