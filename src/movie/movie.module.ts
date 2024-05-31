import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';

@Module({
	providers: [MovieService, MovieResolver],
	imports: [HttpModule]
})
export class MovieModule {}
