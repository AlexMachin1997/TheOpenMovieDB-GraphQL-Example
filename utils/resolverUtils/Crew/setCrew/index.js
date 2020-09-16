/**
 *
 * A Crew Member
 * @typedef {Object} Crew
 * @property {string} name - The name for the crew member e.g. Patty Jenkins
 * @property {any} roles - Stores the combined roles for the crew member
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
	const Crew = crew.filter(
		(member) =>
			member.job === 'Director' ||
			member.job === 'Screenplay' ||
			member.job === 'Writer' ||
			member.job === 'Story'
	);

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
					roles: []
				};

				// When the length isn't 0
				if (CurrentCrewMembersRoles.length !== 0) {
					// For each role of the current crew member push the job to the roles array
					CurrentCrewMembersRoles.forEach((duplicateCrewMember) =>
						newCrewMember.roles.push(duplicateCrewMember.job)
					);

					// Turn the array into a string to form something like "directory, story"
					newCrewMember.roles = newCrewMember.roles.join(', ');
				}

				NewCrewMembers.push(newCrewMember);
			}
		}
	);

	return NewCrewMembers;
};

module.exports = setCrew;
