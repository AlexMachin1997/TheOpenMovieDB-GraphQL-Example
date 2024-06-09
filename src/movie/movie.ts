import { Genre, Keyword } from '../graphql.schema';

export interface TheOpenMovieDatabaseBelongsToCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop: string;
}

export interface TheOpenMovieDatabaseSpokenLanguages {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface TheOpenMovieDatabaseMovie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: TheOpenMovieDatabaseBelongsToCollection | null;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
	production_countries: { iso_3166_1: string; name: string }[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: TheOpenMovieDatabaseSpokenLanguages[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TheOpenMovieDatabaseMovieReview {
	author: string;
	author_details: {
		name: string;
		username: string;
		avatar_path: string | null;
		rating: number | null;
	};
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}

export interface TheOpenMovieDatabaseMovieCastAndCrew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
}

export interface TheOpenMovieDatabaseMovieCast extends TheOpenMovieDatabaseMovieCastAndCrew {
	cast_id: number;
	character: string;
	order: number;
}

export interface TheOpenMovieDatabaseMovieCrew extends TheOpenMovieDatabaseMovieCastAndCrew {
	department: string;
	job: string;
}

export interface TheOpenMovieDatabaseMovieKeywords {
	id: number;
	keywords: Keyword[];
}

export interface TheOpenMovieDatbaseExternalIds {
	id: number;
	imdb_id: string;
	wikidata_id: string;
	facebook_id: string;
	instagram_id: string;
	twitter_id: string;
}
