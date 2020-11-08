const { gql } = require('apollo-server');

const typeDef = gql`
	type BelowsToCollection {
		id: Int
		name: String
		backgroundUrl: String
		posterUrl: String
	}
`;

module.exports = typeDef;
