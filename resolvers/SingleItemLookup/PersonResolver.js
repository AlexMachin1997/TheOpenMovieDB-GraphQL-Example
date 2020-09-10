const axios = require('axios');
const { find, has } = require('lodash');

const generateAbsolutePath = require('../../utils/images/generateAbsolutePath');
const generateSearchEndpoint = require('../../utils/generateEndpoints/Search');
const generateSingleItemLookupEndpoint = require('../../utils/generateEndpoints/SingleItemLookup');
const generateBirthdayDate = require('../../utils/dates/generateBirthday');
const setValue = require('../../utils/objects/setValue');

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

			if (has(data, 'gender') === true) {
				setValue(data, 'gender', data.gender === 0 ? 'Male' : 'Female');
			}

			if (has(data, 'birthday') === true) {
				setValue(data, 'birthday', generateBirthdayDate(data.birthday));
			}

			if (has(data, 'popularity') === true) {
				setValue(data, 'popularity', data.popularity.toFixed(2));
			}

			if (has(data, 'profile_path') === true) {
				setValue(data, 'profile_path', generateAbsolutePath(data.profile_path));
			}

			return data;
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
