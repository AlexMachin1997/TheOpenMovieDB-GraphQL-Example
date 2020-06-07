const { makeExecutableSchema } = require('apollo-server');

// Generic models for specific sets of data e.g. Cast, Genre etc
const Cast = require('./models/Cast');
const Company = require('./models/Company');
const Crew = require('./models/Crew');
const Genre = require('./models/Genres');
const Keyword = require('./models/Keyword');
const Language = require('./models/Language');
const Social = require('./models/Social');
const Review = require('./models/Review');

// Person Models
const People = require('./models/People');
const KnownFor = require('./models/People/KnownFor');
const Person = require('./models/People/Person');
const Credits = require('./models/People/Credits');

// Show Models
const CreatedBy = require('./models/Show/CreatedBy');
const LastEpisodeToAir = require('./models/Show/LastEpisodeToAir');
const Network = require('./models/Show/Network');
const Season = require('./models/Show/Season');
const CurrentSeason = require('./models/Show/CurrentSeason');

// Main models e.g. SingleMovie, TV, People etc
const Query = require('./models/Query');
const Show = require('./models/Show');
const Video = require('./models/Videos');

const Movies = require('./models/Movies');
const Movie = require('./models/Movies/Movie');

// Resolvers
const { RootQuery } = require('./resolvers');

const stuff = makeExecutableSchema({
	typeDefs: [
		Query,
		Cast,
		Company,
		Crew,
		Genre,
		Keyword,
		Language,
		Social,
		Review,
		CreatedBy,
		LastEpisodeToAir,
		Network,
		Season,
		Show,
		Movie,
		Video,
		Person,
		KnownFor,
		Movie,
		Movies,
		People,
		CurrentSeason,
		Credits
	],
	resolvers: RootQuery
});

module.exports = {
	schema: stuff
};
