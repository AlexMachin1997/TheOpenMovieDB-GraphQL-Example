const { gql } = require("apollo-server");

const Query = gql`
  type Query {
    DiscoverMovies(
      sortBy: String
      genres: String
      certifications: String
      userscore: String
      runtime: String
    ): [Movies]

    DiscoverShows(
      sortBy: String
      genres: String
      certifications: String
      userscore: String
      runtime: String
    ): [Shows]

    SearchForAMovie(search: String!, id: Int!): Movie
    SearchForAShow(search: String!, id: Int!): Show
    SearchForAPerson(search: String!, id: Int!): Person

    PopularMovies: [Movies]
    PopularShows: [Shows]
    PopularPeople: [People]

    UpcomingShows: [Shows]
    UpcomingMovies: [Movies]

    NowPlayingShows: [Shows]
    NowPlayingMovies: [Movies]

    TopRatedMovies: [Movies]
    TopRatedShows: [Shows]

    FilterCredits(id: Int!, mediaType: String!): PeopleCredits
  }
`;

module.exports = Query;
