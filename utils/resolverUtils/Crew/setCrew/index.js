/**
 *
 * A Crew Member
 * @typedef {Object} Crew
 * @property {string} name - The name for the crew member e.g. Patty Jenkins
 * @property {string} roles - Stores the combined roles for the crew member
 */

/**
 * The incoming object model
	* @typedef {Object} IncomingCrew
	* @property {string} credit_id
	* @property {string} department
	* @property {number} gender
	* @property {number} id
	* @property {string} job
	* @property {string} name
	* @property {string} profile_path

	*/

/**
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

	// Show only the first 6 crew members
	Crew = Crew.slice(0, 6);

	/**
	 * @type {Crew[]}
	 * @description Will store the new crew members once they have been created
	 */
	const NewCrewMembers = [];

	// Check to see if there are any crew members
	if (Crew.length === 0) return [];

	Crew.forEach(
		/**
		 * @type {Crew}
		 */
		(member) => {
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

				NewCrewMembers.push(newCrewMember);
			}
		}
	);

	return NewCrewMembers;
};

module.exports = setCrew;
