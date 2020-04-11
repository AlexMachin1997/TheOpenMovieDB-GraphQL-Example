const { gql } = require("apollo-server");

const typeDef = gql`
  type Review {
    author: String
    content: String
    id: String
    url: String
  }
`;

module.exports = typeDef;
