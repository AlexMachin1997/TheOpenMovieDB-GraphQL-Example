import { TheOpenMovieDatabaseBelongsToCollection } from 'src/movie/movie';

import { Genre } from '../graphql.schema';

export interface TheOpenMovieDatabaseEpisodeToAir {
	id: number;
	overview: string;
	name: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: string;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
}

interface TheOpenMovieDatabaseCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface TheOpenMovieDatabaseShow {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection?: TheOpenMovieDatabaseBelongsToCollection | null;
	created_by: {
		id: number;
		credit_id: string;
		name: string;
		original_name: string;
		gender: number;
		profile_path: string;
	}[];
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: null | TheOpenMovieDatabaseEpisodeToAir;
	name: string;
	next_episode_to_air: null | TheOpenMovieDatabaseEpisodeToAir;
	networks: TheOpenMovieDatabaseCompany[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: TheOpenMovieDatabaseCompany[];
	production_countries: { iso_3166_1: string; name: string }[];
	seasons: {
		air_date: string | null;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
		vote_average: number;
	}[];
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}
