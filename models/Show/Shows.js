const { gql } = require('apollo-server');

const typeDef = gql`
	type Shows {
		id: String
		name: String
		overview: String
		backgroundUrl: String
		posterUrl: String
		genres: [Int]
		releaseDate: String
		originalLanguage: String
		voteAverage: Float
	}
`;

module.exports = typeDef;
