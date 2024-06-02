/* eslint-disable @typescript-eslint/naming-convention */
import { Keyword } from '../graphql.schema';

export interface ICastAndCrew {
	adult: boolean;
	gender: number;
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

export interface IReviewQuery {
	id: number;
	page: number;
	results: {
		author: string;
		author_details: {
			name: string;
			username: string;
			avatar_path: string | null;
			rating: number | null;
		};
		content: string;
		created_at: string;
		id: string;
		updated_at: string;
		url: string;
	}[];
}

export interface ICreditsQueryResponse {
	id: number;
	cast: ICast[];
	crew: ICrew[];
}

export interface IKeywordsQueryResponse {
	id: number;
	keywords: Keyword[];
}

export interface IExternalIdsQueryResponse {
	id: number;
	imdb_id: string;
	wikidata_id: string;
	facebook_id: string;
	instagram_id: string;
	twitter_id: string;
}
