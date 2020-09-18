const { gql } = require('apollo-server');

const typeDef = gql`
	type Person {
		id: Int
		birthday: String
		knowForDepartment: String
		name: String
		alsoKnownAs: [String]
		gender: String
		overview: String # Biography
		placeOfBirth: String
		posterUrl: String # profile_path
		credits: [PeopleCredits]
		social: Social
		homepage: String
	}

	type PeopleCredits {
		ActingGroup: [Credits]
		ProductionGroup: [Credits]
		WritingGroup: [Credits]
		DirectingGroup: [Credits]
		CrewGroup: [Credits]
	}
`;

module.exports = typeDef;
