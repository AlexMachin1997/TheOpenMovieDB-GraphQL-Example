
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum GENDER {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

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
    trailerUrl?: Nullable<string>;
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

export interface Credits {
    __typename?: 'Credits';
    year?: Nullable<string>;
    credits?: Nullable<Nullable<Credit>[]>;
}

export interface PeopleCredits {
    __typename?: 'PeopleCredits';
    ActingGroup?: Nullable<Nullable<Credits>[]>;
    ProductionGroup?: Nullable<Nullable<Credits>[]>;
    WritingGroup?: Nullable<Nullable<Credits>[]>;
    DirectingGroup?: Nullable<Nullable<Credits>[]>;
    CrewGroup?: Nullable<Nullable<Credits>[]>;
}

export interface Person {
    __typename?: 'Person';
    id?: Nullable<number>;
    birthday?: Nullable<string>;
    knowForDepartment?: Nullable<string>;
    name?: Nullable<string>;
    alsoKnownAs?: Nullable<Nullable<string>[]>;
    gender?: Nullable<string>;
    overview?: Nullable<string>;
    placeOfBirth?: Nullable<string>;
    posterUrl?: Nullable<string>;
    credits?: Nullable<PeopleCredits>;
    social?: Nullable<Social>;
    homepage?: Nullable<string>;
}

export interface IQuery {
    __typename?: 'IQuery';
    movie(id: number): Nullable<Movie> | Promise<Nullable<Movie>>;
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
    trailerUrl?: Nullable<string>;
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
    gender?: Nullable<GENDER>;
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
    facebook?: Nullable<string>;
    instagram?: Nullable<string>;
    twitter?: Nullable<string>;
    homepage?: Nullable<string>;
}

export interface Video {
    __typename?: 'Video';
    id?: Nullable<string>;
    name?: Nullable<string>;
    url?: Nullable<string>;
    type?: Nullable<string>;
    site?: Nullable<string>;
}

type Nullable<T> = T | null;
