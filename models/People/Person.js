const { gql } = require("apollo-server");

const typeDef = gql`
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
`;

module.exports = typeDef;
