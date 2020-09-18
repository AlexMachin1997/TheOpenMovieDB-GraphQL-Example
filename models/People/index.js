const { gql } = require('apollo-server');

const typeDef = gql`
	type People {
		id: Int
		name: String
		posterUrl: String
		roles: String
	}
`;

module.exports = typeDef;
