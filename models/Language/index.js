const { gql } = require("apollo-server");

const typeDef = gql`
  type Language {
    iso_3166_1: String
    name: String
  }
`;

module.exports = {
  Language: typeDef
};
