const setMovies = require('./index');

describe('setMovies', () => {
	// Arrange and act
	const movies = setMovies([
		{
			popularity: 1926.55,
			vote_count: 37,
			video: false,
			poster_path: '/9Rj8l6gElLpRL7Kj17iZhrT5Zuw.jpg',
			id: 734309,
			adult: false,
			backdrop_path: '/7fvdg211A2L0mHddvzyArRuRalp.jpg',
			original_language: 'en',
			original_title: 'Santana',
			genre_ids: [28],
			title: 'Santana',
			vote_average: 5.8,
			overview:
				'Two brothers — one a narcotics agent and the other a general — finally discover the identity of the drug lord who murdered their parents decades ago. They may kill each other before capturing the bad guys.',
			release_date: '2020-08-28'
		}
	]);
	const actualMovie = movies[0];

	describe('id property', () => {
		// Assertion
		it('The id should exist', () => {
			expect(actualMovie.hasOwnProperty('id')).toBe(true);
		});

		// Assertion
		it('The id should match', () => {
			expect(actualMovie.id).toBe(734309);
		});
	});

	describe('name property', () => {
		// Assertion
		it('The name should exist', () => {
			expect(actualMovie.hasOwnProperty('name')).toBe(true);
		});

		// Assertion
		it('The name should match', () => {
			expect(actualMovie.name).toBe('Santana');
		});
	});

	describe('overview property', () => {
		// Assertion
		it('The overview should exist', () => {
			expect(actualMovie.hasOwnProperty('overview')).toBe(true);
		});

		// Assertion
		it('The overview should match', () => {
			expect(actualMovie.overview).toBe(
				'Two brothers — one a narcotics agent and the other a general — finally discover the identity of the drug lord who murdered their parents decades ago. They may kill each other before capturing the bad guys.'
			);
		});
	});

	describe('backgroundUrl property', () => {
		// Assertion
		it('The backgroundUrl should exist', () => {
			expect(actualMovie.hasOwnProperty('backgroundUrl')).toBe(true);
		});

		// Assertion
		it('The backgroundUrl should match', () => {
			expect(actualMovie.backgroundUrl).toBe(
				'https://image.tmdb.org/t/p/original/7fvdg211A2L0mHddvzyArRuRalp.jpg'
			);
		});
	});

	describe('posterUrl property', () => {
		// Assertion
		it('The posterUrl should exist', () => {
			expect(actualMovie.hasOwnProperty('posterUrl')).toBe(true);
		});

		// Assertion
		it('The posterUrl should match', () => {
			expect(actualMovie.posterUrl).toBe(
				'https://image.tmdb.org/t/p/original/9Rj8l6gElLpRL7Kj17iZhrT5Zuw.jpg'
			);
		});
	});

	describe('genres property', () => {
		// Assertion
		it('The genres should exist', () => {
			expect(actualMovie.hasOwnProperty('genres')).toBe(true);
		});

		// Assertion
		it('The genres should match', () => {
			expect(actualMovie.genres).toStrictEqual([28]);
		});
	});

	describe('releaseDate property', () => {
		// Assertion
		it('The releaseDate should exist', () => {
			expect(actualMovie.hasOwnProperty('releaseDate')).toBe(true);
		});

		// Assertion
		it('The releaseDate should be August 28th, 2020', () => {
			expect(actualMovie.releaseDate).toBe('August 28th, 2020');
		});
	});

	describe('originalLanguage', () => {
		// Assertion
		it('The originalLanguage should exist', () => {
			expect(actualMovie.hasOwnProperty('originalLanguage')).toBe(true);
		});

		// Assertion
		it('The originalLanguage should be en', () => {
			expect(actualMovie.originalLanguage).toBe('en');
		});
	});

	describe('voteAverage', () => {
		// Assertion
		it('The voteAverage should exist', () => {
			expect(actualMovie.hasOwnProperty('voteAverage')).toBe(true);
		});

		// Assertion
		it('The voteAverage should be 58', () => {
			expect(actualMovie.voteAverage).toBe(58);
		});
	});
});
