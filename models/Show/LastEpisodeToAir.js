const { gql } = require("apollo-server");

const typeDef = gql`
  type LastEpisodeToAir {
    air_date: String
    episode_number: Int
    id: Int
    name: String
    overview: String
    production_code: String
    season_number: Int
    show_id: Int
    still_path: String
    vote_average: Int
    vote_count: Int
  }
`;

module.exports = typeDef;
