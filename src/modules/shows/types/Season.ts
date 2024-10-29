/* eslint-disable @typescript-eslint/naming-convention */
import { Nullable } from '../../../common/types/Nullable';

export interface ITheOpenMovieDatabaseShowSeason {
	air_date: Nullable<string>;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
}
