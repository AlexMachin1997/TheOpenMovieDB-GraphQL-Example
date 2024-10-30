# Discover Module

The `@discover` module is designed to facilitate the discovery of movies and TV shows through a variety of filters and sorting options. It integrates with external APIs to fetch and display entertainment content based on user preferences and criteria.

## Purpose

The primary purpose of the `@discover` module is to provide a comprehensive and flexible way to search for and filter entertainment content. It allows users to customize their search using various filters, ensuring that they can find content that matches their interests and viewing habits.

### Key Components

- **DiscoverFormDataService**: Manages the form data logic, including setting up filters and default values.
- **DiscoverFilteringService**: Handles the construction of search parameters and fetching data from external APIs.
- **FilteringOptionsService**: Provides options for various filters, such as genres, certifications, and OTT providers.

## Available Filters

The following table shows all available filters and their default values from the DiscoverFormDataService:

| Filter Name           | Parameter                     | Default Value                                        | Description                     |
| --------------------- | ----------------------------- | ---------------------------------------------------- | ------------------------------- |
| Sort By               | sort_by                       | popularity.desc (or vote_average.desc for TOP_RATED) | Controls result sorting order   |
| Show Me               | show_me                       | First option from showMeRadioOptions                 | Filters content visibility      |
| Availabilities        | with_watch_monetization_types | ['all']                                              | Filters by content availability |
| Genres                | with_genres                   | []                                                   | Filters by selected genres      |
| Certifications        | certifications                | []                                                   | Filters by content ratings      |
| Release Types         | with_release_types            | ['all']                                              | Filters by release format       |
| Original Language     | with_original_language        | 'none'                                               | Filters by original language    |
| Region                | region                        | 'US'                                                 | Filters by region               |
| Vote Average          | vote_average                  | {gte: 0, lte: 10}                                    | Filters by rating range         |
| Runtime               | with_runtime                  | {gte: 0, lte: 400}                                   | Filters by content length       |
| Vote Count            | vote_count                    | {gte: 0, lte: null}                                  | Filters by number of votes      |
| First Air Date Search | search_first_air_date         | true for TV, false for Movies                        | Toggle first air date search    |
| Restrict Services     | restrict_services             | false                                                | Restricts service providers     |
| OTT Providers         | with_ott_providers            | []                                                   | Filters by streaming services   |
| Release Date          | release_date                  | Varies by resource type                              | Filters by release window       |
| Air Date              | air_date                      | Varies by resource type                              | Filters by air date window      |

### Special Cases for Date Filters

The release_date and air_date filters have different default values based on the resource type:

- **Popular Movies**:

  - release_date: {gte: '', lte: today + 181 days}

- **Popular TV**:

  - If search_first_air_date is true:
    - air_date: {gte: '', lte: today + 180 days}
  - Otherwise:
    - release_date: {gte: '', lte: today + 180 days}

- **Now Playing Movies**:

  - release_date: {gte: today - 40 days, lte: today + 2 days}

- **Airing Today TV**:

  - Uses current date for both gte and lte

- **Upcoming Movies**:

  - release_date: {gte: today + 3 days, lte: today + 24 days}

- **On The Air TV**:
  - Date range from today to today + 7 days

## Usage

To use the `@discover` module, integrate it into your application by importing the necessary services and modules. Customize the filters and sorting options to suit your application's needs and provide users with a tailored content discovery experience.

For more detailed information on how to implement and use the `@discover` module, refer to the code and tests provided in the module's directory.
