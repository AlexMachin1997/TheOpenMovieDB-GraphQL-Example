/* eslint-disable @typescript-eslint/naming-convention */
import { Keyword } from '../../../graphql/generated/schema';

export interface ITheOpenMovieDatabaseMovieKeywords {
	id: number;
	keywords: Array<Keyword>;
}
