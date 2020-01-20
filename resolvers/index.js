// Reviews resolvers
const { MovieReviewResolver, ShowReviewResolver } = require("./Reviews");

// Cast resolvers
const { MovieCastResolver, ShowCastResolver } = require("./Cast");

// Crew resolvers
const { MovieCrewResolver, ShowCrewResolver } = require("./Crew");

// Reccomendation resolvers
const {
  MovieReccomendationsResolver,
  ShowReccomendationsResolver
} = require("./Reccomendations");

// Keyword resolver
const { MovieKeywordResolver, ShowKeywordResolver } = require("./Keywords");

// Social resolver
const { MovieSocialResolver, ShowSocialResolver } = require("./Social");

// Search for a movie/show resolvers
const {
  SearchForAMovieResolver,
  SearchForAShowResolver,
  SearchForAPersonResolver
} = require("./SingleItemLookup");

// Discover resolvers
const { DiscoverMoviesResolver, DiscoverShowsResolver } = require("./Discover");

// Search resolvers
const {
  SearchForMoviesResolver,
  SearchForShowsResolver,
  SearchForPeopleResolver
} = require("./Search");

// Popular resolvers
const {
  PopularShowsResolver,
  PopularMoviesResolver,
  PopularPeopleResolver
} = require("./Popular");

// NowPlaying resolvers
const {
  NowPlayingShowsResolver,
  NowPlayingMovieResolver
} = require("./NowPlaying");

// Upcoming resolvers
const { UpcomingShowsResolver, UpcomingMoviesResolver } = require("./Upcoming");

// TopRated resolvers
const { TopRatedMoviesResolver, TopRatedShowsResolver } = require("./TopRated");

// Video resolvers
const { MovieVideoResolver, ShowVideoResolver } = require("./Videos");

// Credits resolver
const { MovieCreditsResolver, ShowCreditsResolver } = require("./Credits");

const resolvers = {
  // Additional show data lookup (Show refers to the model, the single person lookup id is used to retriveve the additional data)
  Movie: {
    reviews: MovieReviewResolver,
    cast: MovieCastResolver,
    crew: MovieCrewResolver,
    reccomendations: MovieReccomendationsResolver,
    keywords: MovieKeywordResolver,
    social: MovieSocialResolver,
    videos: MovieVideoResolver
  },

  // Additional show data lookup (Show refers to the model, the single show lookup id is used to retriveve the additional data)
  Show: {
    reviews: ShowReviewResolver,
    cast: ShowCastResolver,
    crew: ShowCrewResolver,
    reccomendations: ShowReccomendationsResolver,
    keywords: ShowKeywordResolver,
    social: ShowSocialResolver,
    videos: ShowVideoResolver
  },

  Person: {
    tv_credits: ShowCreditsResolver,
    movie_credits: MovieCreditsResolver
  },

  Query: {
    // SingleItemLookup
    SearchForAMovie: SearchForAMovieResolver,
    SearchForAShow: SearchForAShowResolver,
    SearchForAPerson: SearchForAPersonResolver,

    // Search
    SearchForMovies: SearchForMoviesResolver,
    SearchForShows: SearchForShowsResolver,
    SearchForPeople: SearchForPeopleResolver,

    // Discover
    DiscoverMovies: DiscoverMoviesResolver,
    DiscoverShows: DiscoverShowsResolver,

    // Popular
    PopularMovies: PopularMoviesResolver,
    PopularShows: PopularShowsResolver,
    PopularPeople: PopularPeopleResolver,

    // NowPlaying
    NowPlayingShows: NowPlayingShowsResolver,
    NowPlayingMovies: NowPlayingMovieResolver,

    // Upcoming resolvers
    UpcomingShows: UpcomingShowsResolver,
    UpcomingMovies: UpcomingMoviesResolver,

    TopRatedMovies: TopRatedMoviesResolver,
    TopRatedShows: TopRatedShowsResolver
  }
};

module.exports = {
  RootQuery: resolvers
};
