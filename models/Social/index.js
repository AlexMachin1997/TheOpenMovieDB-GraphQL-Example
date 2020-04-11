const { gql } = require("apollo-server");

const typeDef = gql`
  type Social {
    id: Int
    imdb_id: String
    facebook_id: String
    instagram_id: String
    twitter_id: String
  }
`;

module.exports = typeDef;
