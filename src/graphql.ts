/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

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
	reviews?: Nullable<Nullable<Review>[]>;
	recommendations?: Nullable<Nullable<EntertainmentRecommendation>[]>;
	keywords?: Nullable<Nullable<Keyword>[]>;
	social?: Nullable<Social>;
	featuredCast?: Nullable<Nullable<Cast>[]>;
	featuredCrew?: Nullable<Nullable<Crew>[]>;
	featuredVideo?: Nullable<Video>;
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
	reviews?: Nullable<Nullable<Review>[]>;
	recommendations?: Nullable<Nullable<EntertainmentRecommendation>[]>;
	keywords?: Nullable<Nullable<Keyword>[]>;
	social?: Nullable<Social>;
	featuredCast?: Nullable<Nullable<Cast>[]>;
	featuredCrew?: Nullable<Nullable<Crew>[]>;
	featuredVideo?: Nullable<Video>;
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

export interface EntertainmentRecommendation {
	__typename?: 'EntertainmentRecommendation';
	name?: Nullable<string>;
	releaseDate?: Nullable<string>;
	backgroundUrl?: Nullable<string>;
	rating?: Nullable<number>;
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

export interface Review {
	__typename?: 'Review';
	author?: Nullable<string>;
	content?: Nullable<string>;
	id?: Nullable<string>;
	url?: Nullable<string>;
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
