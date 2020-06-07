const { gql } = require('apollo-server');

const typeDef = gql`
	type Crew {
		credit_id: String
		department: String
		gender: Int
		id: Int
		job: String
		name: String
		profile_path: String
	}
`;

module.exports = typeDef;
