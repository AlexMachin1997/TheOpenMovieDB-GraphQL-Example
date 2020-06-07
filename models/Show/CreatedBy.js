const { gql } = require('apollo-server');

const typeDef = gql`
	type CreatedBy {
		id: Int
		credit_id: String
		name: String
		gender: Int
		profile_path: String
	}
`;

module.exports = typeDef;
