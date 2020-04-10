const { gql } = require("apollo-server");

const typeDef = gql`
  type CastCredits {
    id: Int
    original_language: String
    episode_count: Int
    overview: String
    origin_country: [String]
    original_name: String
    genre_ids: [Int]
    media_type: String
    poster_path: String
    first_air_date: String
    vote_average: Float
    vote_count: Int
    character: String
    backdrop_path: String
    popularity: Float
    credit_id: String
    release_date: String
    original_title: String
  }
`;

module.exports = typeDef;
