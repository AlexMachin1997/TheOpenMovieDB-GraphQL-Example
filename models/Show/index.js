const { gql } = require('apollo-server');

const typeDef = gql`
	type Show {
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
		featuredVideo: Video
		belongsToCollection: BelowsToCollection
		tagline: String
		runtime: String

		Network: [Network]
		numberOfSeasons: Int
		numberOfEpisodes: Int
		originCountry: [String]
		company: [Company]
		currentSeason: CurrentSeason
		type: String
	}
`;

module.exports = typeDef;
