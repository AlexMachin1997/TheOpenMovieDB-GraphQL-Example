const filterGroupByMediaType = require('./index');

describe('filterGroupByMediaType', () => {
	const input = [
		{ media_type: 'movie', name: 'Star Wars' },
		{ media_type: 'tv', name: 'Westworld' },
		{ media_type: 'movie', name: 'Fast and furious' }
	];

	describe('TV', () => {
		// Arrange act
		const response = filterGroupByMediaType('TV', input);
		const shows = input.filter((el) => el.media_type === 'tv');

		// Assertion
		it('Should return only the shows with media_type = tv', () => {
			expect(response).toStrictEqual(shows);
		});

		// Assertion
		it('Should return a length of 1', () => {
			expect(response.length).toBe(1);
		});
	});

	describe('MOVIE', () => {
		// Arrange and act
		const response = filterGroupByMediaType('MOVIE', input);
		const movies = input.filter((el) => el.media_type === 'movie');

		// Assertion
		it('Should return only the shows with media_type = movie', () => {
			expect(response).toStrictEqual(movies);
		});

		// Assertion
		it('Should return a length of 2', () => {
			expect(response.length).toBe(2);
		});
	});

	describe('ALL', () => {
		// Arrange and act
		const response = filterGroupByMediaType('ALL', input);

		// Assertion
		it('Should return all the shows and tvs', () => {
			expect(response).toStrictEqual(response);
		});

		// Assertion
		it('Should return a length of 3', () => {
			expect(response.length).toBe(3);
		});
	});

	describe('No mediaType provided', () => {
		// Arrange and act
		const response = filterGroupByMediaType('', input);

		// Assertion
		it('Should return all the shows and tvs', () => {
			expect(response).toStrictEqual(response);
		});

		// Assertion
		it('Should return a length of 3', () => {
			expect(response.length).toBe(3);
		});
	});
});
