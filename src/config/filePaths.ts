/* eslint-disable @typescript-eslint/naming-convention */
import { join } from 'path';

const GRAPHQL_BASE_PATH = 'graphql';
/**
 * Gets the GraphQL schema file paths in either absolute or relative format
 *
 * Two different path formats are needed for different use cases:
 *
 * 1. Absolute paths (starting with 'src/'):
 *    - Required by NestJS GraphQL module to properly load schema files
 *    - Used in app.module.ts via graphql.config.ts for runtime schema loading
 *    - The NestJS GraphQL module specifically requires paths to start with 'src/'
 *      to properly resolve and watch schema files during development
 *    - Example: 'src/graphql/models/Query.graphql'
 *
 * 2. Relative paths (from project root):
 *    - Required by GraphQLDefinitionsFactory for TypeScript interface generation
 *    - Used in schema-to-typings.ts which runs as a separate process outside NestJS
 *    - Since this runs as a separate script, it needs full filesystem paths relative
 *      to the project root to locate the schema files
 *    - Example: '/path/to/project/graphql/models/Query.graphql'
 *
 * This dual path handling ensures both:
 * - Runtime schema loading works correctly in the NestJS application
 * - Type generation script can find and process schema files from the command line
 *
 * @param pathType - Whether to return absolute or relative paths
 * @returns Array of GraphQL schema file paths in the requested format
 */
export function getGraphQLPaths(pathType: 'absolute' | 'relative' = 'absolute') {
	const graphqlPaths = [
		// Enums used by all the graphql schemas
		'models/Common/CommonEnums.graphql',
		'models/Common/CommonPagination.graphql',

		// Entertainment specific models
		'models/Entertainment/BelongsToCollection.graphql',
		'models/Entertainment/Cast.graphql',
		'models/Entertainment/Company.graphql',
		'models/Entertainment/Crew.graphql',
		'models/Entertainment/Genre.graphql',
		'models/Entertainment/Keyword.graphql',
		'models/Entertainment/Recommendation.graphql',
		'models/Entertainment/Review.graphql',
		'models/Entertainment/Social.graphql',
		'models/Entertainment/Video.graphql',

		// Discover specific models
		'models/Discover/RangeFilters.graphql',
		'models/Discover/FiltersInput.graphql',
		'models/Discover.graphql',
		'models/Discover/DiscoverResult.graphql',
		'models/Discover/FiltersFormData.graphql',

		// Person specific models
		'models/Person/CreditGroup.graphql',
		'models/Person/Credit.graphql',
		'models/Person/Person.graphql',

		// Individual resource schemas
		'models/Show/Show.graphql',
		'models/Movie/Movie.graphql',
		'models/Person/Person.graphql',

		'models/Query.graphql'
	];

	if (pathType === 'absolute') {
		// For NestJS GraphQL module (absolute paths starting with src/)
		return graphqlPaths.map((path) => `src/${GRAPHQL_BASE_PATH}/${path}`);
	}

	// For GraphQLDefinitionsFactory (relative paths from project root)
	return graphqlPaths.map((path) => join(process.cwd(), `../${GRAPHQL_BASE_PATH}/${path}`));
}
