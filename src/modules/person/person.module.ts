import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';
import { SocialsModule } from '../../core/socials/socials.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
	providers: [PersonResolver, PersonService],
	imports: [UtilsModule, HttpModule, SocialsModule]
})
export class PersonModule {}
