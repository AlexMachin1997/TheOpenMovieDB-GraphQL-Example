/* eslint-disable import/extensions */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/utils/utils.module';

import { EntertainmentService } from './entertainment.service';

@Module({
	providers: [EntertainmentService],
	exports: [EntertainmentService],
	imports: [HttpModule, UtilsModule]
})
export class EntertainmentModule {}
