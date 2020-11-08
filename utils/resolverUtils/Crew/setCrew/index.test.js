const setCrew = require('./index');

describe('setCrew', () => {
	const crew = setCrew([
		{
			credit_id: '5a83baf9c3a368637c003f34',
			department: 'Writing',
			gender: 1,
			id: 6884,
			job: 'Screenplay',
			name: 'Patty Jenkins',
			profile_path: '/za4JYxjctECHLJJel3lEFPsbeht.jpg'
		},
		{
			credit_id: '5a847700c3a36863e700ec11',
			department: 'Directing',
			gender: 1,
			id: 6884,
			job: 'Director',
			name: 'Patty Jenkins',
			profile_path: '/za4JYxjctECHLJJel3lEFPsbeht.jpg'
		},
		{
			credit_id: '5b21246e9251416e0b00ad62',
			department: 'Production',
			gender: 1,
			id: 6884,
			job: 'Producer',
			name: 'Patty Jenkins',
			profile_path: '/za4JYxjctECHLJJel3lEFPsbeht.jpg'
		},
		{
			credit_id: '5b2e7080c3a3685335005ecc',
			department: 'Writing',
			gender: 1,
			id: 6884,
			job: 'Story',
			name: 'Patty Jenkins',
			profile_path: '/za4JYxjctECHLJJel3lEFPsbeht.jpg'
		}
	]);

	describe('No crews', () => {
		it('When there are no crews the length should be 0', () => {
			// Arrange and act
			const response = setCrew([]).length;
			const output = 0;

			// Assertion
			expect(response).toBe(0);
		});

		it('When there are crews the length should be 1', () => {
			// Arrange and act
			const response = crew.length;
			const output = 1;

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('name property', () => {
		it('The name property should exist', () => {
			// Arrange and act
			const response = crew[0].hasOwnProperty('name');
			const output = true;

			// Assertion
			expect(response).toBe(true);
		});

		it('The name property should match', () => {
			// Arrange and act
			const response = crew[0].name;
			const output = 'Patty Jenkins';

			// Assertion
			expect(response).toBe(output);
		});
	});

	describe('roles property', () => {
		it('The roles property should exist', () => {
			// Arrange and act
			const response = crew[0].hasOwnProperty('roles');
			const output = true;

			// Assertion
			expect(response).toBe(true);
		});

		it('The roles property should match', () => {
			// Arrange and act
			const response = crew[0].roles;
			const output = 'Screenplay, Director, Producer, Story';

			// Assertion
			expect(response).toBe(output);
		});
	});
});
