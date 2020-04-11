const { gql } = require("apollo-server");

const Query = gql`
  type Query {
    DiscoverMovies(releaseDate: Int, sortBy: String, genres: String): [Movies]
    DiscoverShows(releaseDate: Int, sortBy: String, genres: String): [Shows]

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
  }
`;

module.exports = Query;
