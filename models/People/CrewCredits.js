const { gql } = require("apollo-server");

const typeDef = gql`
  type CrewCredits {
    id: Int
    department: String
    original_language: String
    episode_count: Int
    job: String
    overview: String
    origin_country: [String]
    original_name: String
    vote_count: Int
    name: String
    media_type: String
    popularity: Float
    credit_id: String
    backdrop_path: String
    first_air_date: String
    vote_average: Float
    genre_ids: [Int]
    poster_path: String
    release_date: String
  }
`;

module.exports = typeDef;
