import { Module } from '@nestjs/common';

import { DiscoverFormDataResolver } from './discover-form-data.resolver';
import { DiscoverFormDataService } from './discover-form-data.service';
import { FilteringOptionsModule } from '../options/filtering-options.module';

@Module({
	providers: [DiscoverFormDataService, DiscoverFormDataResolver],
	imports: [FilteringOptionsModule]
})
export class DiscoverFormDataModule {}
