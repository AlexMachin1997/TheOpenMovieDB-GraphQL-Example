const { gql } = require('apollo-server');

const typeDef = gql`
	type CurrentSeason {
		image: String
		season_number: Int
		year: String
		episode_count: Int
		overview: String
	}
`;

module.exports = typeDef;
