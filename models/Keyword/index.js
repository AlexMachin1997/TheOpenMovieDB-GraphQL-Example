const { gql } = require("apollo-server");

const typeDef = gql`
  type Keyword {
    id: String
    name: String
  }
`;

module.exports = {
  Keyword: typeDef
};
