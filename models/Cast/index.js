const { gql } = require('apollo-server');

const typeDef = gql`
	type Cast {
		id: Int
		character: String
		profileImageUrl: String
		gender: String
		episodeCount: Int
	}
`;

module.exports = typeDef;
