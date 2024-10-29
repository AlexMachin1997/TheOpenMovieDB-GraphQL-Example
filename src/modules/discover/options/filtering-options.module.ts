import { Module } from '@nestjs/common';

import { FilteringOptionsService } from './filtering-options.service';

@Module({
	providers: [FilteringOptionsService],
	exports: [FilteringOptionsService]
})
export class FilteringOptionsModule {}
