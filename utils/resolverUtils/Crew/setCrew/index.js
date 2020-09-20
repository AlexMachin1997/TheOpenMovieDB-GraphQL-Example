/**
 * The incoming object model
 * @typedef {Object} IncomingCrew
 * @property {string} credit_id Stores the original credit id
 * @property {string} department Stores the department of the crew member
 * @property {number} gender The original crew members gender (Stored in a number format for some reason)
 * @property {number} id The original crew members id
 * @property {string} job The original crew members job e.g. Director
 * @property {string} name The original crew members name
 * @property {string} profile_path The original crew members profile path (profile image)
 */

/**
 * @typedef {Object} Crew
 * @property {string} name - The name for the crew member e.g. Patty Jenkins
 * @property {string} roles - Stores the combined roles for the crew member
 */

/**
 * @description This utility is currently only used for the credits resolver, it created a featured crew for a tv series or movie.
 * @param {IncomingCrew[]} crew
 * @return {Crew[]} Returns an array of cast members which are used to display the featured cast
 */
const setCrew = (crew) => {
	/**
	 * @type {IncomingCrew[]}
	 * @description Stores the filtered crew members
	 */
	let Crew = crew.filter(
		(member) =>
			member.job === 'Director' ||
			member.job === 'Screenplay' ||
			member.job === 'Writer' ||
			member.job === 'Story'
	);

	// Check to see if there are any crew members
	if (Crew.length === 0) return [];

	// Show only the first 6 crew members
	Crew = Crew.slice(0, 6);

	/**
	 * @type {Crew[]}
	 * @description Will store the new crew members once they have been created
	 */
	const NewCrewMembers = [];

	Crew.forEach((member) => {
		// Check to see if the crew member already exists in the array
		if (NewCrewMembers.find((element) => element.name === member.name) === undefined) {
			/**
			 * @type {IncomingCrew[]}
			 * @description Stores all occurrences of the current crew member
			 */
			const CurrentCrewMembersRoles = Crew.filter((i) => i.id === member.id);

			/**
			 * @type {Crew}
			 * @description Stores the new crew members details e.g. name, roles (Joined array)
			 */
			const newCrewMember = {
				name: member.name ?? '',
				roles: ''
			};

			/**
			 * @description Used to store all the crew members roles, this array is then joined to create a string
			 * @type {string[]}
			 */
			const roles = [];

			// Check to see if the crew members has any roles
			if (CurrentCrewMembersRoles.length !== 0) {
				// Push each role to the new roles array
				CurrentCrewMembersRoles.forEach((duplicateCrewMember) =>
					roles.push(duplicateCrewMember.job)
				);

				// Join the array items to form a string e.g. "Story, Producer, Editor"
				newCrewMember.roles = roles.join(', ');
			}

			// Push the new crew member to the NewCrewMembers array
			NewCrewMembers.push(newCrewMember);
		}
	});

	return NewCrewMembers;
};

module.exports = setCrew;
