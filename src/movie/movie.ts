/* eslint-disable @typescript-eslint/naming-convention */
import { Keyword } from '../graphql.schema';
import { Nullable } from '../types/Nullable';
import {
	Gender,
	ICommonTheOpenMovieDatabaseEntertainmentModel
} from '../types/TheOpenMovieDatabase.common';

export interface ITheOpenMovieDatabaseMovie extends ICommonTheOpenMovieDatabaseEntertainmentModel {
	budget: number;
	imdb_id: string;
	original_title: string;
	release_date: string;
	revenue: number;
	runtime: number;
}

export interface ITheOpenMovieDatabaseMovieReview {
	author: string;
	author_details: {
		name: string;
		username: string;
		avatar_path: Nullable<string>;
		rating: Nullable<number>;
	};
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}

export interface ITheOpenMovieDatabaseMovieCastAndCrew {
	adult: boolean;
	gender: Gender;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
}

export interface ITheOpenMovieDatabaseMovieCast extends ITheOpenMovieDatabaseMovieCastAndCrew {
	cast_id: number;
	character: string;
	order: number;
}

export interface ITheOpenMovieDatabaseMovieCrew extends ITheOpenMovieDatabaseMovieCastAndCrew {
	department: string;
	job: string;
}

export interface ITheOpenMovieDatabaseMovieKeywords {
	id: number;
	keywords: Array<Keyword>;
}

export interface ITheOpenMovieDatabaseExternalIds {
	id: number;
	imdb_id: string;
	wikidata_id: string;
	facebook_id: string;
	instagram_id: string;
	twitter_id: string;
}
