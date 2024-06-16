export type TheOpenMovieDatabasePersonGender = 0 | 1 | 2 | 3;

export interface TheOpenMovieDatabasePerson {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: null | string;
	gender: TheOpenMovieDatabasePersonGender;
	homepage: string;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
}
