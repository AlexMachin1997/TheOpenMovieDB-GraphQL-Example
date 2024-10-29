/* eslint-disable no-console */
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

import { schemaToTypingsConfig } from '../config/schemaToTypings';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory
	.generate({
		typePaths: schemaToTypingsConfig.schema,
		path: schemaToTypingsConfig.outputLocation,
		outputAs: schemaToTypingsConfig.outputFormat,
		watch: false,
		emitTypenameField: true
	})
	.catch((err: unknown) => {
		console.log('Failed to generate the type definitions from the graphql schemas', err);
	});
