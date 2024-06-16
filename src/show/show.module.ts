/* eslint-disable import/extensions */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EntertainmentModule } from 'src/entertainment/entertainment.module';
import { UtilsModule } from 'src/utils/utils.module';

import { ShowResolver } from './show.resolver';
import { ShowService } from './show.service';

@Module({
	providers: [ShowService, ShowResolver],
	imports: [HttpModule, UtilsModule, EntertainmentModule]
})
export class ShowModule {}
