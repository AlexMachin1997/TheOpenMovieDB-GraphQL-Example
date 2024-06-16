import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

import { MovieService } from './movie.service';
import { Cast, Crew, Keyword, Movie, Review, Social } from '../graphql.schema';

@Resolver('Movie')
export class MovieResolver {
	constructor(private readonly movieService: MovieService) {}

	@Query()
	async movie(@Args('id') movieId: number): Promise<Movie> {
		return this.movieService.getMovie(movieId);
	}

	@ResolveField()
	async review(@Parent() movie: Movie): Promise<Review | null> {
		return this.movieService.getReview(movie.id ?? 0);
	}

	@ResolveField()
	async topBilledCast(@Parent() movie: Movie): Promise<Cast[] | null> {
		return this.movieService.getTopBilledCast(movie.id ?? 0);
	}

	@ResolveField()
	async featuredCrew(@Parent() movie: Movie): Promise<Crew[] | null> {
		return this.movieService.getFeaturedCrewMembers(movie.id ?? 0);
	}

	@ResolveField()
	async keywords(@Parent() movie: Movie): Promise<Keyword[] | null> {
		return this.movieService.getKeywords(movie.id ?? 0);
	}

	@ResolveField()
	async social(@Parent() movie: Movie): Promise<Social | null> {
		// Get the external social url (The homepage isn't set here as it's already apart of the original Movie query)
		const socials = await this.movieService.getSocials(movie.id ?? 0);

		return {
			...socials,

			// Since the homepage is apart of the original query append it to the homepage property
			homepage: movie.homepage
		};
	}

	@ResolveField()
	async trailerUrl(@Parent() movie: Movie): Promise<string | null> {
		return this.movieService.getTrailerUrl(movie.id ?? 0);
	}
}
