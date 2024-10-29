# Scripts Directory

The Scripts directory contains utility scripts and tools that support development, build processes, and maintenance tasks for the application.

## Purpose

- Houses development and build automation scripts
- Contains code generation and maintenance utilities
- Provides tooling for common development tasks
- Manages schema and type generation scripts
- Implements data processing and migration tools

## What Goes Here

1. Build and compilation scripts
2. Code generation utilities
3. Database migration scripts
4. Development helper tools
5. Type generation scripts
6. Data processing utilities
7. Maintenance and cleanup scripts

## When to Use Scripts

Use the Scripts directory when:

- Creating new development automation tools
- Adding build process scripts
- Implementing code generation utilities
- Building data migration tools
- Creating maintenance scripts
- Adding type generation utilities

## When Not to Use Scripts

Don't use Scripts for:

- Application runtime code
- Business logic implementation
- Configuration settings (use Config)
- Core utilities (use Core)
- Feature-specific code (use Modules)

## Best Practices

1. Document script usage and parameters
2. Include clear error handling
3. Make scripts configurable where appropriate
4. Follow consistent naming conventions
5. Add logging for important operations
6. Test scripts thoroughly before committing

## Current Scripts

- `schema-to-typings.ts` - Generates TypeScript types from GraphQL schemas
