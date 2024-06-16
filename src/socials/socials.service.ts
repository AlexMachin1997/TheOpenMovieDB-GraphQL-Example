import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { IExternalIdsQueryResponse } from './social';
import { ENTERTAINMENT_TYPES, Social } from '../graphql.schema';

@Injectable()
export class SocialsService {
	constructor(private readonly httpService: HttpService) {}

	async getSocials({
		resourceType,
		resourceId
	}: {
		resourceType: ENTERTAINMENT_TYPES | 'PERSON';
		resourceId: number;
	}): Promise<Social> {
		console.log('getting socials..');

		const { data } = await firstValueFrom(
			this.httpService.get<IExternalIdsQueryResponse>(
				`https://api.themoviedb.org/3/${resourceType.toLowerCase()}/${resourceId}/external_ids?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization:
							// eslint-disable-next-line max-len
							'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDMwNWQxNmE1ZThkN2E3ZWMwZmM2NTk5MzZiY2EzMCIsInN1YiI6IjViMzE0MjQ1OTI1MTQxM2M5MTAwNTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iqdLKFCSgeWG3SYso7Rqj297FORviPf9hDdn2kKygTA'
					}
				}
			)
		);

		return {
			facebook: `https://www.facebook.com/${data.facebook_id}`,
			homepage: ``,
			instagram: `https://www.instagram.com/${data.instagram_id}`.toLowerCase(),
			twitter: `https://www.twitter.com/${data.twitter_id}`
			// tiktok: `https://www.tiktok.com/@${data.tiktok_id}/`
		};
	}
}
