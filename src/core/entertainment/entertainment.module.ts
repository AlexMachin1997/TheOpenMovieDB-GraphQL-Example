/* eslint-disable import/extensions */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/modules/utils/utils.module';

import { EntertainmentService } from './entertainment.service';
import { SocialsModule } from '../socials/socials.module';

@Module({
	providers: [EntertainmentService],
	exports: [EntertainmentService],
	imports: [HttpModule, UtilsModule, SocialsModule]
})
export class EntertainmentModule {}
