import { Resolver, Query, ResolveField } from '@nestjs/graphql';

import { MovieService } from './movie.service';
import { Cast, Movie, Review } from '../graphql.schema';

@Resolver('Movie')
export class MovieResolver {
	constructor(private readonly movieService: MovieService) {}

	@Query('movie')
	async getMovie(): Promise<Movie> {
		return this.movieService.findMovie();
	}

	// Attach the review to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async review(): Promise<Review | null> {
		return this.movieService.findMovieReview();
	}

	// Attach the top billed cast to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async topBilledCast(): Promise<Cast[] | null> {
		return this.movieService.findTopBilledCast();
	}
}
