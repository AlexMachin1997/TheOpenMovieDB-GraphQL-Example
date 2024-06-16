import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { TheOpenMovieDatabasePerson, TheOpenMovieDatabasePersonGender } from './person';
import { SocialsService } from '../socials/socials.service';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PersonService {
	constructor(
		private readonly utilService: UtilsService,
		private readonly httpService: HttpService,
		private readonly socialService: SocialsService
	) {}

	getBirthday(birthday: string) {
		const birthdayInReadableFormat = new Intl.DateTimeFormat('en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(birthday));

		const today = new Date();
		const birth = new Date(birthday);
		let age = today.getFullYear() - birth.getFullYear();
		const monthDifference = today.getMonth() - birth.getMonth();
		const dayDifference = today.getDate() - birth.getDate();

		// Adjust age if birthday hasn't occurred yet this year
		if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
			// eslint-disable-next-line no-plusplus
			age--;
		}

		return `${birthdayInReadableFormat} (${age} years old)`;
	}

	getGender(gender: TheOpenMovieDatabasePersonGender) {
		switch (gender) {
			case 0: {
				return 'Not set / not specified';
			}

			case 1: {
				return 'Female';
			}

			case 2: {
				return 'Male';
			}

			case 3: {
				return 'Non-bindary';
			}

			default: {
				return '';
			}
		}
	}

	async getPerson(personId: number) {
		const { data } = await firstValueFrom(
			this.httpService.get<TheOpenMovieDatabasePerson>(
				`https://api.themoviedb.org/3/person/${personId}?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization:
							// eslint-disable-next-line max-len
							'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDMwNWQxNmE1ZThkN2E3ZWMwZmM2NTk5MzZiY2EzMCIsInN1YiI6IjViMzE0MjQ1OTI1MTQxM2M5MTAwNTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iqdLKFCSgeWG3SYso7Rqj297FORviPf9hDdn2kKygTA'
					}
				}
			)
		);

		return {
			id: data.id,
			birthday: this.getBirthday(data.birthday),
			knowForDepartment: data.known_for_department,
			name: data.name,
			alsoKnownAs: data.also_known_as,
			gender: this.getGender(data.gender),
			overview: data.biography,
			placeOfBirth: data.place_of_birth,
			posterUrl: this.utilService.getFullImageUrlPath(data.profile_path),
			homepage: data.homepage
		};
	}

	async getSocials(personId: number) {
		return this.socialService.getSocials({
			resourceId: personId,
			resourceType: 'PERSON'
		});
	}
}
