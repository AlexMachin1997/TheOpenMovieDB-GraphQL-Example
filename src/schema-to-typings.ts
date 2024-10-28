/* eslint-disable no-console */
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

const typeDefinitionOutput = join(process.cwd(), 'graphql.schema.ts');

const typeDefinitionOutputFormat = 'interface';

const schemas = [
	// Enums used by all the graphql schemas
	'./models/enum.graphql',
	'./models/Pagination.graphql',

	// Entertainment specific models, used for the Movie and Show schemas
	'./models/entertainment/BelongsToCollection.graphql',
	'./models/entertainment/Cast.graphql',
	'./models/entertainment/Company.graphql',
	'./models/entertainment/Crew.graphql',
	'./models/entertainment/Genre.graphql',
	'./models/entertainment/Keyword.graphql',
	'./models/entertainment/Recommendation.graphql',
	'./models/entertainment/Review.graphql',
	'./models/entertainment/Social.graphql',
	'./models/entertainment/Video.graphql',
	'./models/Discover.graphql',

	// Individual resource schemas
	'./models/Show.graphql',
	'./models/Movie.graphql',
	'./models/Person.graphql',

	'./models/Query.graphql'
];

definitionsFactory
	.generate({
		typePaths: schemas,
		path: typeDefinitionOutput,
		outputAs: typeDefinitionOutputFormat,
		watch: false,
		emitTypenameField: true
	})
	.catch((err: unknown) => {
		console.log('Failed to generate the type definitions from the graphql schemas', err);
	});
