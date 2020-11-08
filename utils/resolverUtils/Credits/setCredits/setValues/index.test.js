const setValues = require('./index');

describe('setValues', () => {
	const creditsWithoutMissingFields = setValues([
		{
			id: 1398,
			first_air_date: '1999-01-10',
			episode_count: 10,
			name: 'The Sopranos',
			media_type: 'tv'
		},
		{
			id: 1398,
			release_date: '1999-01-10',
			episode_count: 0,
			name: 'The Sopranos',
			media_type: 'movie'
		}
	]);

	const creditsWithMissingFields = setValues([
		{
			id: 1398,
			first_air_date: '1999-01-10',
			episode_count: 1,
			original_name: 'The Sopranos',
			media_type: 'tv'
		},
		{
			id: 1398,
			first_air_date: '1999-01-10',
			episode_count: 0,
			original_title: 'The Sopranos',
			media_type: 'movie'
		}
	]);

	describe('media_type === tv', () => {
		const tvCredits = creditsWithoutMissingFields.find((el) => el.mediaType === 'tv');

		describe('releaseDate property', () => {
			it('releaseDate should exist', () => {
				// Arrange and act
				const response = tvCredits.hasOwnProperty('releaseDate');
				const output = true;

				// Assertion
				expect(response).toBe(output);
			});

			it('releaseDate should match', () => {
				// Arrange and act
				const response = tvCredits.releaseDate;
				const output = '1999';

				// Assertion
				expect(response).toBe(output);
			});
		});

		describe('title property', () => {
			describe('name field exists', () => {
				it('title should exist', () => {
					// Arrange and act
					const response = tvCredits.hasOwnProperty('title');
					const output = true;

					// Assertion
					expect(response).toBe(output);
				});

				it('title should match', () => {
					// Arrange and act
					const response = tvCredits.title;
					const output = 'The Sopranos';

					// Assertion
					expect(response).toBe(output);
				});
			});

			describe('name field doesnt exist', () => {
				const nameFieldDoesNotExist = creditsWithMissingFields.find((el) => el.mediaType === 'tv');

				it('title should exist', () => {
					// Arrange and act
					const response = nameFieldDoesNotExist.hasOwnProperty('title');
					const output = true;

					// Assertion
					expect(response).toBe(output);
				});

				it('title should match', () => {
					// Arrange and act
					const response = nameFieldDoesNotExist.title;
					const output = 'The Sopranos';

					// Assertion
					expect(response).toBe(output);
				});
			});
		});

		describe('episodeCount property', () => {
			it('episodeCount should exist', () => {
				// Arrange and act
				const response = tvCredits.hasOwnProperty('episodeCount');
				const output = true;

				// Assertion
				expect(response).toBe(output);
			});

			it('episodeCount should match', () => {
				// Arrange and act
				const response = tvCredits.episodeCount;
				const output = 10;

				// Assertion
				expect(response).toBe(output);
			});
		});
	});

	describe('media_type === movie', () => {
		const movieCredits = creditsWithoutMissingFields.find((el) => el.mediaType === 'tv');

		describe('releaseDate property', () => {
			it('releaseDate should exist', () => {
				// Arrange and act
				const response = movieCredits.hasOwnProperty('releaseDate');
				const output = true;

				// Assertion
				expect(response).toBe(output);
			});
			it('releaseDate should match', () => {
				// Arrange and act
				const response = movieCredits.releaseDate;
				const output = '1999';
				// Assertion
				expect(response).toBe(output);
			});
		});

		describe('title property', () => {
			describe('title property exists', () => {
				it('title should exist', () => {
					// Arrange and act
					const response = movieCredits.hasOwnProperty('title');
					const output = true;

					// Assertion
					expect(response).toBe(output);
				});

				it('title should match', () => {
					// Arrange and act
					const response = movieCredits.title;
					const output = 'The Sopranos';

					// Assertion
					expect(response).toBe(output);
				});
			});

			describe('title property does not exist', () => {
				const nameFieldDoesNotExist = creditsWithMissingFields.find(
					(el) => el.mediaType === 'movie'
				);

				it('title should exist', () => {
					// Arrange and act
					const response = nameFieldDoesNotExist.hasOwnProperty('title');
					const output = true;

					// Assertion
					expect(response).toBe(output);
				});

				it('title should match', () => {
					// Arrange and act
					const response = nameFieldDoesNotExist.title;
					const output = 'The Sopranos';

					// Assertion
					expect(response).toBe(output);
				});
			});
		});
	});
});
