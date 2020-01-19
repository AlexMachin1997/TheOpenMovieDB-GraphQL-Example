const { gql } = require("apollo-server");

const Query = gql`
  type Query {
    SearchForMovies(search: String!): [Movies]
    SearchForShows(search: String): [Shows]

    DiscoverMovies(releaseDate: Int, sortBy: String, genres: String): [Movies]
    DiscoverShows(releaseDate: Int, sortBy: String, genres: String): [Shows]

    SearchForAMovie(name: String!, id: Int!): Movie
    SearchForAShow(name: String, id: Int!): Show

    PopularMovies: [Movies]
    PopularShows: [Shows]

    UpcomingShows: [Shows]
    UpcomingMovies: [Movies]

    NowPlayingShows: [Shows]
    NowPlayingMovies: [Movies]

    TopRatedMovies: [Movies]
    TopRatedShows: [Shows]
  }
`;

module.exports = Query;
