/* eslint-disable @typescript-eslint/naming-convention */
import { Gender } from './TheOpenMovieDatabase.common';

export interface ICastAndCrew {
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

export interface ICast extends ICastAndCrew {
	cast_id: number;
	character: string;
	order: number;
}

export interface ICrew extends ICastAndCrew {
	department: string;
	job: string;
}
