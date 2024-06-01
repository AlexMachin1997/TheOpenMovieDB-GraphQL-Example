import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
// eslint-disable-next-line import/extensions
import { UtilsModule } from 'src/utils/utils.module';

import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';

@Module({
	providers: [MovieService, MovieResolver],
	imports: [HttpModule, UtilsModule]
})
export class MovieModule {}
