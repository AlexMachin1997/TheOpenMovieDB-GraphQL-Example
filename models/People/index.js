const { gql } = require("apollo-server");

const typeDef = gql`
  type People {
    profile_path: String
    adult: Boolean
    id: Int
    known_for: [KnownFor]
    name: String
    popularity: Int
  }

  type KnownFor {
    poster_path: String
    adult: Boolean
    overview: String
    release_date: String
    original_title: String
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

  type Person {
    popularity: Float
    known_for_department: String
    name: String
    id: Int
    profile_path: String
    adult: Boolean
    gender: Int
    tv_credits: [PersonCredits]
    movie_credits: [PersonCredits]
  }

  type PersonCredits {
    credit_id: String
    original_name: String
    id: Int
    genre_ids: [Int]
    character: String
    name: String
    poster_path: String
    vote_count: Int
    vote_average: Float
    popularity: Float
    episode_count: Int
    original_language: String
    first_air_date: String
    backdrop_path: String
    overview: String
    origin_country: [Int]
  }
`;

module.exports = typeDef;
