const { gql } = require("apollo-server");

const typeDef = gql`
  type Video {
    id: String
    iso_639_1: String
    iso_3166_1: String
    key: String
    name: String
    site: String
    size: Int
    type: String
  }
`;

module.exports = typeDef;
