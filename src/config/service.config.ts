import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

export const serviceConfig = ConfigModule.forRoot({
	isGlobal: true,
	validationSchema: joi.object({
		THE_OPEN_MOVIE_DATABASE_API_KEY: joi.string().required()
	})
});
