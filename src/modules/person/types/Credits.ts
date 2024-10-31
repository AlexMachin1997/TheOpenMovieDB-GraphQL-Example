/* eslint-disable @typescript-eslint/naming-convention */
import { Nullable } from 'src/common/types/Nullable';

import { TheOpenMovieDatabaseDepartments } from './Departments';

interface ICredit {
	adult: boolean;
	backdrop_path: Nullable<string>;
	genre_ids: Array<number>;
	id: number;
	overview: string;
	popularity: number;
	poster_path: Nullable<string>;
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

type ITVCreditGroup = {
	origin_country: Array<string>;
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
} & ITVCreditGroup;

export type IMovieCast = {
	type: 'cast';
} & IMovieCredit;

export type ITVCast = {
	type: 'cast';
} & ITVCreditGroup;

export type Crew = IMovieCrew | ITVCrew;

export type Cast = IMovieCast | ITVCast;

export type IGetGroupCreditGroup = Array<Crew> | Array<Cast>;
export interface TheOpenMovieDatabasePersonCombinedCreditGroup {
	cast: Array<Omit<IMovieCast, 'type'>> | Array<Omit<ITVCast, 'type'>>;
	crew: Array<Omit<IMovieCrew, 'type'>> | Array<Omit<ITVCrew, 'type'>>;
	id: number;
}

export type Group =
	| {
			mediaType: 'tv';
			year: string;
			character: string;
			title: string;
			episodeCount: number;
			type: 'cast';
	  }
	| {
			mediaType: 'movie';
			year: string;
			character: string;
			title: string;
			type: 'cast';
	  }
	| {
			mediaType: 'tv';
			year: string;
			character: string;
			title: string;
			episodeCount: number;
			type: 'crew';
			department: TheOpenMovieDatabaseDepartments;
	  }
	| {
			mediaType: 'movie';
			year: string;
			character: string;
			title: string;
			type: 'crew';
			department: TheOpenMovieDatabaseDepartments;
	  };
