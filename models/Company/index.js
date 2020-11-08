const { gql } = require('apollo-server');

const typeDef = gql`
	type Company {
		id: Int
		logo: String
		name: String
	}
`;

module.exports = typeDef;
