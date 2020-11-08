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
		featuredCast: [Cast]
		featuredCrew: [Crew]
		featuredVideo: Video
		belongsToCollection: BelowsToCollection
		tagline: String
		runtime: String

		budget: String
		revenue: String
	}
`;

module.exports = MovieModel;
