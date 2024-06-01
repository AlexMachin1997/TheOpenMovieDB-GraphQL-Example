/* eslint-disable no-console */
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

const typeDefinitionOutput = join(process.cwd(), 'graphql.schema.ts');

const typeDefinitionOutputFormat = 'interface';

const schemas = [
	// Entertainment specific models, used for the Movie and Show schemas
	'./models/entertainment/*.graphql',

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
