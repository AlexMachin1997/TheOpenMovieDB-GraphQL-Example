# GraphQL Directory

The GraphQL directory contains all GraphQL schema definitions, resolvers, and related types that define the API structure and capabilities of the application.

## Purpose

- Houses all GraphQL schema files (.graphql)
- Contains resolver implementations
- Defines the API's type system and operations
- Organizes schemas by domain/feature area
- Manages schema generation and typing

## Structure

The directory is organized into:

- `models/` - GraphQL schema definitions grouped by domain
  - `Common/` - Shared types and enums
  - `Entertainment/` - Entertainment-specific schemas
  - `Discover/` - Discovery and search schemas
  - `Person/` - Person/cast/crew schemas
  - `Show/` - TV show schemas
  - `Movie/` - Movie schemas
- `resolvers/` - Resolver implementations for schema operations

## When to Use GraphQL Directory

Use this directory when:

- Adding new API operations or types
- Defining new schema elements
- Implementing resolvers for queries/mutations
- Extending existing schema definitions
- Adding shared GraphQL types or enums

## When Not to Use GraphQL Directory

Don't use this directory for:

- Business logic implementation (use feature modules)
- Database models or schemas
- API documentation (use docs)
- Configuration settings (use config)
- Utility functions (use core/common)

## Best Practices

1. Keep schemas focused and well-organized by domain
2. Maintain consistent naming conventions
3. Use shared types from Common where appropriate
4. Document schema elements with descriptions
5. Ensure schema changes are reflected in TypeScript types
