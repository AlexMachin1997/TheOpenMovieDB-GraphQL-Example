/* eslint-disable @typescript-eslint/naming-convention */
export interface IVideo {
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

export interface IVideosQueryResponse {
	id: number;
	results: Array<IVideo>;
}
