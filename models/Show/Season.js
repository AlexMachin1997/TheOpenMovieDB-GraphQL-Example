const { gql } = require('apollo-server');

const typeDef = gql`
	type Season {
		air_date: String
		episode_count: Int
		id: Int
		name: String
		overview: String
		poster_Path: String
		season_number: Int
	}
`;

module.exports = typeDef;
