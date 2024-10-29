/* eslint-disable @typescript-eslint/naming-convention */
import { Nullable } from 'src/common/types/Nullable';

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
