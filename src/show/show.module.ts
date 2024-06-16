import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ShowResolver } from './show.resolver';
import { ShowService } from './show.service';
import { EntertainmentModule } from '../entertainment/entertainment.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
	providers: [ShowService, ShowResolver],
	imports: [HttpModule, UtilsModule, EntertainmentModule]
})
export class ShowModule {}
