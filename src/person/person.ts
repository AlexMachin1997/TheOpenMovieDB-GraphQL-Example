/* eslint-disable @typescript-eslint/naming-convention */
import { Gender } from '../types/gender';

export type TheOpenMovieDatabaseDepartments =
	| 'Production'
	| 'Writing'
	| 'Directing'
	| 'Crew'
	| 'Lighting';

export interface TheOpenMovieDatabasePerson {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: null | string;
	gender: Gender;
	homepage: string;
	id: number;
	imdb_id: string;
	known_for_department: TheOpenMovieDatabaseDepartments;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
}

interface ICredit {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	overview: string;
	popularity: number;
	poster_path: string | null;
	vote_average: number;
	vote_count: number;
	character: string;
	credit_id: string;
}

type IMovieCredit = {
	original_language: string;
	original_title: string;
	release_date: string;
	title: string;
	video: boolean;
	order: number;
	media_type: 'movie';
} & ICredit;

type ITVCredits = {
	origin_country: string[];
	original_language: string;
	original_name: string;
	first_air_date: string;
	name: string;
	episode_count: number;
	media_type: 'tv';
} & ICredit;

export type IMovieCrew = {
	department: TheOpenMovieDatabaseDepartments;
	job: string;
	type: 'crew';
} & IMovieCredit;

export type ITVCrew = {
	department: TheOpenMovieDatabaseDepartments;
	job: string;
	type: 'crew';
} & ITVCredits;

export type IMovieCast = {
	type: 'cast';
} & IMovieCredit;

export type ITVCast = {
	type: 'cast';
} & ITVCredits;

export type Crew = IMovieCrew | ITVCrew;

export type Cast = IMovieCast | ITVCast;

export type IGetGroupCredits = Crew[] | Cast[];
export interface TheOpenMovieDatabasePersonCombinedCredits {
	cast: Omit<IMovieCast, 'type'>[] | Omit<ITVCast, 'type'>[];
	crew: Omit<IMovieCrew, 'type'>[] | Omit<ITVCrew, 'type'>[];
	id: number;
}

export type Group =
	| {
			mediaType: 'tv';
			year: number | '-';
			character: string;
			title: string;
			episodeCount: number;
			type: 'cast';
	  }
	| {
			mediaType: 'movie';
			year: number | '-';
			character: string;
			title: string;
			type: 'cast';
	  }
	| {
			mediaType: 'tv';
			year: number | '-';
			character: string;
			title: string;
			episodeCount: number;
			type: 'crew';
			department: TheOpenMovieDatabaseDepartments;
	  }
	| {
			mediaType: 'movie';
			year: number | '-';
			character: string;
			title: string;
			type: 'crew';
			department: TheOpenMovieDatabaseDepartments;
	  };
