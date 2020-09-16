const setShows = require('./index');

describe('setShows', () => {
	const shows = setShows([
		{
			original_name: 'Lucifer',
			genre_ids: [80, 10765],
			name: 'Lucifer',
			popularity: 1294.034,
			origin_country: ['US'],
			vote_count: 5050,
			first_air_date: '2016-01-25',
			backdrop_path: '/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg',
			original_language: 'en',
			id: 63174,
			vote_average: 8.5,
			overview:
				"Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
			poster_path: '/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg'
		}
	]);

	const show = shows[0];

	describe('id property', () => {
		it('The id should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('id');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The id should match', () => {
			// Arrange and act
			const response = show.id;
			const output = 63174;

			expect(response).toBe(output);
		});
	});

	describe('name property', () => {
		it('The name property should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('name');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The name property should match (name)', () => {
			// Arrange and act
			const response = show.name;
			const output = 'Lucifer';

			expect(response).toBe(output);
		});

		it('The name property should match (original_name)', () => {
			// Arrange and act
			const response = setShows([
				{
					original_name: 'Lucifer',
					genre_ids: [80, 10765],
					// name: 'Lucifer',
					popularity: 1294.034,
					origin_country: ['US'],
					vote_count: 5050,
					first_air_date: '2016-01-25',
					backdrop_path: '/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg',
					original_language: 'en',
					id: 63174,
					vote_average: 8.5,
					overview:
						"Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
					poster_path: '/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg'
				}
			])[0].name;
			const output = 'Lucifer';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('overview property', () => {
		it('The overview should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('overview');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The overview should match', () => {
			// Arrange and act
			const response = show.overview;
			const output =
				"Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.";

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('backgroundUrl property', () => {
		it('The backgroundUrl should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('backgroundUrl');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The backgroundUrl should match', () => {
			// Arrange and act
			const response = show.backgroundUrl;
			const output = 'https://image.tmdb.org/t/p/original/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('posterUrl property', () => {
		it('The posterUrl should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('posterUrl');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The posterUrl should match', () => {
			// Arrange and act
			const response = show.posterUrl;
			const output = 'https://image.tmdb.org/t/p/original/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('genres property', () => {
		it('The genres property should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('genres');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The genres should match', () => {
			// Arrange and act
			const response = show.genres;
			const output = [80, 10765];

			// Assertion
			expect(response).toStrictEqual(output);
		});
	});

	describe('releaseDate property', () => {
		it('The releaseDate property should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('releaseDate');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The releaseDate should match', () => {
			// Arrange and act
			const response = show.releaseDate;
			const output = 'January 25th, 2016';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('originalLanguage property', () => {
		it('The originalLanguage property should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('originalLanguage');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The originalLanguage should match', () => {
			// Arrange and act
			const response = show.originalLanguage;
			const output = 'en';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('voteAverage property', () => {
		it('The voteAverage property should exist', () => {
			// Arrange and act
			const response = show.hasOwnProperty('voteAverage');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The voteAverage should match', () => {
			// Arrange and act
			const response = show.voteAverage;
			const output = 85;

			// Assertion
			expect(response).toBe(output);
		});
	});
});
