const { gql } = require('apollo-server');

const typeDef = gql`
	type Crew {
		name: String
		roles: String
	}
`;

module.exports = typeDef;
