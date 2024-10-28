/* eslint-disable @typescript-eslint/naming-convention */
import { ICast, ICrew } from '../types/credits';
import { Nullable } from '../types/Nullable';
import {
	Gender,
	ICommonTheOpenMovieDatabaseEntertainmentModel
} from '../types/TheOpenMovieDatabase.common';

export interface ITheOpenMovieDatabaseEpisodeToAir {
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

interface ITheOpenMovieDatabaseNetwork {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ITheOpenMovieDatabaseShowSeason {
	air_date: Nullable<string>;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
}

export interface ITheOpenMovieDatabaseShow extends ICommonTheOpenMovieDatabaseEntertainmentModel {
	created_by: Array<{
		id: number;
		credit_id: string;
		name: string;
		original_name: string;
		gender: Gender;
		profile_path: string;
	}>;
	episode_run_time: Array<number>;
	first_air_date: string;
	in_production: boolean;
	languages: Array<string>;
	last_air_date: string;
	last_episode_to_air: Nullable<ITheOpenMovieDatabaseEpisodeToAir>;
	next_episode_to_air: Nullable<ITheOpenMovieDatabaseEpisodeToAir>;
	networks: Array<ITheOpenMovieDatabaseNetwork>;
	number_of_episodes: number;
	number_of_seasons: number;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	seasons: Array<ITheOpenMovieDatabaseShowSeason>;
	type: string;
}

interface IAggregatedCreditJob {
	credit_id: string;
	job: string;
	episode_count: number;
}

interface IAggregatedCreditsQueryCastResponse extends ICast {
	roles: Array<IAggregatedCreditJob>;
}

interface IAggregatedCreditsQueryCrewResponse extends ICrew {
	roles: Array<IAggregatedCreditJob>;
}

export interface IAggregatedCreditsQueryResponse {
	id: number;
	cast: Array<IAggregatedCreditsQueryCastResponse>;
	crew: Array<IAggregatedCreditsQueryCrewResponse>;
}
