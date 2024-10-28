import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { DiscoverFilteringResolver } from './discover-filtering.resolver';
import { DiscoverFilteringService } from './discover-filtering.service';
import { FilteringOptionsModule } from '../filtering-options/filtering-options.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
	providers: [DiscoverFilteringService, DiscoverFilteringResolver],
	imports: [FilteringOptionsModule, HttpModule, UtilsModule, FilteringOptionsModule]
})
export class DiscoverFilteringModule {}
