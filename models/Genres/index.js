const { gql } = require("apollo-server");

const typeDef = gql`
  type Genre {
    id: Int
    name: String
  }
`;

module.exports = typeDef;
