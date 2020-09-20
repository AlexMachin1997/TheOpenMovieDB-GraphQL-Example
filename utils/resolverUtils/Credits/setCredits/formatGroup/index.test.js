const formatGroup = require('./index');

describe('formatGroup', () => {
	const input = [
		{
			first_air_date: '2016-10-02',
			name: 'Westworld',
			media_type: 'tv'
		},
		{
			release_date: '2020-04-24',
			original_title: 'Black widow',
			media_type: 'movie'
		}
	];

	const output = [
		{
			releaseDate: '2020',
			title: 'Black widow',
			episodeCount: 0,
			mediaType: 'movie'
		},
		{
			releaseDate: '2016',
			title: 'Westworld',
			episodeCount: 0,
			mediaType: 'tv'
		}
	];

	it('The arrays should match', () => {
		// Arrange and act
		const response = formatGroup(input);

		// Assertion
		expect(response).toStrictEqual(output);
	});

	it('The arrays should have an array of 2', () => {
		// Arrange and act
		const response = formatGroup(input);

		// Assertion
		expect(response.length).toBe(2);
	});
});
