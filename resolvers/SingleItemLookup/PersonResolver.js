const axios = require('axios');
const { find } = require('lodash');

const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const generateSearchEndpoint = require('../../utils/generateEndpoints/Search');
const generateSingleItemLookupEndpoint = require('../../utils/generateEndpoints/SingleItemLookup');
const generateBirthdayDate = require('../../utils/dates/generateBirthday');

// eslint-disable-next-line no-unused-vars
const SearchForAPersonResolver = async (parent, args, context, info) => {
	try {
		const response = await axios.get(generateSearchEndpoint(args.search, 'person'));

		const SinglePerson = find(response.data.results, (person) => person.id === args.id);

		try {
			const SinglePersonResponse = await axios.get(
				generateSingleItemLookupEndpoint(SinglePerson.id, 'person')
			);

			const { data } = SinglePersonResponse;

			const Person = {
				id: String(data.id) ? data.id : 0,
				birthday: generateBirthdayDate(data.birthday) || '',
				knownForDepartment: data.known_for_department || '',
				name: data.name || '',
				alsoKnownAs: data.also_known_as,
				gender: data.gender === 2 ? 'Male' : 'Female',
				overview: data.overview || '',
				placeOfBirth: data.place_of_birth,
				posterUrl: generateAbsolutePath(data.profile_path) || '',
				homepage: data.homepage || ''
			};

			return Person;
		} catch (err) {
			console.log(`The /Person endpoint failed`);
			return err.response;
		}
	} catch (err) {
		console.log('The /Search endpoint failed');
		console.log(err.response);
		return err.response;
	}
};

module.exports = SearchForAPersonResolver;
