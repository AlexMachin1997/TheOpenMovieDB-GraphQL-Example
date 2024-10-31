/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/extensions */

import { Gender } from '../../../core/Gender';

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
