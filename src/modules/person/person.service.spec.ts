/* eslint-disable max-len */
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosRequestHeaders } from 'axios';
import { of } from 'rxjs';

import personCreditsMockData from './mocks/CombinedCreditsQuery';
import getCreditGroupResponse from './mocks/GetCreditGroupResponse';
import personMockData from './mocks/PersonLookupQuery';
import { PersonService } from './person.service';
import { SocialsService } from '../../core/socials/socials.service';
import { UtilsService } from '../utils/utils.service';

describe('PersonService', () => {
	let service: PersonService;
	let httpService: HttpService;
	let utilsService: UtilsService;
	let socialsService: SocialsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PersonService,
				{
					provide: HttpService,
					useValue: {
						get: jest.fn().mockImplementation(() => of({ data: personMockData }))
					}
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn()
					}
				},
				{
					provide: UtilsService,
					useValue: {
						getGender: jest.fn(),
						getFullImageUrlPath: jest.fn()
					}
				},
				{
					provide: SocialsService,
					useValue: {
						getSocials: jest.fn()
					}
				}
			]
		}).compile();

		service = module.get<PersonService>(PersonService);
		httpService = module.get<HttpService>(HttpService);
		utilsService = module.get<UtilsService>(UtilsService);
		socialsService = module.get<SocialsService>(SocialsService);
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(service).toBeDefined();
	});

	describe('getPerson', () => {
		it('should return formatted person data', async () => {
			expect.hasAssertions();
			const personId = 1245;

			jest.spyOn(httpService, 'get').mockReturnValueOnce(
				of({
					data: personMockData,
					status: 200,
					statusText: 'OK',
					headers: {},
					config: {
						headers: <AxiosRequestHeaders>{}
					}
				})
			);
			jest.spyOn(utilsService, 'getGender').mockReturnValueOnce('Female');
			jest
				.spyOn(utilsService, 'getFullImageUrlPath')
				.mockReturnValueOnce('https://image.tmdb.org/t/p/original/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg');

			const result = await service.getPerson(personId);

			expect(result).toEqual({
				id: 1245,
				birthday: '22 November 1984 (39 years old)',
				knownForDepartment: 'Acting',
				name: 'Scarlett Johansson',
				alsoKnownAs: [
					'스칼릿 조핸슨',
					'Σκάρλετ Τζοχάνσον',
					'Scarlett Ingrid Johansson',
					'اسکارلت جوهانسن',
					'สการ์เลตต์ อิงกริด โจแฮนส์สัน'
				],
				gender: 'Female',
				overview:
					"Scarlett Ingrid Johansson (born November 22, 1984) is an American actress. The world's highest-paid actress in 2018 and 2019, she has featured multiple times on the Forbes Celebrity 100 list. Her films have grossed over $14.3 billion worldwide, making Johansson the ninth-highest-grossing box office star of all time. She has received various accolades, including a Tony Award and a British Academy Film Award, in addition to nominations for two Academy Awards and five Golden Globe Awards.\n\nJohansson aspired to be an actress from an early age and first appeared on stage in an Off-Broadway play as a child actor. She made her film debut in the fantasy comedy North (1994), and gained early recognition for her roles in Manny & Lo (1996), The Horse Whisperer (1998), and Ghost World (2001). Johansson shifted to adult roles in 2003 with her performances in Lost in Translation, which won her a BAFTA Award for Best Actress, and Girl with a Pearl Earring. She was nominated for Golden Globe Awards for these films, and for playing a troubled teenager in the drama A Love Song for Bobby Long (2004) and a seductress in psychological thriller Match Point (2005). The latter was her first collaboration with Woody Allen, who later directed her in Scoop (2006) and Vicky Cristina Barcelona (2008).\n\nJohansson's other works of this period include The Prestige (2006) and the albums Anywhere I Lay My Head (2008) and Break Up (2009), both of which charted on the Billboard 200. In 2010, Johansson debuted on Broadway in a revival of A View from the Bridge, which won her a Tony Award for Best Featured Actress, and began portraying Black Widow in the Marvel Cinematic Universe film Iron Man 2. She reprised the role in eight films, most recently in her solo feature Black Widow (2021), gaining global recognition for her performances. During this period, Johansson starred in the science fiction films Her (2013), Under the Skin (2013) and Lucy (2014).\n\nShe received two simultaneous Academy Award nominations—Best Actress and Best Supporting Actress—for the respective roles of an actress going through a divorce in the drama Marriage Story (2019) and a single mother in Nazi Germany in the satire Jojo Rabbit (2019). Labeled a sex symbol, Johansson has been referred to as one of the world's most attractive women by various media outlets. She is a prominent brand endorser and supports several charitable causes. Divorced from actor Ryan Reynolds and businessman Romain Dauriac, Johansson has been married to comedian Colin Jost since 2020. She has two children, one with Dauriac and another with Jost.",
				placeOfBirth: 'New York City, New York, USA',
				posterUrl: 'https://image.tmdb.org/t/p/original/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg',
				homepage: null
			});
		});
	});

	describe('getCreditGroup', () => {
		it('should return formatted credit groups', async () => {
			expect.hasAssertions();
			const personId = 1245;

			jest.spyOn(httpService, 'get').mockReturnValueOnce(
				of({
					data: personCreditsMockData,
					status: 200,
					statusText: 'OK',
					headers: {},
					config: {
						headers: <AxiosRequestHeaders>{}
					}
				})
			);

			const result = await service.getCreditGroup(personId);

			// Compare each group
			expect(result).toHaveProperty('ActingGroup');
			expect(result.ActingGroup).toEqual(getCreditGroupResponse.ActingGroup);

			expect(result).toHaveProperty('ProductionGroup');
			expect(result.ProductionGroup).toEqual(getCreditGroupResponse.ProductionGroup);

			expect(result).toHaveProperty('WritingGroup');
			expect(result.WritingGroup).toEqual(getCreditGroupResponse.WritingGroup);

			expect(result).toHaveProperty('DirectingGroup');
			expect(result.DirectingGroup).toEqual(getCreditGroupResponse.DirectingGroup);

			expect(result).toHaveProperty('CrewGroup');
			expect(result.CrewGroup).toEqual(getCreditGroupResponse.CrewGroup);

			expect(result).toHaveProperty('LightingGroup');
			expect(result.LightingGroup).toEqual(getCreditGroupResponse.LightingGroup);
		});
	});

	describe('getBirthday', () => {
		let mockDate: Date;

		beforeAll(() => {
			// Mock current date to 2024-01-01
			mockDate = new Date('2024-01-01');
			jest.useFakeTimers();
			jest.setSystemTime(mockDate);
		});

		afterAll(() => {
			jest.useRealTimers();
		});

		it('should return formatted birthday string with age', () => {
			expect.hasAssertions();
			const birthday = '1984-11-22';
			const result = service.getBirthday(birthday);
			expect(result).toBe('22 November 1984 (39 years old)');
		});
	});

	describe('getSocials', () => {
		it('should return social media links', async () => {
			expect.hasAssertions();
			const personId = 1245;
			const mockSocials = {
				id: null,
				freebase: null,
				imdb: null,
				tvrage: null,
				wikidata: null,
				facebook: null,
				instagram: null,
				tiktok: null,
				twitter: null
			};

			// Mock the getSocials method
			const getSocialsMock = jest
				.spyOn(socialsService, 'getSocials')
				.mockResolvedValueOnce(mockSocials);

			const result = await service.getSocials(personId);

			// Check if the mock was called with the correct argument
			expect(getSocialsMock).toHaveBeenCalledWith({ resourceType: 'PERSON', resourceId: personId });
			expect(result).toEqual(mockSocials);
		});
	});
});
