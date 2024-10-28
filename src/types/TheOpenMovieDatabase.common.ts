/* eslint-disable @typescript-eslint/naming-convention */
import { Nullable } from './Nullable';
import { Genre } from '../graphql.schema';

export type Gender = 0 | 1 | 2 | 3;

export interface ITheOpenMovieDatabaseBelongsToCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop: string;
}

export interface IProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface IProductionCountries {
	iso_3166_1: string;
	name: string;
}

export interface ISpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface ICommonTheOpenMovieDatabaseEntertainmentModel {
	adult: boolean;
	backdrop_path: string;
	name: string;
	title: string;
	original_title: string;
	belongs_to_collection: Nullable<ITheOpenMovieDatabaseBelongsToCollection>;
	genres: Array<Genre>;
	homepage: string;
	id: number;
	origin_country: Array<string>;
	original_language: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: Array<IProductionCompany>;
	production_countries: Array<IProductionCountries>;
	spoken_languages: Array<ISpokenLanguage>;
	status: string;
	tagline: string;
	vote_average: number;
	vote_count: number;
}
