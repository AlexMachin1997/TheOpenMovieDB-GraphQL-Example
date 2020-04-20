const { gql } = require("apollo-server");

const typeDef = gql`
  type KnownFor {
    poster_path: String
    adult: Boolean
    overview: String
    release_date: String
    original_title: String
    original_name: String
    genre_ids: [Int]
    id: Int
    media_type: String
    original_language: String
    title: String
    backdrop_path: String
    popularity: Float
    vote_count: Int
    video: Boolean
    vote_average: Float
  }
`;

module.exports = typeDef;
