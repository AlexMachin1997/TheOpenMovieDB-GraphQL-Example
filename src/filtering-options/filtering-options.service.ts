import { Injectable } from '@nestjs/common';

import { ENTERTAINMENT_TYPES } from '../graphql.schema';

interface DropdownOptions<Value, Name> {
	label: string;
	id: string;
	value: Value;
	name: Name;
	order: number;
}

type AvailabilityOptionValue = 'all' | 'flatrate' | 'free' | 'ads' | 'rent' | 'buy';
type AvailabilityOptionName = 'all' | 'stream' | 'free' | 'ads' | 'rent' | 'buy';

type ReleaseTypeOptionValue = 'all' | '1' | '2' | '3' | '4' | '5' | '6';
type ReleaseTypeOptionName =
	| 'all'
	| 'premiere'
	| 'theatrical-ltd'
	| 'theatrical'
	| 'digital'
	| 'physical'
	| 'tv';

@Injectable()
export class FilteringOptionsService {
	getSortByOptions() {
		return [
			{
				label: 'Popularity Descending',
				id: 'popularity.desc',
				value: 'popularity.desc',
				order: 1
			},
			{
				label: 'Popularity Ascending',
				id: 'popularity.asc',
				value: 'popularity.asc',
				order: 2
			},
			{
				label: 'Rating Descending',
				id: 'vote_average.desc',
				value: 'vote_average.desc',
				order: 3
			},
			{
				label: 'Rating Ascending',
				id: 'vote_avaverage.asc',
				value: 'vote_average.asc',
				order: 4
			},
			{
				label: 'Release Date Descending',
				id: 'primary_release_date.desc',
				value: ' primary_release_date.desc',
				order: 5
			},
			{
				label: 'Release Date Ascending',
				id: 'primary_release_date.asc',
				value: ' primary_release_date.asc',
				order: 6
			},
			{
				label: 'Title (Z-A)',
				id: 'original_title.desc',
				value: 'original_title.desc',
				order: 7
			},
			{
				label: 'Title (A-Z)',
				id: 'original_title.asc',
				value: 'original_title.asc',
				order: 8
			},
			{
				label: 'Revenue Descending',
				id: ' revenue.desc',
				value: ' revenue.desc',
				order: 9
			},
			{
				label: 'Revenue Ascending',
				id: ' revenue.asc',
				value: ' revenue.asc',
				order: 10
			},
			{
				label: 'Vote Count Descending',
				id: 'vote_count.desc',
				value: 'vote_count.desc',
				order: 11
			},
			{
				label: 'Vote Count Ascending',
				id: 'vote_count.asc',
				value: 'vote_count.asc',
				order: 12
			}
		].sort((a, b) => a.order - b.order);
	}

	getShowMeRadioOptions({
		isAuthenticated,
		entertainmentType
	}: {
		isAuthenticated?: boolean;
		entertainmentType: ENTERTAINMENT_TYPES;
	}) {
		return [
			{
				label: 'Everything',
				id: 'Everything-Option',
				value: '0',
				order: 1,
				disabled: false
			},
			{
				label:
					entertainmentType === ENTERTAINMENT_TYPES.MOVIE
						? "Movies I haven't Seen"
						: "TV Shows I Haven't Seen",
				id:
					entertainmentType === ENTERTAINMENT_TYPES.MOVIE
						? "Movies-I-Haven't-Seen-Option"
						: "TV-Shows-I-Haven't-Seen-Option",
				value: '1',
				order: 2,
				disabled: isAuthenticated === false
			},
			{
				label:
					entertainmentType === ENTERTAINMENT_TYPES.MOVIE
						? 'Movies I have Seen'
						: 'TV Shows I Have Seen',
				id:
					entertainmentType === ENTERTAINMENT_TYPES.MOVIE
						? 'Movies-I-Have-Seen-Option'
						: 'TV-Shows-Have-Seen-Option',
				value: '2',
				order: 3,
				disabled: isAuthenticated === false
			}
		].sort((a, b) => a.order - b.order);
	}

	getAvailabilityOptions({
		excludeOptions = []
	}: {
		excludeOptions?: Array<AvailabilityOptionName>;
	} = {}): Array<DropdownOptions<AvailabilityOptionValue, AvailabilityOptionName>> {
		let availabilityOptions: Array<
			DropdownOptions<AvailabilityOptionValue, AvailabilityOptionName>
		> = [
			{
				label: 'Search all availabilities',
				id: 'Search-All-Availabilities-Option',
				value: 'all', // Special value, this just takes all the existing values
				order: 1,
				name: 'all'
			},
			{
				label: 'Stream',
				id: 'Stream-Option',
				value: 'flatrate',
				order: 2,
				name: 'stream'
			},
			{
				label: 'Free',
				id: 'Free-Option',
				value: 'free',
				order: 3,
				name: 'free'
			},
			{
				label: 'Ads',
				id: 'Ads-Option',
				value: 'ads',
				order: 4,
				name: 'ads'
			},
			{
				label: 'Rent',
				id: 'Rent-Option',
				value: 'rent',
				order: 5,
				name: 'rent'
			},
			{
				label: 'Buy',
				id: 'Buy-Option',
				value: 'buy',
				order: 6,
				name: 'buy'
			}
		];

		if (excludeOptions.length > 0) {
			availabilityOptions = availabilityOptions.filter(
				(option) => !excludeOptions.includes(option.name)
			);
		}

		return availabilityOptions.sort((a, b) => a.order - b.order);
	}

	getGenreOptions() {
		return [
			{
				label: 'Action',
				id: 'Action-Option',
				value: '28',
				order: 1
			},
			{
				label: 'Adventure',
				id: 'Adventure-Option',
				value: '12',
				order: 2
			},
			{
				label: 'Animation',
				id: 'Animation-Option',
				value: '16',
				order: 3
			},
			{
				label: 'Comedy',
				id: 'Comedy-Option',
				value: '35',
				order: 4
			},
			{
				label: 'Crime',
				id: 'Crime-Option',
				value: '80',
				order: 5
			},
			{
				label: 'Documentary',
				id: 'Documentary-Option',
				value: '99',
				order: 6
			},
			{
				label: 'Drama',
				id: 'Drama-Option',
				value: '18',
				order: 7
			},
			{
				label: 'Family',
				id: 'Family-Option',
				value: '10751',
				order: 8
			},
			{
				label: 'Fantasy',
				id: 'Fantasy-Option',
				value: '14',
				order: 9
			},
			{
				label: 'History',
				id: 'History-Option',
				value: '36',
				order: 10
			},
			{
				label: 'Horror',
				id: 'Horror-Option',
				value: '27',
				order: 11
			},
			{
				label: 'Music',
				id: 'Music-Option',
				value: '10402',
				order: 12
			},
			{
				label: 'Mystery',
				id: 'Mystery-Option',
				value: '9648',
				order: 13
			},
			{
				label: 'Romance',
				id: 'Romance-Option',
				value: '10749',
				order: 14
			},
			{
				label: 'Science Fiction',
				id: 'Science-Fiction-Option',
				value: '878',
				order: 15
			},
			{
				label: 'TV Movie',
				id: 'TV-And-Movie-Option',
				value: '10770',
				order: 16
			},
			{
				label: 'Thriller',
				id: 'Thriller-Option',
				value: '53',
				order: 17
			},
			{
				label: 'War',
				id: 'War-Option',
				value: '10752',
				order: 18
			},
			{
				label: 'Western',
				id: 'Western-Option',
				value: '37',
				order: 19
			}
		].sort((a, b) => a.order - b.order);
	}

	getCertificateOptions() {
		return [
			{
				label: 'NR',
				id: 'NR-Option',
				value: 'NR',
				order: 1
			},
			{
				label: 'G',
				id: 'G-Option',
				value: 'G',
				order: 2
			},
			{
				label: 'pg',
				id: 'PG-Option',
				value: 'PG',
				order: 3
			},
			{
				label: 'PG-13',
				id: 'PG-13-Option',
				value: 'PG-13',
				order: 4
			},
			{
				label: 'R',
				id: 'R-Option',
				value: 'R',
				order: 5
			},
			{
				label: 'NC-17',
				id: 'N17-Option',
				value: 'NC-17',
				order: 6
			}
		].sort((a, b) => a.order - b.order);
	}

	getReleaseTypeOptions({
		excludeOptions = []
	}: { excludeOptions?: Array<ReleaseTypeOptionName> } = {}) {
		let releaseTypes: Array<DropdownOptions<ReleaseTypeOptionValue, ReleaseTypeOptionName>> = [
			{
				label: 'Search all releases',
				id: 'Search-All-Releases',
				value: 'all',
				order: 1,
				name: 'all'
			},
			{
				label: 'Premiere',
				id: 'Premiere-Option',
				value: '1',
				order: 2,
				name: 'premiere'
			},
			{
				label: 'Theatrical (Limited)',
				id: 'Theatrical-Limited-Option',
				value: '2',
				order: 3,
				name: 'theatrical-ltd'
			},
			{
				label: 'Theatrical',
				id: 'Theatrical-Option',
				value: '3',
				order: 4,
				name: 'theatrical'
			},
			{
				label: 'Digital',
				id: 'Digital-Option',
				value: '4',
				order: 5,
				name: 'digital'
			},
			{
				label: 'Physical',
				id: 'Physical-Option',
				value: '5',
				order: 6,
				name: 'physical'
			},
			{
				label: 'TV',
				id: 'TV-Option',
				value: '6',
				order: 7,
				name: 'tv'
			}
		];

		if (excludeOptions.length > 0) {
			releaseTypes = releaseTypes.filter((option) => !excludeOptions.includes(option.name));
		}

		return releaseTypes
			.filter((option) => !excludeOptions.includes(option.name))
			.sort((a, b) => a.order - b.order);
	}

	getLanguageOptions() {
		const listOfSupportedLanguages = [
			{
				iso_639_1: 'none',
				label: 'None Selected',
				name: 'none'
			},
			{
				iso_639_1: 'bi',
				label: 'Bislama',
				name: ''
			},
			{
				iso_639_1: 'cs',
				label: 'Czech',
				name: 'Český'
			},
			{
				iso_639_1: 'ba',
				label: 'Bashkir',
				name: ''
			},
			{
				iso_639_1: 'ae',
				label: 'Avestan',
				name: ''
			},
			{
				iso_639_1: 'av',
				label: 'Avaric',
				name: ''
			},
			{
				iso_639_1: 'de',
				label: 'German',
				name: 'Deutsch'
			},
			{
				iso_639_1: 'mt',
				label: 'Maltese',
				name: 'Malti'
			},
			{
				iso_639_1: 'om',
				label: 'Oromo',
				name: ''
			},
			{
				iso_639_1: 'rm',
				label: 'Raeto-Romance',
				name: ''
			},
			{
				iso_639_1: 'so',
				label: 'Somali',
				name: 'Somali'
			},
			{
				iso_639_1: 'ts',
				label: 'Tsonga',
				name: ''
			},
			{
				iso_639_1: 'vi',
				label: 'Vietnamese',
				name: 'Tiếng Việt'
			},
			{
				iso_639_1: 'gn',
				label: 'Guarani',
				name: ''
			},
			{
				iso_639_1: 'ig',
				label: 'Igbo',
				name: ''
			},
			{
				iso_639_1: 'it',
				label: 'Italian',
				name: 'Italiano'
			},
			{
				iso_639_1: 'ki',
				label: 'Kikuyu',
				name: ''
			},
			{
				iso_639_1: 'ku',
				label: 'Kurdish',
				name: ''
			},
			{
				iso_639_1: 'la',
				label: 'Latin',
				name: 'Latin'
			},
			{
				iso_639_1: 'ln',
				label: 'Lingala',
				name: ''
			},
			{
				iso_639_1: 'lb',
				label: 'Letzeburgesch',
				name: ''
			},
			{
				iso_639_1: 'ny',
				label: 'Chichewa; Nyanja',
				name: ''
			},
			{
				iso_639_1: 'pl',
				label: 'Polish',
				name: 'Polski'
			},
			{
				iso_639_1: 'si',
				label: 'Sinhalese',
				name: 'සිංහල'
			},
			{
				iso_639_1: 'to',
				label: 'Tonga',
				name: ''
			},
			{
				iso_639_1: 'az',
				label: 'Azerbaijani',
				name: 'Azərbaycan'
			},
			{
				iso_639_1: 'ce',
				label: 'Chechen',
				name: ''
			},
			{
				iso_639_1: 'cu',
				label: 'Slavic',
				name: ''
			},
			{
				iso_639_1: 'da',
				label: 'Danish',
				name: 'Dansk'
			},
			{
				iso_639_1: 'hz',
				label: 'Herero',
				name: ''
			},
			{
				iso_639_1: 'ie',
				label: 'Interlingue',
				name: ''
			},
			{
				iso_639_1: 'rw',
				label: 'Kinyarwanda',
				name: 'Kinyarwanda'
			},
			{
				iso_639_1: 'mi',
				label: 'Maori',
				name: ''
			},
			{
				iso_639_1: 'no',
				label: 'Norwegian',
				name: 'Norsk'
			},
			{
				iso_639_1: 'pi',
				label: 'Pali',
				name: ''
			},
			{
				iso_639_1: 'sk',
				label: 'Slovak',
				name: 'Slovenčina'
			},
			{
				iso_639_1: 'se',
				label: 'Northern Sami',
				name: ''
			},
			{
				iso_639_1: 'sm',
				label: 'Samoan',
				name: ''
			},
			{
				iso_639_1: 'uk',
				label: 'Ukrainian',
				name: 'Український'
			},
			{
				iso_639_1: 'en',
				label: 'English',
				name: 'English'
			},
			{
				iso_639_1: 'ay',
				label: 'Aymara',
				name: ''
			},
			{
				iso_639_1: 'ca',
				label: 'Catalan',
				name: 'Català'
			},
			{
				iso_639_1: 'eo',
				label: 'Esperanto',
				name: 'Esperanto'
			},
			{
				iso_639_1: 'ha',
				label: 'Hausa',
				name: 'Hausa'
			},
			{
				iso_639_1: 'ho',
				label: 'Hiri Motu',
				name: ''
			},
			{
				iso_639_1: 'hu',
				label: 'Hungarian',
				name: 'Magyar'
			},
			{
				iso_639_1: 'io',
				label: 'Ido',
				name: ''
			},
			{
				iso_639_1: 'ii',
				label: 'Yi',
				name: ''
			},
			{
				iso_639_1: 'kn',
				label: 'Kannada',
				name: '?????'
			},
			{
				iso_639_1: 'kv',
				label: 'Komi',
				name: ''
			},
			{
				iso_639_1: 'li',
				label: 'Limburgish',
				name: ''
			},
			{
				iso_639_1: 'oj',
				label: 'Ojibwa',
				name: ''
			},
			{
				iso_639_1: 'ru',
				label: 'Russian',
				name: 'Pусский'
			},
			{
				iso_639_1: 'sr',
				label: 'Serbian',
				name: 'Srpski'
			},
			{
				iso_639_1: 'sv',
				label: 'Swedish',
				name: 'svenska'
			},
			{
				iso_639_1: 'ty',
				label: 'Tahitian',
				name: ''
			},
			{
				iso_639_1: 'zu',
				label: 'Zulu',
				name: 'isiZulu'
			},
			{
				iso_639_1: 'ka',
				label: 'Georgian',
				name: 'ქართული'
			},
			{
				iso_639_1: 'ch',
				label: 'Chamorro',
				name: "Finu' Chamorro"
			},
			{
				iso_639_1: 'be',
				label: 'Belarusian',
				name: 'беларуская мова'
			},
			{
				iso_639_1: 'br',
				label: 'Breton',
				name: ''
			},
			{
				iso_639_1: 'kw',
				label: 'Cornish',
				name: ''
			},
			{
				iso_639_1: 'fi',
				label: 'Finnish',
				name: 'suomi'
			},
			{
				iso_639_1: 'sh',
				label: 'Serbo-Croatian',
				name: ''
			},
			{
				iso_639_1: 'nn',
				label: 'Norwegian Nynorsk',
				name: ''
			},
			{
				iso_639_1: 'tt',
				label: 'Tatar',
				name: ''
			},
			{
				iso_639_1: 'tg',
				label: 'Tajik',
				name: ''
			},
			{
				iso_639_1: 'vo',
				label: 'Volapük',
				name: ''
			},
			{
				iso_639_1: 'ps',
				label: 'Pushto',
				name: 'پښتو'
			},
			{
				iso_639_1: 'mk',
				label: 'Macedonian',
				name: ''
			},
			{
				iso_639_1: 'fr',
				label: 'French',
				name: 'Français'
			},
			{
				iso_639_1: 'bm',
				label: 'Bambara',
				name: 'Bamanankan'
			},
			{
				iso_639_1: 'eu',
				label: 'Basque',
				name: 'euskera'
			},
			{
				iso_639_1: 'fj',
				label: 'Fijian',
				name: ''
			},
			{
				iso_639_1: 'id',
				label: 'Indonesian',
				name: 'Bahasa indonesia'
			},
			{
				iso_639_1: 'mg',
				label: 'Malagasy',
				name: ''
			},
			{
				iso_639_1: 'na',
				label: 'Nauru',
				name: ''
			},
			{
				iso_639_1: 'xx',
				label: 'No Language',
				name: 'No Language'
			},
			{
				iso_639_1: 'qu',
				label: 'Quechua',
				name: ''
			},
			{
				iso_639_1: 'sq',
				label: 'Albanian',
				name: 'shqip'
			},
			{
				iso_639_1: 'ti',
				label: 'Tigrinya',
				name: ''
			},
			{
				iso_639_1: 'tw',
				label: 'Twi',
				name: ''
			},
			{
				iso_639_1: 'wa',
				label: 'Walloon',
				name: ''
			},
			{
				iso_639_1: 'ab',
				label: 'Abkhazian',
				name: ''
			},
			{
				iso_639_1: 'bs',
				label: 'Bosnian',
				name: 'Bosanski'
			},
			{
				iso_639_1: 'af',
				label: 'Afrikaans',
				name: 'Afrikaans'
			},
			{
				iso_639_1: 'an',
				label: 'Aragonese',
				name: ''
			},
			{
				iso_639_1: 'fy',
				label: 'Frisian',
				name: ''
			},
			{
				iso_639_1: 'gu',
				label: 'Gujarati',
				name: ''
			},
			{
				iso_639_1: 'ik',
				label: 'Inupiaq',
				name: ''
			},
			{
				iso_639_1: 'ja',
				label: 'Japanese',
				name: '日本語'
			},
			{
				iso_639_1: 'ko',
				label: 'Korean',
				name: '한국어/조선말'
			},
			{
				iso_639_1: 'lg',
				label: 'Ganda',
				name: ''
			},
			{
				iso_639_1: 'nl',
				label: 'Dutch',
				name: 'Nederlands'
			},
			{
				iso_639_1: 'os',
				label: 'Ossetian; Ossetic',
				name: ''
			},
			{
				iso_639_1: 'el',
				label: 'Greek',
				name: 'ελληνικά'
			},
			{
				iso_639_1: 'bn',
				label: 'Bengali',
				name: 'বাংলা'
			},
			{
				iso_639_1: 'cr',
				label: 'Cree',
				name: ''
			},
			{
				iso_639_1: 'km',
				label: 'Khmer',
				name: ''
			},
			{
				iso_639_1: 'lo',
				label: 'Lao',
				name: ''
			},
			{
				iso_639_1: 'nd',
				label: 'Ndebele',
				name: ''
			},
			{
				iso_639_1: 'ne',
				label: 'Nepali',
				name: ''
			},
			{
				iso_639_1: 'sc',
				label: 'Sardinian',
				name: ''
			},
			{
				iso_639_1: 'sw',
				label: 'Swahili',
				name: 'Kiswahili'
			},
			{
				iso_639_1: 'tl',
				label: 'Tagalog',
				name: ''
			},
			{
				iso_639_1: 'ur',
				label: 'Urdu',
				name: 'اردو'
			},
			{
				iso_639_1: 'ee',
				label: 'Ewe',
				name: 'Èʋegbe'
			},
			{
				iso_639_1: 'aa',
				label: 'Afar',
				name: ''
			},
			{
				iso_639_1: 'co',
				label: 'Corsican',
				name: ''
			},
			{
				iso_639_1: 'et',
				label: 'Estonian',
				name: 'Eesti'
			},
			{
				iso_639_1: 'is',
				label: 'Icelandic',
				name: 'Íslenska'
			},
			{
				iso_639_1: 'ks',
				label: 'Kashmiri',
				name: ''
			},
			{
				iso_639_1: 'kr',
				label: 'Kanuri',
				name: ''
			},
			{
				iso_639_1: 'ky',
				label: 'Kirghiz',
				name: '??????'
			},
			{
				iso_639_1: 'kj',
				label: 'Kuanyama',
				name: ''
			},
			{
				iso_639_1: 'nr',
				label: 'Ndebele',
				name: ''
			},
			{
				iso_639_1: 'or',
				label: 'Oriya',
				name: ''
			},
			{
				iso_639_1: 'wo',
				label: 'Wolof',
				name: 'Wolof'
			},
			{
				iso_639_1: 'za',
				label: 'Zhuang',
				name: ''
			},
			{
				iso_639_1: 'ar',
				label: 'Arabic',
				name: 'العربية'
			},
			{
				iso_639_1: 'cv',
				label: 'Chuvash',
				name: ''
			},
			{
				iso_639_1: 'fo',
				label: 'Faroese',
				name: ''
			},
			{
				iso_639_1: 'hr',
				label: 'Croatian',
				name: 'Hrvatski'
			},
			{
				iso_639_1: 'ms',
				label: 'Malay',
				name: 'Bahasa melayu'
			},
			{
				iso_639_1: 'nb',
				label: 'Norwegian Bokmål',
				name: 'Bokmål'
			},
			{
				iso_639_1: 'rn',
				label: 'Rundi',
				name: 'Kirundi'
			},
			{
				iso_639_1: 'sn',
				label: 'Shona',
				name: ''
			},
			{
				iso_639_1: 'st',
				label: 'Sotho',
				name: ''
			},
			{
				iso_639_1: 'tr',
				label: 'Turkish',
				name: 'Türkçe'
			},
			{
				iso_639_1: 'am',
				label: 'Amharic',
				name: ''
			},
			{
				iso_639_1: 'fa',
				label: 'Persian',
				name: 'فارسی'
			},
			{
				iso_639_1: 'hy',
				label: 'Armenian',
				name: ''
			},
			{
				iso_639_1: 'pa',
				label: 'Punjabi',
				name: 'ਪੰਜਾਬੀ'
			},
			{
				iso_639_1: 'as',
				label: 'Assamese',
				name: ''
			},
			{
				iso_639_1: 'ia',
				label: 'Interlingua',
				name: ''
			},
			{
				iso_639_1: 'lv',
				label: 'Latvian',
				name: 'Latviešu'
			},
			{
				iso_639_1: 'lu',
				label: 'Luba-Katanga',
				name: ''
			},
			{
				iso_639_1: 'mr',
				label: 'Marathi',
				name: ''
			},
			{
				iso_639_1: 'mn',
				label: 'Mongolian',
				name: ''
			},
			{
				iso_639_1: 'pt',
				label: 'Portuguese',
				name: 'Português'
			},
			{
				iso_639_1: 'th',
				label: 'Thai',
				name: 'ภาษาไทย'
			},
			{
				iso_639_1: 'tk',
				label: 'Turkmen',
				name: ''
			},
			{
				iso_639_1: 've',
				label: 'Venda',
				name: ''
			},
			{
				iso_639_1: 'dv',
				label: 'Divehi',
				name: ''
			},
			{
				iso_639_1: 'gv',
				label: 'Manx',
				name: ''
			},
			{
				iso_639_1: 'kl',
				label: 'Kalaallisut',
				name: ''
			},
			{
				iso_639_1: 'kk',
				label: 'Kazakh',
				name: 'қазақ'
			},
			{
				iso_639_1: 'lt',
				label: 'Lithuanian',
				name: 'Lietuvių'
			},
			{
				iso_639_1: 'my',
				label: 'Burmese',
				name: ''
			},
			{
				iso_639_1: 'sl',
				label: 'Slovenian',
				name: 'Slovenščina'
			},
			{
				iso_639_1: 'sd',
				label: 'Sindhi',
				name: ''
			},
			{
				iso_639_1: 'cn',
				label: 'Cantonese',
				name: '广州话 / 廣州話'
			},
			{
				iso_639_1: 'hi',
				label: 'Hindi',
				name: 'हिन्दी'
			},
			{
				iso_639_1: 'cy',
				label: 'Welsh',
				name: 'Cymraeg'
			},
			{
				iso_639_1: 'ht',
				label: 'Haitian; Haitian Creole',
				name: ''
			},
			{
				iso_639_1: 'iu',
				label: 'Inuktitut',
				name: ''
			},
			{
				iso_639_1: 'jv',
				label: 'Javanese',
				name: ''
			},
			{
				iso_639_1: 'mh',
				label: 'Marshall',
				name: ''
			},
			{
				iso_639_1: 'sa',
				label: 'Sanskrit',
				name: ''
			},
			{
				iso_639_1: 'ss',
				label: 'Swati',
				name: ''
			},
			{
				iso_639_1: 'te',
				label: 'Telugu',
				name: 'తెలుగు'
			},
			{
				iso_639_1: 'kg',
				label: 'Kongo',
				name: ''
			},
			{
				iso_639_1: 'ml',
				label: 'Malayalam',
				name: ''
			},
			{
				iso_639_1: 'uz',
				label: 'Uzbek',
				name: 'ozbek'
			},
			{
				iso_639_1: 'sg',
				label: 'Sango',
				name: ''
			},
			{
				iso_639_1: 'xh',
				label: 'Xhosa',
				name: ''
			},
			{
				iso_639_1: 'es',
				label: 'Spanish',
				name: 'Español'
			},
			{
				iso_639_1: 'su',
				label: 'Sundanese',
				name: ''
			},
			{
				iso_639_1: 'ug',
				label: 'Uighur',
				name: ''
			},
			{
				iso_639_1: 'yi',
				label: 'Yiddish',
				name: ''
			},
			{
				iso_639_1: 'yo',
				label: 'Yoruba',
				name: 'Èdè Yorùbá'
			},
			{
				iso_639_1: 'zh',
				label: 'Mandarin',
				name: '普通话'
			},
			{
				iso_639_1: 'he',
				label: 'Hebrew',
				name: 'עִבְרִית'
			},
			{
				iso_639_1: 'bo',
				label: 'Tibetan',
				name: ''
			},
			{
				iso_639_1: 'ak',
				label: 'Akan',
				name: ''
			},
			{
				iso_639_1: 'mo',
				label: 'Moldavian',
				name: ''
			},
			{
				iso_639_1: 'ng',
				label: 'Ndonga',
				name: ''
			},
			{
				iso_639_1: 'dz',
				label: 'Dzongkha',
				name: ''
			},
			{
				iso_639_1: 'ff',
				label: 'Fulah',
				name: 'Fulfulde'
			},
			{
				iso_639_1: 'gd',
				label: 'Gaelic',
				name: ''
			},
			{
				iso_639_1: 'ga',
				label: 'Irish',
				name: 'Gaeilge'
			},
			{
				iso_639_1: 'gl',
				label: 'Galician',
				name: 'Galego'
			},
			{
				iso_639_1: 'nv',
				label: 'Navajo',
				name: ''
			},
			{
				iso_639_1: 'oc',
				label: 'Occitan',
				name: ''
			},
			{
				iso_639_1: 'ro',
				label: 'Romanian',
				name: 'Română'
			},
			{
				iso_639_1: 'ta',
				label: 'Tamil',
				name: 'தமிழ்'
			},
			{
				iso_639_1: 'tn',
				label: 'Tswana',
				name: ''
			},
			{
				iso_639_1: 'bg',
				label: 'Bulgarian',
				name: 'български език'
			}
		];

		// Format the language options
		const languageOptions = listOfSupportedLanguages.map((languageOption) => {
			// Don't format the 'none' option no need to.
			if (languageOption.name === 'none') {
				return {
					value: languageOption.iso_639_1,
					label: languageOption.label
				};
			}

			// If the option isn't all then do this formatting instead
			return {
				...languageOption,
				value: languageOption.iso_639_1,
				label: `${languageOption.label} (${languageOption.iso_639_1.toUpperCase()})`
			};
		});

		// Get the first value from the language options (Should be the 'None Selected' option)
		const [firstValue, ...reset] = languageOptions;

		// Insert the 'None Selected' and sort all the oother options in alphabetical order
		return [firstValue, ...reset.sort((a, b) => a.label.localeCompare(b.label))];
	}

	getCountryOptions() {
		const listOfAvailableCountries = [
			{
				iso_3166_1: 'AD',
				english_name: 'Andorra'
			},
			{
				iso_3166_1: 'AE',
				english_name: 'United Arab Emirates'
			},
			{
				iso_3166_1: 'AF',
				english_name: 'Afghanistan'
			},
			{
				iso_3166_1: 'AG',
				english_name: 'Antigua and Barbuda'
			},
			{
				iso_3166_1: 'AI',
				english_name: 'Anguilla'
			},
			{
				iso_3166_1: 'AL',
				english_name: 'Albania'
			},
			{
				iso_3166_1: 'AM',
				english_name: 'Armenia'
			},
			{
				iso_3166_1: 'AN',
				english_name: 'Netherlands Antilles'
			},
			{
				iso_3166_1: 'AO',
				english_name: 'Angola'
			},
			{
				iso_3166_1: 'AQ',
				english_name: 'Antarctica'
			},
			{
				iso_3166_1: 'AR',
				english_name: 'Argentina'
			},
			{
				iso_3166_1: 'AS',
				english_name: 'American Samoa'
			},
			{
				iso_3166_1: 'AT',
				english_name: 'Austria'
			},
			{
				iso_3166_1: 'AU',
				english_name: 'Australia'
			},
			{
				iso_3166_1: 'AW',
				english_name: 'Aruba'
			},
			{
				iso_3166_1: 'AZ',
				english_name: 'Azerbaijan'
			},
			{
				iso_3166_1: 'BA',
				english_name: 'Bosnia and Herzegovina'
			},
			{
				iso_3166_1: 'BB',
				english_name: 'Barbados'
			},
			{
				iso_3166_1: 'BD',
				english_name: 'Bangladesh'
			},
			{
				iso_3166_1: 'BE',
				english_name: 'Belgium'
			},
			{
				iso_3166_1: 'BF',
				english_name: 'Burkina Faso'
			},
			{
				iso_3166_1: 'BG',
				english_name: 'Bulgaria'
			},
			{
				iso_3166_1: 'BH',
				english_name: 'Bahrain'
			},
			{
				iso_3166_1: 'BI',
				english_name: 'Burundi'
			},
			{
				iso_3166_1: 'BJ',
				english_name: 'Benin'
			},
			{
				iso_3166_1: 'BM',
				english_name: 'Bermuda'
			},
			{
				iso_3166_1: 'BN',
				english_name: 'Brunei Darussalam'
			},
			{
				iso_3166_1: 'BO',
				english_name: 'Bolivia'
			},
			{
				iso_3166_1: 'BR',
				english_name: 'Brazil'
			},
			{
				iso_3166_1: 'BS',
				english_name: 'Bahamas'
			},
			{
				iso_3166_1: 'BT',
				english_name: 'Bhutan'
			},
			{
				iso_3166_1: 'BV',
				english_name: 'Bouvet Island'
			},
			{
				iso_3166_1: 'BW',
				english_name: 'Botswana'
			},
			{
				iso_3166_1: 'BZ',
				english_name: 'Belize'
			},
			{
				iso_3166_1: 'BY',
				english_name: 'Belarus'
			},
			{
				iso_3166_1: 'CA',
				english_name: 'Canada'
			},
			{
				iso_3166_1: 'CC',
				english_name: 'Cocos Islands'
			},
			{
				iso_3166_1: 'CD',
				english_name: 'Congo'
			},
			{
				iso_3166_1: 'CF',
				english_name: 'Central African Republic'
			},
			{
				iso_3166_1: 'CG',
				english_name: 'Congo'
			},
			{
				iso_3166_1: 'CH',
				english_name: 'Switzerland'
			},
			{
				iso_3166_1: 'CI',
				english_name: "Cote D'Ivoire"
			},
			{
				iso_3166_1: 'CK',
				english_name: 'Cook Islands'
			},
			{
				iso_3166_1: 'CL',
				english_name: 'Chile'
			},
			{
				iso_3166_1: 'CM',
				english_name: 'Cameroon'
			},
			{
				iso_3166_1: 'CN',
				english_name: 'China'
			},
			{
				iso_3166_1: 'CO',
				english_name: 'Colombia'
			},
			{
				iso_3166_1: 'CR',
				english_name: 'Costa Rica'
			},
			{
				iso_3166_1: 'CS',
				english_name: 'Serbia and Montenegro'
			},
			{
				iso_3166_1: 'CU',
				english_name: 'Cuba'
			},
			{
				iso_3166_1: 'CV',
				english_name: 'Cape Verde'
			},
			{
				iso_3166_1: 'CX',
				english_name: 'Christmas Island'
			},
			{
				iso_3166_1: 'CY',
				english_name: 'Cyprus'
			},
			{
				iso_3166_1: 'CZ',
				english_name: 'Czech Republic'
			},
			{
				iso_3166_1: 'DE',
				english_name: 'Germany'
			},
			{
				iso_3166_1: 'DJ',
				english_name: 'Djibouti'
			},
			{
				iso_3166_1: 'DK',
				english_name: 'Denmark'
			},
			{
				iso_3166_1: 'DM',
				english_name: 'Dominica'
			},
			{
				iso_3166_1: 'DO',
				english_name: 'Dominican Republic'
			},
			{
				iso_3166_1: 'DZ',
				english_name: 'Algeria'
			},
			{
				iso_3166_1: 'EC',
				english_name: 'Ecuador'
			},
			{
				iso_3166_1: 'EE',
				english_name: 'Estonia'
			},
			{
				iso_3166_1: 'EG',
				english_name: 'Egypt'
			},
			{
				iso_3166_1: 'EH',
				english_name: 'Western Sahara'
			},
			{
				iso_3166_1: 'ER',
				english_name: 'Eritrea'
			},
			{
				iso_3166_1: 'ES',
				english_name: 'Spain'
			},
			{
				iso_3166_1: 'ET',
				english_name: 'Ethiopia'
			},
			{
				iso_3166_1: 'FI',
				english_name: 'Finland'
			},
			{
				iso_3166_1: 'FJ',
				english_name: 'Fiji'
			},
			{
				iso_3166_1: 'FK',
				english_name: 'Falkland Islands'
			},
			{
				iso_3166_1: 'RS',
				english_name: 'Serbia'
			},
			{
				iso_3166_1: 'FM',
				english_name: 'Micronesia'
			},
			{
				iso_3166_1: 'FO',
				english_name: 'Faeroe Islands'
			},
			{
				iso_3166_1: 'FR',
				english_name: 'France'
			},
			{
				iso_3166_1: 'GA',
				english_name: 'Gabon'
			},
			{
				iso_3166_1: 'GB',
				english_name: 'United Kingdom'
			},
			{
				iso_3166_1: 'GD',
				english_name: 'Grenada'
			},
			{
				iso_3166_1: 'GE',
				english_name: 'Georgia'
			},
			{
				iso_3166_1: 'GF',
				english_name: 'French Guiana'
			},
			{
				iso_3166_1: 'GH',
				english_name: 'Ghana'
			},
			{
				iso_3166_1: 'GI',
				english_name: 'Gibraltar'
			},
			{
				iso_3166_1: 'GL',
				english_name: 'Greenland'
			},
			{
				iso_3166_1: 'GM',
				english_name: 'Gambia'
			},
			{
				iso_3166_1: 'GN',
				english_name: 'Guinea'
			},
			{
				iso_3166_1: 'GP',
				english_name: 'Guadaloupe'
			},
			{
				iso_3166_1: 'GQ',
				english_name: 'Equatorial Guinea'
			},
			{
				iso_3166_1: 'GR',
				english_name: 'Greece'
			},
			{
				iso_3166_1: 'GS',
				english_name: 'South Georgia and the South Sandwich Islands'
			},
			{
				iso_3166_1: 'GT',
				english_name: 'Guatemala'
			},
			{
				iso_3166_1: 'GU',
				english_name: 'Guam'
			},
			{
				iso_3166_1: 'GW',
				english_name: 'Guinea-Bissau'
			},
			{
				iso_3166_1: 'GY',
				english_name: 'Guyana'
			},
			{
				iso_3166_1: 'HK',
				english_name: 'Hong Kong'
			},
			{
				iso_3166_1: 'HM',
				english_name: 'Heard and McDonald Islands'
			},
			{
				iso_3166_1: 'HN',
				english_name: 'Honduras'
			},
			{
				iso_3166_1: 'HR',
				english_name: 'Croatia'
			},
			{
				iso_3166_1: 'HT',
				english_name: 'Haiti'
			},
			{
				iso_3166_1: 'HU',
				english_name: 'Hungary'
			},
			{
				iso_3166_1: 'ID',
				english_name: 'Indonesia'
			},
			{
				iso_3166_1: 'IE',
				english_name: 'Ireland'
			},
			{
				iso_3166_1: 'IL',
				english_name: 'Israel'
			},
			{
				iso_3166_1: 'IN',
				english_name: 'India'
			},
			{
				iso_3166_1: 'IO',
				english_name: 'British Indian Ocean Territory'
			},
			{
				iso_3166_1: 'IQ',
				english_name: 'Iraq'
			},
			{
				iso_3166_1: 'IR',
				english_name: 'Iran'
			},
			{
				iso_3166_1: 'IS',
				english_name: 'Iceland'
			},
			{
				iso_3166_1: 'IT',
				english_name: 'Italy'
			},
			{
				iso_3166_1: 'JM',
				english_name: 'Jamaica'
			},
			{
				iso_3166_1: 'JO',
				english_name: 'Jordan'
			},
			{
				iso_3166_1: 'JP',
				english_name: 'Japan'
			},
			{
				iso_3166_1: 'KE',
				english_name: 'Kenya'
			},
			{
				iso_3166_1: 'KG',
				english_name: 'Kyrgyz Republic'
			},
			{
				iso_3166_1: 'KH',
				english_name: 'Cambodia'
			},
			{
				iso_3166_1: 'KI',
				english_name: 'Kiribati'
			},
			{
				iso_3166_1: 'KM',
				english_name: 'Comoros'
			},
			{
				iso_3166_1: 'KN',
				english_name: 'St. Kitts and Nevis'
			},
			{
				iso_3166_1: 'KP',
				english_name: 'North Korea'
			},
			{
				iso_3166_1: 'KW',
				english_name: 'Kuwait'
			},
			{
				iso_3166_1: 'KY',
				english_name: 'Cayman Islands'
			},
			{
				iso_3166_1: 'KZ',
				english_name: 'Kazakhstan'
			},
			{
				iso_3166_1: 'LA',
				english_name: "Lao People's Democratic Republic"
			},
			{
				iso_3166_1: 'LB',
				english_name: 'Lebanon'
			},
			{
				iso_3166_1: 'LC',
				english_name: 'St. Lucia'
			},
			{
				iso_3166_1: 'LI',
				english_name: 'Liechtenstein'
			},
			{
				iso_3166_1: 'LK',
				english_name: 'Sri Lanka'
			},
			{
				iso_3166_1: 'LR',
				english_name: 'Liberia'
			},
			{
				iso_3166_1: 'LS',
				english_name: 'Lesotho'
			},
			{
				iso_3166_1: 'LT',
				english_name: 'Lithuania'
			},
			{
				iso_3166_1: 'LU',
				english_name: 'Luxembourg'
			},
			{
				iso_3166_1: 'LV',
				english_name: 'Latvia'
			},
			{
				iso_3166_1: 'LY',
				english_name: 'Libyan Arab Jamahiriya'
			},
			{
				iso_3166_1: 'MA',
				english_name: 'Morocco'
			},
			{
				iso_3166_1: 'MC',
				english_name: 'Monaco'
			},
			{
				iso_3166_1: 'MD',
				english_name: 'Moldova'
			},
			{
				iso_3166_1: 'MG',
				english_name: 'Madagascar'
			},
			{
				iso_3166_1: 'MH',
				english_name: 'Marshall Islands'
			},
			{
				iso_3166_1: 'MK',
				english_name: 'Macedonia'
			},
			{
				iso_3166_1: 'ML',
				english_name: 'Mali'
			},
			{
				iso_3166_1: 'MM',
				english_name: 'Myanmar'
			},
			{
				iso_3166_1: 'MN',
				english_name: 'Mongolia'
			},
			{
				iso_3166_1: 'MO',
				english_name: 'Macao'
			},
			{
				iso_3166_1: 'MP',
				english_name: 'Northern Mariana Islands'
			},
			{
				iso_3166_1: 'MQ',
				english_name: 'Martinique'
			},
			{
				iso_3166_1: 'MR',
				english_name: 'Mauritania'
			},
			{
				iso_3166_1: 'MS',
				english_name: 'Montserrat'
			},
			{
				iso_3166_1: 'MT',
				english_name: 'Malta'
			},
			{
				iso_3166_1: 'MU',
				english_name: 'Mauritius'
			},
			{
				iso_3166_1: 'MV',
				english_name: 'Maldives'
			},
			{
				iso_3166_1: 'MW',
				english_name: 'Malawi'
			},
			{
				iso_3166_1: 'MX',
				english_name: 'Mexico'
			},
			{
				iso_3166_1: 'MY',
				english_name: 'Malaysia'
			},
			{
				iso_3166_1: 'MZ',
				english_name: 'Mozambique'
			},
			{
				iso_3166_1: 'NA',
				english_name: 'Namibia'
			},
			{
				iso_3166_1: 'NC',
				english_name: 'New Caledonia'
			},
			{
				iso_3166_1: 'NE',
				english_name: 'Niger'
			},
			{
				iso_3166_1: 'NF',
				english_name: 'Norfolk Island'
			},
			{
				iso_3166_1: 'NG',
				english_name: 'Nigeria'
			},
			{
				iso_3166_1: 'ME',
				english_name: 'Montenegro'
			},
			{
				iso_3166_1: 'NI',
				english_name: 'Nicaragua'
			},
			{
				iso_3166_1: 'NL',
				english_name: 'Netherlands'
			},
			{
				iso_3166_1: 'NO',
				english_name: 'Norway'
			},
			{
				iso_3166_1: 'NP',
				english_name: 'Nepal'
			},
			{
				iso_3166_1: 'NR',
				english_name: 'Nauru'
			},
			{
				iso_3166_1: 'NU',
				english_name: 'Niue'
			},
			{
				iso_3166_1: 'NZ',
				english_name: 'New Zealand'
			},
			{
				iso_3166_1: 'OM',
				english_name: 'Oman'
			},
			{
				iso_3166_1: 'PA',
				english_name: 'Panama'
			},
			{
				iso_3166_1: 'PE',
				english_name: 'Peru'
			},
			{
				iso_3166_1: 'PF',
				english_name: 'French Polynesia'
			},
			{
				iso_3166_1: 'PG',
				english_name: 'Papua New Guinea'
			},
			{
				iso_3166_1: 'PH',
				english_name: 'Philippines'
			},
			{
				iso_3166_1: 'YU',
				english_name: 'Yugoslavia'
			},
			{
				iso_3166_1: 'XK',
				english_name: 'Kosovo'
			},
			{
				iso_3166_1: 'XC',
				english_name: 'Czechoslovakia'
			},
			{
				iso_3166_1: 'PK',
				english_name: 'Pakistan'
			},
			{
				iso_3166_1: 'PL',
				english_name: 'Poland'
			},
			{
				iso_3166_1: 'PM',
				english_name: 'St. Pierre and Miquelon'
			},
			{
				iso_3166_1: 'PN',
				english_name: 'Pitcairn Island'
			},
			{
				iso_3166_1: 'PR',
				english_name: 'Puerto Rico'
			},
			{
				iso_3166_1: 'PS',
				english_name: 'Palestinian Territory'
			},
			{
				iso_3166_1: 'PT',
				english_name: 'Portugal'
			},
			{
				iso_3166_1: 'PW',
				english_name: 'Palau'
			},
			{
				iso_3166_1: 'PY',
				english_name: 'Paraguay'
			},
			{
				iso_3166_1: 'QA',
				english_name: 'Qatar'
			},
			{
				iso_3166_1: 'RE',
				english_name: 'Reunion'
			},
			{
				iso_3166_1: 'RO',
				english_name: 'Romania'
			},
			{
				iso_3166_1: 'RU',
				english_name: 'Russia'
			},
			{
				iso_3166_1: 'RW',
				english_name: 'Rwanda'
			},
			{
				iso_3166_1: 'SA',
				english_name: 'Saudi Arabia'
			},
			{
				iso_3166_1: 'SB',
				english_name: 'Solomon Islands'
			},
			{
				iso_3166_1: 'SC',
				english_name: 'Seychelles'
			},
			{
				iso_3166_1: 'SD',
				english_name: 'Sudan'
			},
			{
				iso_3166_1: 'SE',
				english_name: 'Sweden'
			},
			{
				iso_3166_1: 'SG',
				english_name: 'Singapore'
			},
			{
				iso_3166_1: 'SH',
				english_name: 'St. Helena'
			},
			{
				iso_3166_1: 'SI',
				english_name: 'Slovenia'
			},
			{
				iso_3166_1: 'SJ',
				english_name: 'Svalbard & Jan Mayen Islands'
			},
			{
				iso_3166_1: 'SK',
				english_name: 'Slovakia'
			},
			{
				iso_3166_1: 'SL',
				english_name: 'Sierra Leone'
			},
			{
				iso_3166_1: 'SM',
				english_name: 'San Marino'
			},
			{
				iso_3166_1: 'SN',
				english_name: 'Senegal'
			},
			{
				iso_3166_1: 'SO',
				english_name: 'Somalia'
			},
			{
				iso_3166_1: 'SR',
				english_name: 'Suriname'
			},
			{
				iso_3166_1: 'ST',
				english_name: 'Sao Tome and Principe'
			},
			{
				iso_3166_1: 'SV',
				english_name: 'El Salvador'
			},
			{
				iso_3166_1: 'SY',
				english_name: 'Syrian Arab Republic'
			},
			{
				iso_3166_1: 'SZ',
				english_name: 'Swaziland'
			},
			{
				iso_3166_1: 'TC',
				english_name: 'Turks and Caicos Islands'
			},
			{
				iso_3166_1: 'TD',
				english_name: 'Chad'
			},
			{
				iso_3166_1: 'TF',
				english_name: 'French Southern Territories'
			},
			{
				iso_3166_1: 'TG',
				english_name: 'Togo'
			},
			{
				iso_3166_1: 'TH',
				english_name: 'Thailand'
			},
			{
				iso_3166_1: 'TJ',
				english_name: 'Tajikistan'
			},
			{
				iso_3166_1: 'TK',
				english_name: 'Tokelau'
			},
			{
				iso_3166_1: 'TL',
				english_name: 'Timor-Leste'
			},
			{
				iso_3166_1: 'TM',
				english_name: 'Turkmenistan'
			},
			{
				iso_3166_1: 'TN',
				english_name: 'Tunisia'
			},
			{
				iso_3166_1: 'TO',
				english_name: 'Tonga'
			},
			{
				iso_3166_1: 'TR',
				english_name: 'Turkey'
			},
			{
				iso_3166_1: 'TT',
				english_name: 'Trinidad and Tobago'
			},
			{
				iso_3166_1: 'TV',
				english_name: 'Tuvalu'
			},
			{
				iso_3166_1: 'TW',
				english_name: 'Taiwan'
			},
			{
				iso_3166_1: 'TZ',
				english_name: 'Tanzania'
			},
			{
				iso_3166_1: 'UA',
				english_name: 'Ukraine'
			},
			{
				iso_3166_1: 'UG',
				english_name: 'Uganda'
			},
			{
				iso_3166_1: 'UM',
				english_name: 'United States Minor Outlying Islands'
			},
			{
				iso_3166_1: 'US',
				english_name: 'United States of America'
			},
			{
				iso_3166_1: 'UY',
				english_name: 'Uruguay'
			},
			{
				iso_3166_1: 'UZ',
				english_name: 'Uzbekistan'
			},
			{
				iso_3166_1: 'VA',
				english_name: 'Holy See'
			},
			{
				iso_3166_1: 'VC',
				english_name: 'St. Vincent and the Grenadines'
			},
			{
				iso_3166_1: 'VE',
				english_name: 'Venezuela'
			},
			{
				iso_3166_1: 'VG',
				english_name: 'British Virgin Islands'
			},
			{
				iso_3166_1: 'VI',
				english_name: 'US Virgin Islands'
			},
			{
				iso_3166_1: 'VN',
				english_name: 'Vietnam'
			},
			{
				iso_3166_1: 'VU',
				english_name: 'Vanuatu'
			},
			{
				iso_3166_1: 'WF',
				english_name: 'Wallis and Futuna Islands'
			},
			{
				iso_3166_1: 'WS',
				english_name: 'Samoa'
			},
			{
				iso_3166_1: 'YE',
				english_name: 'Yemen'
			},
			{
				iso_3166_1: 'YT',
				english_name: 'Mayotte'
			},
			{
				iso_3166_1: 'ZA',
				english_name: 'South Africa'
			},
			{
				iso_3166_1: 'ZM',
				english_name: 'Zambia'
			},
			{
				iso_3166_1: 'ZW',
				english_name: 'Zimbabwe'
			},
			{
				iso_3166_1: 'KR',
				english_name: 'South Korea'
			},
			{
				iso_3166_1: 'XG',
				english_name: 'East Germany'
			},
			{
				iso_3166_1: 'SU',
				english_name: 'Soviet Union'
			},
			{
				iso_3166_1: 'SS',
				english_name: 'South Sudan'
			}
		];

		return listOfAvailableCountries.map((country) => ({
			...country,
			value: country.iso_3166_1,
			label: `${country.english_name} (${country.iso_3166_1})`,
			id: `${country.iso_3166_1} - ${country.english_name}`
		}));
	}

	getOttProviderOptions() {
		const availableProviders = [
			{
				display_priority: 0,
				logo_path: '/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg',
				provider_name: 'Netflix',
				provider_id: 8
			},
			{
				display_priority: 1,
				logo_path: '/68MNrwlkpF7WnmNPXLah69CR5cb.jpg',
				provider_name: 'Amazon Prime Video',
				provider_id: 119
			},
			{
				display_priority: 1,
				logo_path: '/68MNrwlkpF7WnmNPXLah69CR5cb.jpg',
				provider_name: 'Amazon Prime Video',
				provider_id: 9
			},
			{
				display_priority: 1,
				logo_path: '/49zBTsyFqE0u2hO8NxlyVmjFZDH.jpg',
				provider_name: 'Horizon',
				provider_id: 250
			},
			{
				display_priority: 1,
				logo_path: '/zBZrLV8mpN3lYT8VrChHlA0vNK6.jpg',
				provider_name: 'iflix',
				provider_id: 160
			},
			{
				display_priority: 1,
				logo_path: '/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg',
				provider_name: 'Disney Plus',
				provider_id: 337
			},
			{
				display_priority: 2,
				logo_path: '/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg',
				provider_name: 'Apple iTunes',
				provider_id: 2
			},
			{
				display_priority: 2,
				logo_path: '/3zw07sM5b9FWcB1QXXt3uLpjn9r.jpg',
				provider_name: 'HBO Go',
				provider_id: 280
			},
			{
				display_priority: 2,
				logo_path: '/g1b38DOIuRjMmKhnBIaGkOuL8tR.jpg',
				provider_name: 'blutv',
				provider_id: 341
			},
			{
				display_priority: 2,
				logo_path: '/8N0DNa4BO3lH24KWv1EjJh4TxoD.jpg',
				provider_name: 'wavve',
				provider_id: 356
			},
			{
				display_priority: 2,
				logo_path: '/wRfIw4x22z9Zag6DZ8qLYwzpjOA.jpg',
				provider_name: 'Neon TV',
				provider_id: 273
			},
			{
				display_priority: 2,
				logo_path: '/2DpMZHxP9jzu3v70bph1UD3LLv3.jpg',
				provider_name: 'Ivi',
				provider_id: 113
			},
			{
				display_priority: 3,
				logo_path: '/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg',
				provider_name: 'Google Play Movies',
				provider_id: 3
			},
			{
				display_priority: 3,
				logo_path: '/n7C8QWkrjGIz3nWHI4P30nWARAs.jpg',
				provider_name: 'hayu',
				provider_id: 223
			},
			{
				display_priority: 3,
				logo_path: '/qshstZQBltVh9En0AAMqv5eyKlT.jpg',
				provider_name: 'Maxdome',
				provider_id: 6
			},
			{
				display_priority: 3,
				logo_path: '/fkUXVCjyBEBLIB2P7nctx9uqNnz.jpg',
				provider_name: 'Be TV Go',
				provider_id: 311
			},
			{
				display_priority: 3,
				logo_path: '/dSBzj4T9P7PMUr015gnV7meT2LR.jpg',
				provider_name: 'SwissCom',
				provider_id: 150
			},
			{
				display_priority: 3,
				logo_path: '/oWdLYAsfb61wUUkGKdLifBbJinI.jpg',
				provider_name: 'O2 TV',
				provider_id: 308
			},
			{
				display_priority: 3,
				logo_path: '/vAtH6Z6Oq7zCmEGS3Sdu08dxvYZ.jpg',
				provider_name: 'HBO',
				provider_id: 118
			}
		];

		return availableProviders.map((option) => ({
			...option,
			label: option.provider_name,
			value: option.provider_id.toString(),
			id: `${option.provider_name} - ${option.provider_id}`
		}));
	}
}
