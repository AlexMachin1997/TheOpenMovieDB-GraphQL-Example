const setPeople = require('./index');

describe('setPeople', () => {
	const person = setPeople([
		{
			profile_path: '/z3sLuRKP7hQVrvSTsqdLjGSldwG.jpg',
			adult: false,
			id: 28782,
			known_for: [
				{
					original_title: 'Spectre',
					media_type: 'movie',
					title: 'Spectre'
				},
				{
					original_title: 'The Matrix Reloaded',
					media_type: 'movie',
					title: 'The Matrix Reloaded'
				},
				{
					original_title: 'The Matrix Revolutions',
					media_type: 'movie',
					title: 'The Matrix Revolutions'
				}
			],
			name: 'Monica Bellucci',
			popularity: 48.609344
		}
	])[0];

	describe('id property', () => {
		it('The id should exist', () => {
			// Arrange and act
			const response = person.hasOwnProperty('id');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The id should match', () => {
			// Arrange and act
			const response = person.id;
			const output = 28782;

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('name property', () => {
		it('The name should exist', () => {
			// Arrange and act
			const response = person.hasOwnProperty('name');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The name should match', () => {
			// Arrange and act
			const response = person.name;
			const output = 'Monica Bellucci';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('posterUrl property', () => {
		it('The posterUrl should exist', () => {
			// Arrange and act
			const response = person.hasOwnProperty('posterUrl');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The posterUrl should match', () => {
			// Arrange and act
			const response = person.posterUrl;
			const output = 'https://image.tmdb.org/t/p/original/z3sLuRKP7hQVrvSTsqdLjGSldwG.jpg';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('roles property', () => {
		it('The roles should exist', () => {
			// Arrange and act
			const response = person.hasOwnProperty('roles');
			const output = true;

			// Assertion
			expect(response).toBe(output);
		});

		it('The roles should match', () => {
			// Arrange and act
			const response = person.roles;
			const output = 'Spectre, The Matrix Reloaded, The Matrix Revolutions';

			// Assertion
			expect(response).toBe(output);
		});
	});
});
