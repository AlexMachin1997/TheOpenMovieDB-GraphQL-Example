import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import {
	Group,
	IGetGroupCredits,
	TheOpenMovieDatabasePerson,
	TheOpenMovieDatabasePersonCombinedCredits
} from './person';
import { SocialsService } from '../socials/socials.service';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PersonService {
	constructor(
		private readonly utilService: UtilsService,
		private readonly httpService: HttpService,
		private readonly socialService: SocialsService,
		private readonly configService: ConfigService
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

	async getPerson(personId: number) {
		const { data } = await firstValueFrom(
			this.httpService.get<TheOpenMovieDatabasePerson>(
				`https://api.themoviedb.org/3/person/${personId}?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${this.configService.get('THE_OPEN_MOVIE_DATABASE_API_KEY')}`
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
			gender: this.utilService.getGender(data.gender),
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

	private getGroupCredits(departmentCredits: IGetGroupCredits) {
		const credits: Group[] = [];

		departmentCredits.forEach((departmentCredit) => {
			// Crew credit for a "movie"
			if (departmentCredit.type === 'crew' && departmentCredit.media_type === 'movie') {
				credits.push({
					mediaType: 'movie',
					character: departmentCredit.character,
					title: departmentCredit.title || departmentCredit.original_title,
					year: departmentCredit.release_date
						? new Date(departmentCredit.release_date).getFullYear()
						: '-',
					type: 'crew',
					department: departmentCredit.department
				});
			}

			// Crew credit for a "tv" show
			if (departmentCredit.type === 'crew' && departmentCredit.media_type === 'tv') {
				credits.push({
					mediaType: 'tv',
					character: departmentCredit.character,
					title: departmentCredit.name || departmentCredit.original_name,
					episodeCount: departmentCredit.episode_count,
					year: departmentCredit.first_air_date
						? new Date(departmentCredit.first_air_date).getFullYear()
						: '-',
					type: 'crew',
					department: departmentCredit.department
				});
			}

			// Cast credit for a "movie"
			if (departmentCredit.type === 'cast' && departmentCredit.media_type === 'movie') {
				credits.push({
					mediaType: 'movie',
					character: departmentCredit.character,
					title: departmentCredit.title || departmentCredit.original_title,
					year: departmentCredit.release_date
						? new Date(departmentCredit.release_date).getFullYear()
						: '-',
					type: 'cast'
				});
			}

			// Cast credit for a "tv" show
			if (departmentCredit.type === 'cast' && departmentCredit.media_type === 'tv') {
				credits.push({
					mediaType: 'tv',
					character: departmentCredit.character,
					title: departmentCredit.name || departmentCredit.original_name,
					episodeCount: departmentCredit.episode_count,
					year: departmentCredit.first_air_date
						? new Date(departmentCredit.first_air_date).getFullYear()
						: '-',
					type: 'cast'
				});
			}
		});

		// Sort the credits by the assigned year, it should be highest to lowest
		credits.sort((departmentCreditA, departmentCreditB) => {
			if (
				typeof departmentCreditA.year === 'number' &&
				typeof departmentCreditB.year === 'number'
			) {
				return departmentCreditA.year - departmentCreditB.year;
			}

			return 0;
		});

		const allCreditsWithEmptyYears = credits.filter((credit) => typeof credit.type === 'string');
		const allCreditsWithoutEmptyYears = credits.filter((credit) => typeof credit.year === 'number');

		// Add the credits with empty years to the top of the list so they are rendered at the top of the list in the user-interface
		const creditsWithEmptyYearsAtTop = [
			...allCreditsWithEmptyYears,
			...allCreditsWithoutEmptyYears
		];

		const groups: { year: number | '-'; credits: Group[] }[] = [];

		creditsWithEmptyYearsAtTop.forEach((credit) => {
			const groupIndex = groups.findIndex((el) => el.year === credit.year);

			// Add the credit to the existing group
			if (groupIndex !== -1) {
				groups[groupIndex].credits.push(credit);
			}

			// Create a new credit group
			if (groupIndex === -1) {
				groups.push({
					year: credit.year,
					credits: [credit]
				});
			}
		});

		return groups;
	}

	async getCredits(personId: number) {
		const { data } = await firstValueFrom(
			this.httpService.get<TheOpenMovieDatabasePersonCombinedCredits>(
				`https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-U`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${this.configService.get('THE_OPEN_MOVIE_DATABASE_API_KEY')}`
					}
				}
			)
		);

		const ActingGroup = this.getGroupCredits(
			data.cast.map((el) => ({
				...el,
				type: 'cast'
			}))
		);

		const ProductionGroup = this.getGroupCredits(
			data.crew
				.filter((el) => el.department === 'Production')
				.map((el) => ({
					...el,
					type: 'crew'
				}))
		);

		const WritingGroup = this.getGroupCredits(
			data.crew
				.filter((el) => el.department === 'Writing')
				.map((el) => ({
					...el,
					type: 'crew'
				}))
		);

		const DirectingGroup = this.getGroupCredits(
			data.crew
				.filter((el) => el.department === 'Directing')
				.map((el) => ({
					...el,
					type: 'crew'
				}))
		);

		const CrewGroup = this.getGroupCredits(
			data.crew
				.filter((el) => el.department === 'Crew')
				.map((el) => ({
					...el,
					type: 'crew'
				}))
		);

		const LightingGroup = this.getGroupCredits(
			data.crew
				.filter((el) => el.department === 'Lighting')
				.map((el) => ({
					...el,
					type: 'crew'
				}))
		);

		return {
			ActingGroup,
			ProductionGroup,
			WritingGroup,
			DirectingGroup,
			CrewGroup,
			LightingGroup
		};
	}
}
