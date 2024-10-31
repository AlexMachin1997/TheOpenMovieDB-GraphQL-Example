import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

import { MovieService } from './movie.service';
import { Movie } from '../../graphql/generated/schema';

@Resolver('Movie')
export class MovieResolver {
	constructor(private readonly movieService: MovieService) {}

	@Query()
	async movie(@Args('id') movieId: number) {
		return this.movieService.getMovie(movieId);
	}

	@ResolveField()
	async review(@Parent() movie: Movie) {
		return this.movieService.getReview(movie.id ?? 0);
	}

	@ResolveField()
	async topBilledCast(@Parent() movie: Movie) {
		return this.movieService.getTopBilledCast(movie.id ?? 0);
	}

	@ResolveField()
	async featuredCrew(@Parent() movie: Movie) {
		return this.movieService.getFeaturedCrewMembers(movie.id ?? 0);
	}

	@ResolveField()
	async keywords(@Parent() movie: Movie) {
		return this.movieService.getKeywords(movie.id ?? 0);
	}

	@ResolveField()
	async social(@Parent() movie: Movie) {
		// Get the external social url (The homepage isn't set here as it's already apart of the original Movie query)
		const socials = await this.movieService.getSocials(movie.id ?? 0);

		return {
			...socials,

			// Since the homepage is apart of the original query append it to the homepage property
			homepage: movie.homepage
		};
	}

	@ResolveField()
	async youtubeVideo(@Parent() movie: Movie) {
		return this.movieService.getYouTubeVideo(movie.id ?? 0);
	}
}
