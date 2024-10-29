import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

import { ShowService } from './show.service';
import { Show } from '../../graphql/generated/schema';

@Resolver('Show')
export class ShowResolver {
	constructor(private readonly showService: ShowService) {}

	@Query()
	async show(@Args('id') showId: number) {
		return this.showService.getShow(showId);
	}

	@ResolveField()
	async review(@Parent() show: Show) {
		return this.showService.getReview(show.id ?? 0);
	}

	@ResolveField()
	async topBilledCast(@Parent() show: Show) {
		return this.showService.getTopBilledCast(show.id ?? 0);
	}

	@ResolveField()
	async featuredCrew(@Parent() show: Show) {
		return this.showService.getFeaturedCrewMembers(show.id ?? 0);
	}

	@ResolveField()
	async keywords(@Parent() show: Show) {
		return this.showService.getKeywords(show.id ?? 0);
	}

	@ResolveField()
	async social(@Parent() show: Show) {
		// Get the external social url (The homepage isn't set here as it's already apart of the original Show query)
		const socials = await this.showService.getSocials(show.id ?? 0);

		return {
			...socials,

			// Since the homepage is apart of the original query append it to the homepage property
			homepage: show.homepage
		};
	}

	@ResolveField()
	async youtubeVideo(@Parent() show: Show) {
		return this.showService.getYouTubeVideo(show.id ?? 0);
	}
}
