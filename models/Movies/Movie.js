const { gql } = require('apollo-server');

const MovieModel = gql`
	type Movie {
		id: Int
		name: String
		overview: String
		backgroundUrl: String
		posterUrl: String
		genres: [Genre]
		homepage: String
		originalLanguage: String
		productionCompanies: [Company]
		releaseDate: String
		voteAverage: Float
		status: String
		reviews: [Review]
		recommendations: [Movie]
		keywords: [Keyword]
		social: Social
		cast: [Cast]
		videos: [Video]
		belongsToCollection: BelowsToCollection
		tagline: String

		budget: String
		revenue: String
		runtime: String
	}
`;

module.exports = MovieModel;
