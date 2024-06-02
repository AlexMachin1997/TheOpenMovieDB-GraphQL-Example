import { Resolver, Query, ResolveField } from '@nestjs/graphql';

import { MovieService } from './movie.service';
import { Cast, Crew, Keyword, Movie, Review } from '../graphql.schema';

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

	// Attach the featured crew to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async featuredCrew(): Promise<Crew[] | null> {
		return this.movieService.findFeaturedCrewMembers();
	}

	// Attach the keywords to the Movie response, requires an external lookup as the data
	// isn't apart of the original /movie/:id query response
	@ResolveField()
	async keywords(): Promise<Keyword[] | null> {
		return this.movieService.findKeywords();
	}
}
