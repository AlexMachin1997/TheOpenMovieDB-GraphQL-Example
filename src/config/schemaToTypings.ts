import { getGraphQLPaths } from './filePaths';

/* eslint-disable @typescript-eslint/naming-convention */
interface ISchemaToTypingsConfig {
	schema: Array<string>;
	outputFormat: 'interface' | 'class' | undefined;
	outputLocation: string;
}

export const schemaToTypingsConfig: ISchemaToTypingsConfig = {
	schema: getGraphQLPaths('relative'),
	outputFormat: 'interface',
	outputLocation: '../graphql/generated/schema.ts'
};
