import { Resolver, Query } from '@nestjs/graphql';

import { MovieService } from './movie.service';
import { Movie } from '../graphql.schema';

@Resolver('Movie')
export class MovieResolver {
	constructor(private readonly movieService: MovieService) {}

	@Query('movie')
	async getMovie(): Promise<Movie> {
		return this.movieService.findMovie();
	}
}
