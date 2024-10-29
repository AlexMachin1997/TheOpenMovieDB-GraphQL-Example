/* eslint-disable @typescript-eslint/naming-convention */
import { Keyword } from '../../../graphql/generated/schema';

export interface IKeywordsQueryResponse {
	id: number;
	keywords: Array<Keyword>;
}
