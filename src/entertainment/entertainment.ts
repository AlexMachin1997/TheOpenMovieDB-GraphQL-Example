/* eslint-disable @typescript-eslint/naming-convention */

import { Keyword } from '../graphql.schema';
import { ICast, ICrew } from '../types/credits';

export interface IReviewQuery {
	id: number;
	page: number;
	results: Array<{
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
	}>;
}

export interface ICreditsQueryResponse {
	id: number;
	cast: Array<ICast>;
	crew: Array<ICrew>;
}

export interface IKeywordsQueryResponse {
	id: number;
	keywords: Array<Keyword>;
}

export interface IVideosQueryResult {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}

export interface IVdoesQueryResponse {
	id: number;
	results: Array<IVideosQueryResult>;
}
