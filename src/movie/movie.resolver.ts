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

	@ResolveField()
	async review(): Promise<Review | null> {
		return this.movieService.getReview();
	}

	@ResolveField()
	async topBilledCast(): Promise<Cast[] | null> {
		return this.movieService.getTopBilledCast();
	}

	@ResolveField()
	async featuredCrew(): Promise<Crew[] | null> {
		return this.movieService.getFeaturedCrewMembers();
	}

	@ResolveField()
	async keywords(): Promise<Keyword[] | null> {
		return this.movieService.getKeywords();
	}

	@ResolveField()
	async social(@Parent() movie: Movie): Promise<Social | null> {
		// Get the external social url (The homepage isn't set here as it's already apart of the original Movie query)
		const socials = await this.movieService.getSocials();

		return {
			...socials,

			// Since the homepage is apart of the original query append it to the homepage property
			homepage: movie.homepage
		};
	}

	@ResolveField()
	async trailerUrl(): Promise<string | null> {
		return this.movieService.getTrailerUrl();
	}
}
