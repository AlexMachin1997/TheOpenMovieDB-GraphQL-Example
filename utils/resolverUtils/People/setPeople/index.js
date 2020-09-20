const generateAbsolutePath = require('../../../images/generateAbsolutePath');

/**
 * @typedef {Object} InputPeople
 * @property {string} profile_path Stores the profile path for the person (Only a partial path)
 * @property {boolean} adult Stores the adult property (Not sure what this does actually :D )
 * @property {number} id Stores the id for the movie e.g. 33243243232
 * @property {KnownFor[]} known_for Stores an array of tv and shows which the user is known for
 * @property {string} name Stores the persons name
 * @property {number} popularity Stores the popularity of the movie e.g. 45.55324
 */

/**
 * @typedef {Object} People
 * @property {number} id Stores the id for the movie e.g. 33243243232
 * @property {string} name Stores the persons name
 * @property {string} posterUrl Stores the absolute path to the poster image for the movie
 * @property {string} roles Stores a list of all the role
 */

/**
 * @typedef {Object} KnownFor
 * @property {string} [name] Stores the original name for the show e.g. Lucifer
 * @property {string} [original_name] Stores the original name for the movie e.g. Lucifer
 * @property {string} [title] Stores the title for the movie e.g. Mad Max: Fury Road
 * @property {string} [original_title] Stores the title for the movie e.g. Mad Max: Fury Road
 * @property {string} [media_type] Stores the media type
 */

/**
 * @description This utility is used in the Popular people resolver, it is used to format the person responses.
 * @param  {InputPeople[]} people
 * @returns {People[]} Returns an array of people, this is used in the popular people query
 */
const setPeople = (people) => {
	/**
	 * @type People[]
	 */
	const People = [];

	people.forEach((person) => {
		/**
		 * @type People
		 * @description This is the new Person object, the properties must match the properties defined in the schema
		 */
		const Person = {
			id: person.id ? person.id : 0,
			name: person.name ?? '',
			posterUrl: generateAbsolutePath(person.profile_path) ?? '',
			roles: ''
		};

		/**
		 * @description Used to store all the persons roles, this array is then joined to create a string
		 * @type {string[]}
		 */
		const roles = [];

		// Loop through each persons role and add the name of the movie or show to the roles array
		person.known_for.forEach((role) => {
			// Checks to see if the media_type is tv (Uses different attributes for the name e.g. original_name or name)
			if (role.media_type === 'tv') {
				let name = role.name ?? '';

				// When the title isn't available try to use the original_name
				if (name === '') {
					name = role.original_name ?? '';
				}

				// Add the tv to the roles array
				roles.push(name);
			}

			// Checks to see if the media_type is movie (Uses different attributes for the name e.g. original_title or title)
			if (role.media_type === 'movie') {
				let name = role.title ?? '';

				// When the title isn't available try to use the original_title
				if (name === '') {
					name = role.original_title ?? '';
				}

				// Add the movie to the roles array
				roles.push(name);
			}

			Person.roles = roles.join(', ');
		});

		People.push(Person);
	});

	return People;
};

module.exports = setPeople;
