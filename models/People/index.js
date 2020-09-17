const { gql } = require('apollo-server');

const typeDef = gql`
	type People {
		id: Int
		posterUrl: String
		knownFor: [KnownFor]
		name: String
	}
`;

module.exports = typeDef;
