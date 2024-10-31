/* eslint-disable import/extensions */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EntertainmentModule } from 'src/core/entertainment/entertainment.module';

import { ShowResolver } from './show.resolver';
import { ShowService } from './show.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
	providers: [ShowService, ShowResolver],
	imports: [HttpModule, UtilsModule, EntertainmentModule]
})
export class ShowModule {}
