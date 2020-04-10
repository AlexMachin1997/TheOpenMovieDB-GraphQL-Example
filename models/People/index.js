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
`;

module.exports = typeDef;
