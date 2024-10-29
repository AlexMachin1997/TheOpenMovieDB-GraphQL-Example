import { Module } from '@nestjs/common';

import { graphqlConfig } from './config/graphql.config';
import { serviceConfig } from './config/service.config';
import { DiscoverFilteringModule } from './modules/discover/filtering/discover-filtering.module';
import { DiscoverFormDataModule } from './modules/discover/form-data/discover-form-data.module';
import { FilteringOptionsModule } from './modules/discover/options/filtering-options.module';
import { MovieModule } from './modules/movies/movie.module';
import { PersonModule } from './modules/person/person.module';
import { ShowModule } from './modules/shows/show.module';

@Module({
	imports: [
		serviceConfig,
		graphqlConfig,

		ShowModule,
		MovieModule,
		PersonModule,
		DiscoverFormDataModule,
		FilteringOptionsModule,
		DiscoverFilteringModule
	]
})
export class AppModule {}
