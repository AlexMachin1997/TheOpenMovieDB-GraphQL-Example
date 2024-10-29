import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { ISocials } from './types/socials';
import { ENTERTAINMENT_TYPES, Social } from '../../graphql/generated/schema';

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
			this.httpService.get<ISocials>(
				`https://api.themoviedb.org/3/${resourceType.toLowerCase()}/${resourceId}/external_ids?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${this.configService.get('THE_OPEN_MOVIE_DATABASE_API_KEY')}`
					}
				}
			)
		);

		return {
			facebook: data.facebook_id ? `https://www.facebook.com/${data.facebook_id}` : null,
			instagram: data.instagram_id
				? `https://www.instagram.com/${data.instagram_id}`.toLowerCase()
				: null,
			twitter: data.twitter_id ? `https://www.twitter.com/${data.twitter_id}` : null,
			tiktok: data.tiktok_id ? `https://www.tiktok.com/@${data.tiktok_id}/` : null,
			youtube: data.youtube_id ? `https://www.youtube.com/channel/${data.youtube_id}` : null,

			// TODO: Add support for these socials when I know what they are referring to
			imdb: null,
			tvrage: null,
			wikidata: null,
			freebase: null
		};
	}
}
