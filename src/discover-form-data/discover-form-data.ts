/* eslint-disable @typescript-eslint/naming-convention */
export interface IDefaultValues {
	sort_by?: string;
	ott_region?: string;
	restrict_services?: boolean;
	with_ott_providers?: Array<string>;
	show_me?: string;
	with_watch_monetization_types?: Array<string>;
	with_genres?: Array<string>;
	certifications?: Array<string>;
	with_release_types?: Array<string>;
	with_original_language?: string;
	region?: string;
	vote_average_lte?: string;
	vote_average_gte?: string;
	with_runtime_lte?: string;
	with_runtime_gte?: string;
	vote_count_lte?: string;
	vote_count_gte?: string;
	search_first_air_date?: boolean;
}
