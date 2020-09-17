const generateAbsolutePath = require('../../../images/generateAbsolutePath');

/**
 * @typedef {Object} InputPeople
 * @property {string} profile_path
 * @property {boolean} adult
 * @property {number} id
 * @property {KnownFor[]} known_for
 * @property {string} name
 * @property {number} popularity
 */

/**
 * @typedef {Object} People
 * @property {number} id
 * @property {string} name
 * @property {string} posterUrl
 * @property {string} roles
 */

/**
 * @typedef {Object} KnownFor
 * @property {number} [name]
 * @property {string} [original_name]
 * @property {string} [title]
 * @property {string} [original_title]
 * @property {string} media_type
 */

/**
 * @description Returns an array of popular people
 * @param  {InputPeople[]} people
 * @return {People[]} Returns an array of people, this is used in the popular people query
 */
const setPeople = (people) => {
	/**
	 * @type People[]
	 */
	const People = [];

	people.forEach(
		/**
		 * @type Person
		 */
		(person) => {
			/**
			 * @type People
			 */
			const Person = {
				id: String(person.id) ? person.id : 0,
				name: person.name ?? '',
				posterUrl: generateAbsolutePath(person.profile_path) ?? '',
				roles: ''
			};

			const roles = [];

			person.known_for.forEach((role) => {
				if (role.media_type === 'tv') {
					let name = String(role.name) ?? '';

					if (name === '') {
						name = String(role.original_name) ?? '';
					}

					roles.push(name);
				}

				if (role.media_type === 'movie') {
					let name = String(role.title) ?? '';

					if (name === '') {
						name = String(role.original_title) ?? '';
					}

					roles.push(name);
				}

				Person.roles = roles.join(', ');
			});

			People.push(Person);
		}
	);

	return People;
};

module.exports = setPeople;
