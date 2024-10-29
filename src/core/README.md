# Core Directory

The Core directory contains fundamental utilities, services, and infrastructure code that serves as the foundation for the application. While it includes some application-specific services, these are considered core infrastructure rather than feature-specific implementations.

## Purpose

- Provides essential services and utilities
- Contains core infrastructure code and base services
- Houses fundamental application services (like entertainment service)
- Implements shared technical utilities
- Offers base patterns and solutions used throughout the app

## What Goes Here

1. Base services that power the application (entertainment service, etc.)
2. Technical infrastructure code (logging, error handling)
3. Framework extensions and utilities
4. Core service implementations
5. Common technical patterns (decorators, mixins, etc.)
6. Essential application-wide utilities

## When to Use Core

Use the Core directory when:

- Implementing foundational services needed across features
- Creating base infrastructure components
- Adding essential application services
- Building core technical utilities
- Developing services that other features depend on

## When Not to Use Core

Don't use Core for:

- Feature-specific implementations (use feature modules)
- One-off utilities (belong in specific features)
- UI components or views
- Feature-specific business logic
- Temporary or experimental code

## Best Practices

1. Keep Core services focused and well-defined
2. Document services and utilities thoroughly
3. Write comprehensive unit tests for Core components
4. Consider dependencies carefully - Core services should be foundational
5. Design Core services to be stable and reliable as features depend on them
