const setSocialLinks = require('./index');

describe('Social -> setSocialLinks', () => {
	// Facebook and instagram link tests
	describe('facebook and instagram links', () => {
		describe('facebook', () => {
			it('The url should exist', () => {
				const response = setSocialLinks({ facebook_id: 1234 });
				expect(response.facebook).toBe('https://www.facebook.com/1234');
			});

			it('The url should be empty', () => {
				const response = setSocialLinks({ facebook_id: '' });
				expect(response.facebook).toBe('');
			});
		});

		describe('instagram', () => {
			it('The url should exist', () => {
				const response = setSocialLinks({ facebook_id: 1234 });
				expect(response.instagram).toBe('https://www.instagram.com/1234');
			});

			it('The url should not exist', () => {
				const response = setSocialLinks({ facebook_id: '' });
				expect(response.instagram).toBe('');
			});
		});
	});

	// Twitter
	describe('twitter link', () => {
		it('The url should exist', () => {
			const response = setSocialLinks({ twitter_id: 1234 });
			expect(response.twitter).toBe('https://www.twitter.com/1234');
		});

		it('The url should be empty', () => {
			const response = setSocialLinks({ twitter_id: '' });
			expect(response.twitter).toBe('');
		});
	});

	// Homepage
	describe('homepage', () => {
		it('The url should exist', () => {
			const response = setSocialLinks({ homepage: 'https://www.alexmachin.co.uk/' });
			expect(response.homepage).toBe('https://www.alexmachin.co.uk/');
		});

		it('The url should be empty', () => {
			const response = setSocialLinks({ homepage: '' });
			expect(response.homepage).toBe('');
		});
	});
});
