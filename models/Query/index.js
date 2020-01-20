const { gql } = require("apollo-server");

const Query = gql`
  type Query {
    SearchForMovies(search: String!): [Movies]
    SearchForShows(search: String!): [Shows]
    SearchForPeople(search: String!): [People]

    DiscoverMovies(releaseDate: Int, sortBy: String, genres: String): [Movies]
    DiscoverShows(releaseDate: Int, sortBy: String, genres: String): [Shows]

    SearchForAMovie(name: String!, id: Int!): Movie
    SearchForAShow(name: String!, id: Int!): Show
    SearchForAPerson(name: String!, id: Int!): Person

    PopularMovies: [Movies]
    PopularShows: [Shows]
    PopularPeople: [People]

    UpcomingShows: [Shows]
    UpcomingMovies: [Movies]

    NowPlayingShows: [Shows]
    NowPlayingMovies: [Movies]

    TopRatedMovies: [Movies]
    TopRatedShows: [Shows]
  }
`;

module.exports = Query;
