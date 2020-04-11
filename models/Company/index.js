const { gql } = require("apollo-server");

const typeDef = gql`
  type Company {
    id: Int
    logo_path: String
    name: String
    origin_country: String
  }
`;

module.exports = typeDef;
