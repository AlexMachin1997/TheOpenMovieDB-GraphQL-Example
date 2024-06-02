import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { MovieService } from './movie.service';
import { Cast, Crew, Keyword, Movie, Review, Social } from '../graphql.schema';

@Resolver('Movie')
export class MovieResolver {
	constructor(private readonly movieService: MovieService) {}

	@Query()
	async movie(): Promise<Movie> {
		return this.movieService.getMovie();
	}

	// Attach the review to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async review(): Promise<Review | null> {
		return this.movieService.getReview();
	}

	// Attach the top billed cast to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async topBilledCast(): Promise<Cast[] | null> {
		return this.movieService.getTopBilledCast();
	}

	// Attach the featured crew to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async featuredCrew(): Promise<Crew[] | null> {
		return this.movieService.getFeaturedCrewMembers();
	}

	// Attach the keywords to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async keywords(): Promise<Keyword[] | null> {
		return this.movieService.getKeywords();
	}

	// Attach the social to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async social(@Parent() movie: Movie): Promise<Social | null> {
		// Get the external social url (The homepage isn't set here as it's already apart of the original Movie query)
		const socials = await this.movieService.getSocials();

		return {
			...socials,
			homepage: movie.homepage
		};
	}
}
