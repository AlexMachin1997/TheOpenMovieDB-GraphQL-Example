const axios = require('axios');

const setCast = require('./index');
const creditData = require('./creditsData');

jest.mock('axios');

describe('setCast', () => {
	// After each test reset the mocks - times the function has been called e.g. axios.get()
	afterEach(() => {
		jest.clearAllMocks();
	});

	// Id
	describe('id property', () => {
		it('When the id is empty it should be 0', async () => {
			// Arrange and act
			const response = await setCast([{ id: undefined, order: 8 }]);

			// Assertion
			expect(response[0].id).toBe(0);
		});

		it('When the id is not empty it should be 1', async () => {
			// Arrange and act
			const response = await setCast([{ id: 1, order: 8 }]);

			// Assertion
			expect(response[0].id).toBe(1);
		});
	});

	// character
	describe('character property', () => {
		it('When the character is empty it should be 0', async () => {
			// Arrange and act
			const response = await setCast([{ character: undefined, order: 8 }]);

			// Assertion
			expect(response[0].character).toBe('');
		});

		it('When the character is not empty it should be Alex', async () => {
			// Arrange and act
			const response = await setCast([{ character: 'Alex', order: 8 }]);

			// Assertion
			expect(response[0].character).toBe('Alex');
		});
	});

	// profile image url
	describe('profileImageUrl property', () => {
		it('When the profileImageUrl is empty it should be 0', async () => {
			// Arrange and act
			const response = await setCast([{ profile_path: null, order: 8 }]);

			// Assertion
			expect(response[0].profileImageUrl).toBe('');
		});

		it('When the profileImageUrl is not empty it should be an absolute url', async () => {
			// Arrange and act
			const response = await setCast([{ profile_path: '/123', order: 8 }]);

			// Assertion
			expect(response[0].profileImageUrl).toBe('https://image.tmdb.org/t/p/original/123');
		});
	});

	// gender
	describe('gender property', () => {
		it('When the gender is empty it should be an empty string', async () => {
			// Arrange and act
			const response = await setCast([{ gender: null, order: 8 }]);

			// Assertion
			expect(response[0].gender).toBe('');
		});

		it('When the gender is 0 it should Male', async () => {
			// Arrange and act
			const response = await setCast([{ gender: 2, order: 8 }]);

			// Assertion
			expect(response[0].gender).toBe('Male');
		});

		it('When the gender is 2 it should Male', async () => {
			// Arrange and act
			const response = await setCast([{ gender: 2, order: 8 }]);

			// Assertion
			expect(response[0].gender).toBe('Male');
		});
	});

	// Episode count
	describe('episodeCount', () => {
		it('The episodeCount should be 75', async () => {
			// Prepare - Create the mocked "get" request values
			axios.get.mockImplementationOnce(() =>
				Promise.resolve({
					data: creditData,
					status: 200
				})
			);

			// Act - Run the function and await the response
			const response = await setCast(
				[
					{
						character: 'Lucifer Morningstar',
						credit_id: '559cb1f1c3a3681be4000bec',
						id: 192944,
						name: 'Tom Ellis',
						gender: 2,
						profile_path: '/sJkxqJfSgcwussMeywxyrnYxVX.jpg',
						order: 0
					}
				],
				'tv'
			);

			// Assertion - Check the episodeCount value
			expect(response[0].episodeCount).toBe(75);
		});
	});

	it('The episodeCount should be 0', async () => {
		// Prepare - Create the mocked axios "get" error
		axios.get.mockImplementationOnce(() => Promise.reject(new Error('Something went wrong')));

		// Act - Run the function and await the response
		const response = await setCast(
			[
				{
					character: 'Lucifer Morningstar',
					credit_id: '559cb1f1c3a3681be4000bec',
					id: 192944,
					name: 'Tom Ellis',
					gender: 2,
					profile_path: '/sJkxqJfSgcwussMeywxyrnYxVX.jpg',
					order: 0
				}
			],
			'tv'
		);

		// Assertion - Check the episodeCount value
		expect(response[0].episodeCount).toBe(0);
	});
});
