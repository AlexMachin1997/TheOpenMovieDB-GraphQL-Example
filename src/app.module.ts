import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { MovieModule } from './movie/movie.module';

@Module({
	controllers: [],
	providers: [],
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,

			// Must start with ./src/ for some reason otherwise nestjs doesn't pick up the files grr
			typePaths: [
				// Entertainment specific models, used for the Movie and Show schemas
				'./src/models/entertainment/*.graphql',

				// Individual resource schemas
				'./src/models/Show.graphql',
				'./src/models/Movie.graphql',
				'./src/models/Person.graphql',
				'./src/models/Query.graphql'
			]
		}),
		MovieModule
	]
})
export class AppModule {}
