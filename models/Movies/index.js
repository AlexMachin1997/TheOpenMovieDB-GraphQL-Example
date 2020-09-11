const { gql } = require('apollo-server');

const MoviesModel = gql`
	type Movies {
		id: Int
		name: String
		overview: String
		backgroundUrl: String
		posterUrl: String
		genres: [Int]
		releaseDate: String
		originalLanguage: String
		voteAverage: Float
		popularity: Float
	}
`;

module.exports = MoviesModel;
