# Discover Form Data

## Overview

The Discover Form Data is a crucial component of the filtering functionality in the project. It is used to handle and process user input for filtering entertainment content, such as movies and TV shows. This allows users to specify various criteria to narrow down their search results, making it easier to find content that matches their preferences.

## Supported Filters

The filtering system supports multiple filters, which are essentially different types of criteria that can be applied. These include:

| Filter Name              | Description                                                                       | Default Value                                            |
| ------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Certifications           | Filters content based on certification ratings like PG, R, etc.                   | []                                                       |
| Original Language        | Filters content by the original language of the media.                            | 'none'                                                   |
| Region                   | Filters content based on geographical regions.                                    | 'US'                                                     |
| Watch Monetization Types | Filters based on how content can be accessed, such as free, ads, rent, etc.       | ['all']                                                  |
| Genres                   | Filters content by genre IDs.                                                     | []                                                       |
| Sort By                  | Allows sorting of content by various criteria like popularity, release date, etc. | 'popularity.desc' (or 'vote_average.desc' for TOP_RATED) |
| Release Types            | Filters based on the type of release, such as theatrical, TV, streaming, etc.     | ['all']                                                  |
| Vote Average             | Filters content based on average user ratings.                                    | {gte: 0, lte: 10}                                        |
| OTT Providers            | Filters content available on specific OTT platforms.                              | []                                                       |
| Runtime                  | Filters content based on runtime duration.                                        | {gte: 0, lte: 400}                                       |
| Vote Count               | Filters based on the number of votes a piece of content has received.             | {gte: 0, lte: null}                                      |

## Default Values

The system can handle default values for certain filters. For example, if a filter like `with_watch_monetization_types` is set to `all`, it can be expanded to include all available options except `all` itself. This is managed by the `FilteringOptionsService`, which provides available options for various filters.

## Integration in the Project

The Discover Form Data is integrated into the project as part of the filtering functionality. It is used in conjunction with the `@filtering` functionality to construct and execute queries that fetch filtered content from external APIs, such as The Open Movie Database.

The filtering service (`DiscoverFilteringService`) processes the form data to generate URL search parameters, which are then used to query the API for content that matches the specified filters. This service is tested extensively to ensure that each filter is applied correctly and that the resulting search parameters are accurate.

## Code References

- **Service Definition and Constructor**:

  - `src/modules/discover/filtering/discover-filtering.service.ts`
    - Lines: 21-28

- **Handling Multi-Filter Logic**:

  - `src/modules/discover/filtering/discover-filtering.service.ts`
    - Lines: 30-48

- **Generating URL Search Parameters**:

  - `src/modules/discover/filtering/discover-filtering.service.ts`
    - Lines: 60-250

- **Testing the Service**:
  - `src/modules/discover/filtering/discover-filtering.service.spec.ts`
    - Lines: 61-234

These components work together to ensure that the filtering functionality is robust and flexible, allowing users to effectively search for content based on their preferences.
