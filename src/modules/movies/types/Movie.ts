/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line import/extensions
import { ICommonTheOpenMovieDatabaseEntertainmentModel } from '../../../core/entertainment/types';

export interface ITheOpenMovieDatabaseMovie extends ICommonTheOpenMovieDatabaseEntertainmentModel {
	budget: number;
	imdb_id: string; // Pull from the ExternalIds type
	original_title: string;
	release_date: string;
	revenue: number;
	runtime: number;
}
