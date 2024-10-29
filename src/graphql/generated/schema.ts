
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ENTERTAINMENT_TYPES {
    MOVIE = "MOVIE",
    TV = "TV"
}

export enum RESOURCE_TYPE {
    TOP_RATED = "TOP_RATED",
    POPULAR = "POPULAR",
    NOW_PLAYING = "NOW_PLAYING",
    UPCOMING = "UPCOMING",
    AIRING_TODAY = "AIRING_TODAY",
    ON_THE_AIR = "ON_THE_AIR"
}

export interface DiscoverFormDataInput {
    sort_by?: Nullable<string>;
    show_me?: Nullable<string>;
    with_watch_monetization_types?: Nullable<Nullable<string>[]>;
    with_genres?: Nullable<Nullable<string>[]>;
    certifications?: Nullable<Nullable<string>[]>;
    with_release_types?: Nullable<Nullable<string>[]>;
    release_date?: Nullable<DateRangeFilterInput>;
    air_date?: Nullable<DateRangeFilterInput>;
    with_original_language?: Nullable<string>;
    region?: Nullable<string>;
    vote_average?: Nullable<NumberRangeFilterInput>;
    with_runtime?: Nullable<NumberRangeFilterInput>;
    vote_count?: Nullable<VoteCountFilterInput>;
    search_first_air_date?: Nullable<boolean>;
    restrict_services?: Nullable<boolean>;
    ott_region?: Nullable<string>;
    with_ott_providers?: Nullable<Nullable<string>[]>;
}

export interface DateRangeFilterInput {
    gte?: Nullable<string>;
    lte?: Nullable<string>;
}

export interface NumberRangeFilterInput {
    gte?: Nullable<number>;
    lte?: Nullable<number>;
}

export interface VoteCountFilterInput {
    gte?: Nullable<number>;
    lte?: Nullable<number>;
}

export interface PaginatedResult {
    meta: PaginationMetaData;
}

export interface PaginationMetaData {
    __typename?: 'PaginationMetaData';
    page: number;
    pageCount: number;
    total: number;
}

export interface DiscoverResult {
    __typename?: 'DiscoverResult';
    adult?: Nullable<boolean>;
    backdropUrl?: Nullable<string>;
    posterUrl?: Nullable<string>;
    name?: Nullable<string>;
    homepage?: Nullable<string>;
    id: string;
    originCountry?: Nullable<Nullable<string>[]>;
    originalLanguage?: Nullable<string>;
    overview?: Nullable<string>;
    releaseDate?: Nullable<string>;
    popularity?: Nullable<number>;
    posterPath?: Nullable<string>;
    status?: Nullable<string>;
    tagline?: Nullable<string>;
    voteAverage?: Nullable<number>;
    voteCount?: Nullable<number>;
}

export interface PaginatedDiscoverResult extends PaginatedResult {
    __typename?: 'PaginatedDiscoverResult';
    meta: PaginationMetaData;
    results: DiscoverResult[];
}

export interface DiscoverFormData {
    __typename?: 'DiscoverFormData';
    sort_by?: Nullable<string>;
    show_me?: Nullable<string>;
    with_watch_monetization_types?: Nullable<Nullable<string>[]>;
    with_genres?: Nullable<Nullable<string>[]>;
    certifications?: Nullable<Nullable<string>[]>;
    with_release_types?: Nullable<Nullable<string>[]>;
    release_date?: Nullable<DateRangeFilter>;
    air_date?: Nullable<DateRangeFilter>;
    with_original_language?: Nullable<string>;
    region?: Nullable<string>;
    vote_average?: Nullable<NumberRangeFilter>;
    with_runtime?: Nullable<NumberRangeFilter>;
    vote_count?: Nullable<VoteCountFilter>;
    search_first_air_date?: Nullable<boolean>;
    restrict_services?: Nullable<boolean>;
    ott_region?: Nullable<string>;
    with_ott_providers?: Nullable<Nullable<string>[]>;
}

export interface DateRangeFilter {
    __typename?: 'DateRangeFilter';
    gte?: Nullable<string>;
    lte?: Nullable<string>;
}

export interface NumberRangeFilter {
    __typename?: 'NumberRangeFilter';
    gte?: Nullable<number>;
    lte?: Nullable<number>;
}

export interface VoteCountFilter {
    __typename?: 'VoteCountFilter';
    gte?: Nullable<number>;
    lte?: Nullable<number>;
}

export interface BelongsToCollection {
    __typename?: 'BelongsToCollection';
    id?: Nullable<number>;
    name?: Nullable<string>;
    backgroundUrl?: Nullable<string>;
    posterUrl?: Nullable<string>;
}

export interface Cast {
    __typename?: 'Cast';
    id?: Nullable<number>;
    character?: Nullable<string>;
    profileImageUrl?: Nullable<string>;
    gender?: Nullable<string>;
    episodeCount?: Nullable<number>;
}

export interface Company {
    __typename?: 'Company';
    id?: Nullable<number>;
    logo?: Nullable<string>;
    name?: Nullable<string>;
}

export interface Crew {
    __typename?: 'Crew';
    name?: Nullable<string>;
    roles?: Nullable<string>;
}

export interface Genre {
    __typename?: 'Genre';
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export interface Keyword {
    __typename?: 'Keyword';
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface Recommendation {
    __typename?: 'Recommendation';
    name?: Nullable<string>;
    releaseDate?: Nullable<string>;
    backgroundUrl?: Nullable<string>;
    rating?: Nullable<number>;
}

export interface Author {
    __typename?: 'Author';
    name?: Nullable<string>;
    username?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    rating?: Nullable<string>;
}

export interface Review {
    __typename?: 'Review';
    author?: Nullable<Author>;
    isFeatured?: Nullable<boolean>;
    content?: Nullable<string>;
    createdOn?: Nullable<string>;
}

export interface Social {
    __typename?: 'Social';
    id?: Nullable<number>;
    freebase?: Nullable<string>;
    imdb?: Nullable<string>;
    tvrage?: Nullable<number>;
    wikidata?: Nullable<string>;
    facebook?: Nullable<string>;
    instagram?: Nullable<string>;
    tiktok?: Nullable<string>;
    twitter?: Nullable<string>;
    youtube?: Nullable<string>;
}

export interface Video {
    __typename?: 'Video';
    id?: Nullable<string>;
    name?: Nullable<string>;
    url?: Nullable<string>;
    type?: Nullable<string>;
    site?: Nullable<string>;
}

export interface Movie {
    __typename?: 'Movie';
    id?: Nullable<number>;
    name?: Nullable<string>;
    overview?: Nullable<string>;
    backgroundUrl?: Nullable<string>;
    posterUrl?: Nullable<string>;
    genres?: Nullable<Nullable<Genre>[]>;
    homepage?: Nullable<string>;
    originalLanguage?: Nullable<string>;
    productionCompanies?: Nullable<Nullable<Company>[]>;
    releaseDate?: Nullable<string>;
    voteAverage?: Nullable<number>;
    status?: Nullable<string>;
    review?: Nullable<Review>;
    recommendations?: Nullable<Nullable<Recommendation>[]>;
    keywords?: Nullable<Nullable<Keyword>[]>;
    social?: Nullable<Social>;
    topBilledCast?: Nullable<Nullable<Cast>[]>;
    featuredCrew?: Nullable<Nullable<Crew>[]>;
    youtubeVideo?: Nullable<Video>;
    belongsToCollection?: Nullable<BelongsToCollection>;
    tagline?: Nullable<string>;
    runtime?: Nullable<string>;
    budget?: Nullable<string>;
    revenue?: Nullable<string>;
}

export interface Credit {
    __typename?: 'Credit';
    releaseDate?: Nullable<string>;
    title?: Nullable<string>;
    episodeCount?: Nullable<string>;
    mediaType?: Nullable<string>;
    role?: Nullable<string>;
}

export interface CreditGroup {
    __typename?: 'CreditGroup';
    year?: Nullable<string>;
    credits?: Nullable<Nullable<Credit>[]>;
}

export interface Person {
    __typename?: 'Person';
    id?: Nullable<number>;
    birthday?: Nullable<string>;
    knownForDepartment?: Nullable<string>;
    name?: Nullable<string>;
    alsoKnownAs?: Nullable<Nullable<string>[]>;
    gender?: Nullable<string>;
    overview?: Nullable<string>;
    placeOfBirth?: Nullable<string>;
    posterUrl?: Nullable<string>;
    creditGroup?: Nullable<CreditGroup>;
    social?: Nullable<Social>;
    homepage?: Nullable<string>;
}

export interface IQuery {
    __typename?: 'IQuery';
    movie(id: number): Nullable<Movie> | Promise<Nullable<Movie>>;
    show(id: number): Nullable<Show> | Promise<Nullable<Show>>;
    person(id: number): Nullable<Person> | Promise<Nullable<Person>>;
    formData(entertainmentType?: Nullable<ENTERTAINMENT_TYPES>, resourceType?: Nullable<RESOURCE_TYPE>, defaultValues?: Nullable<DiscoverFormDataInput>): Nullable<DiscoverFormData> | Promise<Nullable<DiscoverFormData>>;
    discoverMovies(filterValues: DiscoverFormDataInput, pageNumber: number): Nullable<PaginatedDiscoverResult> | Promise<Nullable<PaginatedDiscoverResult>>;
    discoverShows(filterValues: DiscoverFormDataInput, pageNumber: number): Nullable<PaginatedDiscoverResult> | Promise<Nullable<PaginatedDiscoverResult>>;
}

export interface CurrentSeason {
    __typename?: 'CurrentSeason';
    backgroundUrl?: Nullable<string>;
    seasonNumber?: Nullable<number>;
    year?: Nullable<string>;
    episodeCount?: Nullable<number>;
    overview?: Nullable<string>;
}

export interface Network {
    __typename?: 'Network';
    name?: Nullable<string>;
    id?: Nullable<number>;
    logoUrl?: Nullable<string>;
    originCountry?: Nullable<string>;
}

export interface Show {
    __typename?: 'Show';
    id?: Nullable<number>;
    name?: Nullable<string>;
    overview?: Nullable<string>;
    backgroundUrl?: Nullable<string>;
    posterUrl?: Nullable<string>;
    genres?: Nullable<Nullable<Genre>[]>;
    homepage?: Nullable<string>;
    originalLanguage?: Nullable<string>;
    productionCompanies?: Nullable<Nullable<Company>[]>;
    releaseDate?: Nullable<string>;
    voteAverage?: Nullable<number>;
    status?: Nullable<string>;
    review?: Nullable<Review>;
    recommendations?: Nullable<Nullable<Recommendation>[]>;
    keywords?: Nullable<Nullable<Keyword>[]>;
    social?: Nullable<Social>;
    topBilledCast?: Nullable<Nullable<Cast>[]>;
    featuredCrew?: Nullable<Nullable<Crew>[]>;
    youtubeVideo?: Nullable<Video>;
    belongsToCollection?: Nullable<BelongsToCollection>;
    tagline?: Nullable<string>;
    runtime?: Nullable<string>;
    Network?: Nullable<Nullable<Network>[]>;
    numberOfSeasons?: Nullable<number>;
    numberOfEpisodes?: Nullable<number>;
    originCountry?: Nullable<Nullable<string>[]>;
    company?: Nullable<Nullable<Company>[]>;
    currentSeason?: Nullable<CurrentSeason>;
    type?: Nullable<string>;
}

type Nullable<T> = T | null;
