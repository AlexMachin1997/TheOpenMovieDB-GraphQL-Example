import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { getGraphQLPaths } from './filePaths';

export const graphqlConfig = GraphQLModule.forRoot<ApolloDriverConfig>({
	driver: ApolloDriver,
	playground: true,

	// Must start with src/ for some reason otherwise nestjs doesn't pick up the files grr
	typePaths: getGraphQLPaths('absolute')
});
