/* eslint-disable @typescript-eslint/naming-convention */
import { ITheOpenMovieDatabaseBelongsToCollection } from './BelongsToCollection';
import { IProductionCompany } from './ProductionCompany';
import { IProductionCountries } from './ProductionCountries';
import { ISpokenLanguage } from './SpokenLanguage';
import { Nullable } from '../../../common/types/Nullable';
import { Genre } from '../../../graphql/generated/schema';

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
