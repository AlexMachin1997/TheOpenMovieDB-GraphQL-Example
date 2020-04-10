const { gql } = require("apollo-server");

const typeDef = gql`
  type People {
    profile_path: String
    adult: Boolean
    id: Int
    known_for: [KnownFor]
    name: String
    popularity: Float
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
    birthday: String
    known_for_department: String
    deathday: String
    id: Int
    name: String
    also_known_as: [String]
    gender: String
    biography: String
    popularity: Float
    place_of_birth: String
    profile_path: String
    adult: Boolean
    imdb_id: String
    homepage: String
    Cast: [CastCredits]
    Crew: [CrewCredits]
  }

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
