const { gql } = require('apollo-server');

const typeDef = gql`
	type Credits {
		releaseDate: String
		title: String
		episodeCount: String
		mediaType: String
	}
`;

module.exports = typeDef;
