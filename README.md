# The Open Movie DB GraphQL NestJS Example

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://github.com/AlexMachin1997/TheOpenMovieDB-GraphQL-Example/actions" target="_blank"><img src="https://github.com/AlexMachin1997/TheOpenMovieDB-GraphQL-Example/workflows/CI/badge.svg" alt="CI Status" /></a>
  <a href="https://codecov.io/gh/AlexMachin1997/TheOpenMovieDB-GraphQL-Example" target="_blank"><img src="https://codecov.io/gh/AlexMachin1997/TheOpenMovieDB-GraphQL-Example/branch/master/graph/badge.svg" alt="Coverage" /></a>
</p>

A GraphQL API built with NestJS that wraps [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs) to provide movie and TV show data through a GraphQL interface.

## Features

- GraphQL API built with NestJS and Apollo Server
- Integration with TMDB API for movie and TV show data
- Type-safe GraphQL schema with TypeScript
- Environment configuration with validation
- Modular architecture following NestJS best practices
- Comprehensive test coverage with Jest
- Code quality tools (ESLint, Prettier)
- CI/CD pipeline with GitHub Actions

## Prerequisites

- Node.js (v18+)
- Yarn package manager
- TMDB API key (Get one [here](https://developer.themoviedb.org/docs))

## Installation

1. Install Node.js (v18 or higher) from [nodejs.org](https://nodejs.org/)

2. Install Yarn package manager (v4):

   ```bash
   corepack enable
   corepack prepare yarn@4.1.1 --activate
   ```

3. Generate an API token from [TMDB API](https://developer.themoviedb.org/docs/getting-started)

4. Clone the repository:

   ```bash
   git clone https://github.com/AlexMachin1997/TheOpenMovieDB-GraphQL-Example.git
   cd TheOpenMovieDB-GraphQL-Example
   ```

5. Install dependencies:

   ```bash
   yarn install
   ```

6. Create a `.env` file in the root directory and add your TMDB API token:

   ```
   TMDB_API_TOKEN=your_api_token_here
   ```

7. Start the development server:
   ```bash
   yarn start:dev
   ```

The GraphQL playground will be available at http://localhost:3000/graphql
