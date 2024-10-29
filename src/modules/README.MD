# Modules Directory

The Modules directory contains feature-specific implementations organized into self-contained modules that encapsulate related functionality, business logic, and domain models.

## Purpose

- Houses feature-specific implementations and business logic
- Organizes code into cohesive, domain-driven modules
- Contains module-specific services, resolvers, and models
- Implements business rules and domain logic
- Provides feature-specific utilities and helpers

## Structure

Modules are typically organized by domain/feature area:

- `Movie/` - Movie-specific implementations
- `Show/` - TV show related functionality
- `Person/` - Person/cast/crew features
- `Discover/` - Search and discovery features
- `Entertainment/` - Shared entertainment functionality

## When to Use Modules

Use this directory when:

- Implementing new features or domain functionality
- Adding business logic specific to a feature area
- Creating feature-specific services and resolvers
- Implementing domain models and business rules
- Building feature-specific utilities

## When Not to Use Modules

Don't use Modules for:

- Core infrastructure code (use Core)
- Generic utilities (use Core)
- Application-wide configurations (use Config)
- GraphQL schema definitions (use GraphQL)
- Common business logic (use Common)

## Best Practices

1. Keep modules focused on specific domain areas
2. Follow single responsibility principle
3. Maintain clear module boundaries
4. Document module interfaces and APIs
5. Write comprehensive tests for module functionality
6. Use dependency injection for module services
