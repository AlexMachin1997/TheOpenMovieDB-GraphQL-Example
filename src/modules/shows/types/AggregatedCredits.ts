/* eslint-disable @typescript-eslint/naming-convention */

import { ICast, ICrew } from '../../../core/entertainment/types';

interface IAggregatedCreditJob {
	credit_id: string;
	job: string;
	episode_count: number;
}

interface IAggregatedCreditGroupQueryCastResponse extends ICast {
	roles: Array<IAggregatedCreditJob>;
}

interface IAggregatedCreditGroupQueryCrewResponse extends ICrew {
	roles: Array<IAggregatedCreditJob>;
}

export interface IAggregatedCreditGroupQueryResponse {
	id: number;
	cast: Array<IAggregatedCreditGroupQueryCastResponse>;
	crew: Array<IAggregatedCreditGroupQueryCrewResponse>;
}
