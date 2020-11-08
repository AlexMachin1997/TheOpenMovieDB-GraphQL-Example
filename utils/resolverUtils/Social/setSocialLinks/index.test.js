const setSocialLinks = require('./index');

describe('setSocialLinks', () => {
	// Facebook and instagram link tests
	describe('facebook and instagram links', () => {
		describe('facebook', () => {
			it('The url should exist', () => {
				// Arrange and act
				const response = setSocialLinks({ facebook_id: '1234' });
				const output = 'https://www.facebook.com/1234';

				// Assertion
				expect(response.facebook).toBe(output);
			});

			it('The url should be empty', () => {
				// Arrange and act
				const response = setSocialLinks({ facebook_id: '' });
				const output = '';

				// Assertion
				expect(response.facebook).toBe(output);
			});
		});

		describe('instagram', () => {
			it('The url should exist', () => {
				// Arrange and act
				const response = setSocialLinks({ facebook_id: '1234' });
				const output = 'https://www.instagram.com/1234';

				// Assertion
				expect(response.instagram).toBe(output);
			});

			it('The url should not exist', () => {
				// Arrange and act
				const response = setSocialLinks({ facebook_id: '' });
				const output = '';

				// Assertion
				expect(response.instagram).toBe(output);
			});
		});
	});

	// Twitter
	describe('twitter link', () => {
		it('The url should exist', () => {
			// Arrange and act
			const response = setSocialLinks({ twitter_id: '1234' });
			const output = 'https://www.twitter.com/1234';

			// Assertion
			expect(response.twitter).toBe(output);
		});

		it('The url should be empty', () => {
			// Arrange and act
			const response = setSocialLinks({ twitter_id: '' });
			const output = '';

			// Assertion
			expect(response.twitter).toBe(output);
		});
	});

	// Homepage
	describe('homepage', () => {
		it('The url should exist', () => {
			// Arrange and act
			const response = setSocialLinks({ homepage: 'https://www.alexmachin.co.uk/' });
			const output = 'https://www.alexmachin.co.uk/';

			// Assertion
			expect(response.homepage).toBe(output);
		});

		it('The url should be empty', () => {
			// Arrange and act
			const response = setSocialLinks({ homepage: '' });
			const output = '';

			// Assertion
			expect(response.homepage).toBe(output);
		});
	});

	describe('resolverType === person', () => {
		const socials = setSocialLinks(
			{
				twitter_id: 'therock',
				facebook_id: 'DwayneJohnson',
				instagram_id: 'therock',
				homepage: ''
			},
			'person'
		);

		it('twitter id should match', () => {
			// Arrange and act
			const response = socials.twitter;
			const output = 'https://www.twitter.com/therock';

			// Assertion
			expect(response).toBe(output);
		});

		it('instagram id should match', () => {
			// Arrange and act
			const response = socials.instagram;
			const output = 'https://www.instagram.com/therock';

			// Assertion
			expect(response).toBe(output);
		});

		it('homepage should match', () => {
			// Arrange and act
			const response = socials.homepage;
			const output = '';

			// Assertion
			expect(response).toBe(output);
		});
	});
});
