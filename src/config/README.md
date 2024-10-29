# Config Directory

The Config directory contains application-wide configuration settings, environment variables, and setup code that defines how the application behaves in different environments.

## Purpose

- Centralizes all configuration-related code and settings
- Manages environment-specific variables and settings
- Defines application-wide setup and initialization
- Houses configuration interfaces and types
- Provides configuration factories and providers

## What Goes Here

1. Environment configuration files
2. Service configuration providers
3. Module configuration factories
4. GraphQL and API configurations
5. Type generation configurations
6. Path and file location configurations
7. Global application settings

## When to Use Config

Use the Config directory when:

- Adding new application-wide settings
- Defining environment-specific configurations
- Setting up module or service configurations
- Managing external service connections
- Defining global type generation settings

## When Not to Use Config

Don't use Config for:

- Feature-specific settings (belong in respective modules)
- Business logic or rules
- Utility functions
- Runtime data management
- Local component configurations

## Current Configuration Files

- `graphql.config.ts` - GraphQL module configuration
- `service.config.ts` - Core service settings
- `filePaths.ts` - GraphQL schema file path management
- `schemaToTypings.ts` - TypeScript definitions generation config
