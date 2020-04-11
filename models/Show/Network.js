const { gql } = require("apollo-server");

const typeDef = gql`
  type Network {
    name: String
    id: Int
    logo_path: String
    origin_country: String
  }
`;

module.exports = typeDef;
