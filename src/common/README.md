# Common Directory

The Common directory is dedicated to shared code that is specific to the application's business logic and domain models, but needs to be reused across multiple features. Unlike core utilities, items in Common are tied to the application's domain concepts.

## Purpose

- Houses shared business logic and domain-specific utilities
- Provides reusable components that implement business rules
- Contains shared types and interfaces related to domain models
- Centralizes common validation logic and business constraints

## Examples of What Goes Here

1. Shared business validation rules
2. Common domain model transformations
3. Business-specific utility functions
4. Shared domain interfaces and types
5. Common business calculations or formulas

## When to Use Common

Use the Common directory when:

- The code implements business rules needed by multiple features
- You have domain-specific logic that's reused across different modules
- You need to share business validation or transformation logic
- Multiple features need access to the same domain-specific utilities

## When Not to Use Common

Don't use Common for:

- Generic utility functions (use Core instead)
- Framework-specific code
- Infrastructure concerns
- Pure technical utilities with no business logic
