import { Injectable } from '@nestjs/common';

import { Gender } from '../types/gender';

@Injectable()
export class UtilsService {
	getFullImageUrlPath(imageUrl: string | null | undefined = null): string {
		if (imageUrl === null) {
			return '';
		}

		return `https://image.tmdb.org/t/p/original${imageUrl}`;
	}

	getNumberAsPercentage(value: number | null, highestValueProvided: number): `${number}%` {
		if (value === null) return '0%';
		return `${value * highestValueProvided}%`;
	}

	convertNumberToLocalCurrency(value: number): string {
		return value.toLocaleString('en-gb', {
			// The budget is a form of currency e.g. 10000
			style: 'currency',

			// TODO: Read the users current country code and output it in their format
			currency: 'GBP'
		});
	}

	getGender(gender: Gender) {
		switch (gender) {
			case 1: {
				return 'Female';
			}

			case 2: {
				return 'Male';
			}

			case 3: {
				return 'Non-binary';
			}

			default: {
				return 'Not set / not specified';
			}
		}
	}
}
