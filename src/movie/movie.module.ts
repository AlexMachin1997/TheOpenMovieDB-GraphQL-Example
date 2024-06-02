/* eslint-disable import/extensions */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EntertainmentModule } from 'src/entertainment/entertainment.module';
import { UtilsModule } from 'src/utils/utils.module';

import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';

@Module({
	providers: [MovieService, MovieResolver],
	imports: [HttpModule, UtilsModule, EntertainmentModule]
})
export class MovieModule {}
