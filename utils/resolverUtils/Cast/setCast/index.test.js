const setCast = require('./index');

describe('setCast', () => {
	// Id
	describe('id', () => {
		it('When the id is empty it should be 0', async () => {
			const response = await setCast([{ id: undefined, order: 8 }]);
			expect(response[0].id).toBe(0);
		});

		it('When the id is not empty it should be 1', async () => {
			const response = await setCast([{ id: 1, order: 8 }]);
			expect(response[0].id).toBe(1);
		});
	});

	// character
	describe('character', () => {
		it('When the character is empty it should be 0', async () => {
			const response = await setCast([{ character: null, order: 8 }]);
			expect(response[0].character).toBe('');
		});

		it('When the character is not empty it should be Alex', async () => {
			const response = await setCast([{ character: 'Alex', order: 8 }]);
			expect(response[0].character).toBe('Alex');
		});
	});

	// profile image url
	describe('profileImageUrl', () => {
		it('When the profileImageUrl is empty it should be 0', async () => {
			const response = await setCast([{ profile_path: null, order: 8 }]);
			expect(response[0].profileImageUrl).toBe('');
		});

		it('When the profileImageUrl is not empty it should be an absolute url', async () => {
			const response = await setCast([{ profile_path: '/123', order: 8 }]);
			expect(response[0].profileImageUrl).toBe('https://image.tmdb.org/t/p/original/123');
		});
	});

	// gender
	describe('gender', () => {
		it('When the gender is empty it should be an empty string', async () => {
			const response = await setCast([{ gender: null, order: 8 }]);
			expect(response[0].gender).toBe('');
		});

		it('When the gender is 0 it should Male', async () => {
			const response = await setCast([{ gender: 0, order: 8 }]);
			expect(response[0].gender).toBe('Male');
		});

		it('When the gender is 2 it should Male', async () => {
			const response = await setCast([{ gender: 2, order: 8 }]);
			expect(response[0].gender).toBe('Female');
		});
	});

	// Episode count
	describe('episodeCount', () => {
		it('When the episodeCount is empty it should be 0', async () => {
			const response = await setCast([{ episodeCount: null, order: 8 }]);
			expect(response[0].episodeCount).toBe(0);
		});

		it('When the episodeCount is not empty it should return 2', async () => {
			const response = await setCast([{ episodeCount: 2, order: 8 }]);
			expect(response[0].episodeCount).toBe(2);
		});
	});
});
