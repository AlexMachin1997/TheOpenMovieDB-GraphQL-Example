import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { EntertainmentModule } from './entertainment/entertainment.module';
import { MovieModule } from './movie/movie.module';
import { UtilsModule } from './utils/utils.module';

@Module({
	controllers: [],
	providers: [],
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,

			// Must start with ./src/ for some reason otherwise nestjs doesn't pick up the files grr
			typePaths: [
				// Enums used by all the graphql schemas
				'./src/models/enum.graphql',

				// Entertainment specific models, used for the Movie and Show schemas
				'./src/models/entertainment/BelongsToCollection.graphql',
				'./src/models/entertainment/Cast.graphql',
				'./src/models/entertainment/Company.graphql',
				'./src/models/entertainment/Crew.graphql',
				'./src/models/entertainment/Genre.graphql',
				'./src/models/entertainment/Keyword.graphql',
				'./src/models/entertainment/Recommendation.graphql',
				'./src/models/entertainment/Review.graphql',
				'./src/models/entertainment/Social.graphql',
				'./src/models/entertainment/Video.graphql',

				// Individual resource schemas
				'./src/models/Show.graphql',
				'./src/models/Movie.graphql',
				'./src/models/Person.graphql',

				'./src/models/Query.graphql'
			]
		}),
		MovieModule,
		UtilsModule,
		EntertainmentModule
	]
})
export class AppModule {}
