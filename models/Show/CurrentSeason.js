const { gql } = require('apollo-server');

const typeDef = gql`
	type CurrentSeason {
		backgroundUrl: String
		seasonNumber: Int
		year: String
		episodeCount: Int
		overview: String
	}
`;

module.exports = typeDef;
