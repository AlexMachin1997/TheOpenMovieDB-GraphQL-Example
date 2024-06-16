import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ShowService } from './show.service';
import { Cast, Crew, Keyword, Review, Show, Social } from '../graphql.schema';

@Resolver()
export class ShowResolver {
	constructor(private readonly showService: ShowService) {}

	@Query()
	async show(@Args('id') showId: number): Promise<Show> {
		return this.showService.getShow(showId);
	}

	@ResolveField()
	async review(@Parent() show: Show): Promise<Review | null> {
		return this.showService.getReview(show.id ?? 0);
	}

	@ResolveField()
	async topBilledCast(@Parent() show: Show): Promise<Cast[] | null> {
		return this.showService.getTopBilledCast(show.id ?? 0);
	}

	@ResolveField()
	async featuredCrew(@Parent() show: Show): Promise<Crew[] | null> {
		return this.showService.getFeaturedCrewMembers(show.id ?? 0);
	}

	@ResolveField()
	async keywords(@Parent() show: Show): Promise<Keyword[] | null> {
		return this.showService.getKeywords(show.id ?? 0);
	}

	@ResolveField()
	async social(@Parent() show: Show): Promise<Social | null> {
		// Get the external social url (The homepage isn't set here as it's already apart of the original Show query)
		const socials = await this.showService.getSocials(show.id ?? 0);

		return {
			...socials,

			// Since the homepage is apart of the original query append it to the homepage property
			homepage: show.homepage
		};
	}

	@ResolveField()
	async trailerUrl(@Parent() show: Show): Promise<string | null> {
		return this.showService.getTrailerUrl(show.id ?? 0);
	}
}
