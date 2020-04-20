const { gql } = require("apollo-server");

const typeDef = gql`
  type Credits {
    release_date: String
    original_title: String
    episode_count: String
    first_air_date: String
    media_type: String
  }
`;

module.exports = typeDef;
