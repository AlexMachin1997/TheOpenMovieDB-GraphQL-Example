const { gql } = require("apollo-server");

const typeDef = gql`
  type Show {
    backdrop_path: String
    created_by: [CreatedBy]
    episode_run_time: String
    genres: [Genre]
    homepage: String
    id: Int
    in_production: Boolean
    languages: [String]
    last_air_date: String
    last_episode_to_air: LastEpisodeToAir
    name: String
    next_episode_to_air: LastEpisodeToAir
    networks: [Network]
    number_of_episodes: Int
    number_of_seasons: Int
    origin_country: [String]
    original_language: String
    original_name: String
    overview: String
    popularity: Int
    poster_path: String
    production_companies: [Company]
    seasons: [Season]
    status: String
    type: String
    vote_average: Int
    vote_count: Int
    reviews: [Review]
    reccomendations: [Movie]
    keywords: [Keyword]
    social: Social
    cast: [Cast]
    crew: [Crew]
    videos: [Video]
  }

  type Shows {
    poster_path: String
    popularity: Float
    id: Int
    backdrop_path: String
    vote_average: Int
    overview: String
    first_air_date: String
    origin_country: [String]
    genre_ids: [Int]
    original_language: String
    vote_count: Int
    name: String
    original_name: String
  }
`;

module.exports = typeDef;
