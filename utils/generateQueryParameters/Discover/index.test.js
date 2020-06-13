const generateQueryParameters = require('./');

const generateDiscoverEndpoint = require('../../generateEndpoints/Discover');

const baseURL = generateDiscoverEndpoint('tv');

const generateQuery = (args) => {
	return new URLSearchParams(
		generateQueryParameters(baseURL, {
			...args
		})
	);
};

describe('sortBy query parameter tests', () => {
	// Genres the query required
	const sortByURL = generateQuery({ sortBy: 'popularity.asc' });

	// Check to see if the sort_by query exists
	it('Should return true', () => {
		expect(sortByURL.get('sort_by')).toBeTruthy();
	});
});

describe('genres query parameter tests', () => {
	// Genres the query required
	const genresURL = generateQuery({ genres: '14,16,18' });

	// Checks to see if one of the with_genres query exist
	it('Should return true', () => {
		expect(genresURL.has('with_genres')).toBeTruthy();
	});

	// Check the length of the with_genres array
	it('Should have a length of 2', () => {
		expect(genresURL.get('with_genres').length).toBe(2);
	});

	// Check the first element of the with_genres query
	it('Should return 14', () => {
		expect(genresURL.getAll('with_genres')[0]).toBe('14');
	});

	// Check the second element of the with_genres query
	it('Should return 16', () => {
		expect(genresURL.getAll('with_genres')[1]).toBe('16');
	});

	// Check the third element of the with_genres query
	it('Should return 18', () => {
		expect(genresURL.getAll('with_genres')[2]).toBe('18');
	});
});

describe('certification query parameter tests', () => {
	const certificationsURL = generateQuery({ certifications: 'U,18' });

	it('Should return true', () => {
		expect(certificationsURL.has('certification')).toBeTruthy();
	});

	it('Should return a length of 1', () => {
		expect(certificationsURL.getAll('certification').length).toBe(1);
	});

	it('It should return U', () => {
		expect(certificationsURL.get('certification').split('|')[0]).toBe('U');
	});

	it('It should return 18', () => {
		expect(certificationsURL.get('certification').split('|')[1]).toBe('18');
	});
});

describe('vote count query parameter tests', () => {
	const voteCountURL = generateQuery({ userscore: '180' });

	it('Should return true', () => {
		expect(voteCountURL.has('vote_count.gte')).toBeTruthy();
	});

	it('Should return 180', () => {
		expect(voteCountURL.get('vote_count.gte')).toBe('180');
	});
});

describe('runtime query parameter tests', () => {
	const runtimeURL = generateQuery({ runtime: '150' });

	it('Should return true', () => {
		expect(runtimeURL.has('with_runtime.gte')).toBeTruthy();
	});

	it('Should return 150', () => {
		expect(runtimeURL.get('with_runtime.gte')).toBe('150');
	});
});
