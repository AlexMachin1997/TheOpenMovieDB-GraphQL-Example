/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/extensions */

import { ITheOpenMovieDatabaseEpisodeToAir } from './EpisodeToAirs';
import { ITheOpenMovieDatabaseNetwork } from './Network';
import { ITheOpenMovieDatabaseShowSeason } from './Season';
import { Nullable } from '../../../common/types/Nullable';
import { ICommonTheOpenMovieDatabaseEntertainmentModel } from '../../../core/entertainment/types';
import { Gender } from '../../../core/Gender';

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
