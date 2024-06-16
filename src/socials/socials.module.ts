import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SocialsService } from './socials.service';

@Module({
	providers: [SocialsService],
	imports: [HttpModule],
	exports: [SocialsService]
})
export class SocialsModule {}
