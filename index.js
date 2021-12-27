// @ts-nocheck
require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginCacheControl } = require('apollo-server-core');

const { schema } = require('./schema');

// Create the ApolloServer instance and pass in the transformed GraphQL schemas (Models) and resolvers (Controllers)
const server = new ApolloServer({
	schema,
	plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 3600000 })] // 1 hour
});

// Start listening to the ApolloServer for GraphQL queries like DiscoverMovies(relaseDate: 2019)
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
