const { gql } = require('apollo-server');

const typeDef = gql`
	type Shows {
		poster_path: String
		popularity: Float
		id: Int
		backdrop_path: String
		vote_average: Float
		overview: String
		release_date: String
		genre_ids: [Int]
		original_language: String
		vote_count: Int
		name: String
		original_name: String
	}
`;

module.exports = typeDef;
