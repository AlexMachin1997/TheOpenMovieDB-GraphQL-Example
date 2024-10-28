import { Args, Query, Resolver } from '@nestjs/graphql';

import { DiscoverFilteringService } from './discover-filtering.service';
import { DiscoverFormDataInput } from '../graphql.schema';

@Resolver()
export class DiscoverFilteringResolver {
	constructor(private readonly discoverFilteringService: DiscoverFilteringService) {}

	@Query()
	discoverMovies(
		@Args('filterValues') filters: DiscoverFormDataInput,
		@Args('pageNumber') pageNumber: number
	) {
		return this.discoverFilteringService.getDiscoverMovies({ filters, pageNumber });
	}

	@Query()
	discoverShows(
		@Args('filterValues') filters: DiscoverFormDataInput,
		@Args('pageNumber') pageNumber: number
	) {
		return this.discoverFilteringService.getDiscoverShows({ filters, pageNumber });
	}
}
