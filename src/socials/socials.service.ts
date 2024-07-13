import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { IExternalIdsQueryResponse } from './social';
import { ENTERTAINMENT_TYPES, Social } from '../graphql.schema';

@Injectable()
export class SocialsService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {}

	async getSocials({
		resourceType,
		resourceId
	}: {
		resourceType: ENTERTAINMENT_TYPES | 'PERSON';
		resourceId: number;
	}): Promise<Social> {
		const { data } = await firstValueFrom(
			this.httpService.get<IExternalIdsQueryResponse>(
				`https://api.themoviedb.org/3/${resourceType.toLowerCase()}/${resourceId}/external_ids?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${this.configService.get('THE_OPEN_MOVIE_DATABASE_API_KEY')}`
					}
				}
			)
		);

		let facebook = null;
		let instagram = null;
		let twitter = null;
		let tiktok = null;

		if (data.facebook_id) {
			facebook = `https://www.facebook.com/${data.facebook_id}`;
		}

		if (data.instagram_id) {
			instagram = `https://www.instagram.com/${data.instagram_id}`.toLowerCase();
		}

		if (data.twitter_id) {
			twitter = `https://www.twitter.com/${data.twitter_id}`;
		}

		if (data.tiktok_id) {
			tiktok = `https://www.tiktok.com/@${data.tiktok_id}/`;
		}

		return {
			facebook,
			instagram,
			twitter,
			tiktok
		};
	}
}
