const { gql } = require('apollo-server');

const MovieModel = gql`
	type Movies {
		popularity: Float
		vote_count: Int
		video: Boolean
		poster_path: String
		id: Int
		adult: Boolean
		backdrop_path: String
		original_language: String
		original_title: String
		genre_ids: [Int]
		title: String
		vote_average: Float
		overview: String
		release_date: String
	}
`;

module.exports = MovieModel;
