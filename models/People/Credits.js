const { gql } = require('apollo-server');

const typeDef = gql`
	type Credits {
		releaseDate: String
		title: String
		episodeCount: String
		mediaType: String
		role: String
	}
`;

module.exports = typeDef;
