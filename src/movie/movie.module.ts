/* eslint-disable import/extensions */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { EntertainmentModule } from '../entertainment/entertainment.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
	providers: [MovieService, MovieResolver],
	imports: [HttpModule, UtilsModule, EntertainmentModule]
})
export class MovieModule {}
