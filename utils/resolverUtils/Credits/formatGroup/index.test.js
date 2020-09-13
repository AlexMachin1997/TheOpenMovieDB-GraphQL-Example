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
			release_date: '2020',
			original_title: 'Black widow',
			media_type: 'movie'
		},
		{
			release_date: '2016',
			original_title: 'Westworld',
			media_type: 'tv'
		}
	];
	it('The arrays should match', () => {
		const response = formatGroup(input, 'ALL');
		expect(response).toStrictEqual(output);
	});
	it('The arrays should have an array of 2', () => {
		const response = formatGroup(input, 'ALL');
		expect(response.length).toBe(2);
	});
});
