const { gql } = require("apollo-server");

const MovieModel = gql`
  type Movie {
    adult: Boolean
    backdrop_path: String
    belongs_to_collection: String
    budget: String
    genres: [Genre]
    homepage: String
    id: Int
    imdb_id: String
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    production_companies: [Company]
    production_countries: [Language]
    release_date: String
    revenue: String
    runtime: Int
    spoken_languages: [Language]
    status: String
    tagline: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    reviews: [Review]
    recomendations: [Movie]
    keywords: [Keyword]
    social: Social
    cast: [Cast]
    crew: [Crew]
    videos: [Video]
  }
`;

module.exports = MovieModel;
