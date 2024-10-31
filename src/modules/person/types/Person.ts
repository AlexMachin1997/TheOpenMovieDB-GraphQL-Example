import { TheOpenMovieDatabaseDepartments } from './Departments';
import { Gender } from '../../../core/Gender';

export interface TheOpenMovieDatabasePerson {
	adult: boolean;
	also_known_as: Array<string>;
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
