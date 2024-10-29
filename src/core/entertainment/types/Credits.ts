/* eslint-disable @typescript-eslint/naming-convention */
import { ICast, ICrew } from './CastAndCrew';

export interface ICreditGroupQueryResponse {
	id: number;
	cast: Array<ICast>;
	crew: Array<ICrew>;
}
