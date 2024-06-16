/* eslint-disable import/extensions */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
	BelongsToCollection,
	Cast,
	Crew,
	ENTERTAINMENT_TYPES,
	GENDER,
	Keyword,
	Review,
	Social
} from 'src/graphql.schema';
import {
	TheOpenMovieDatabaseBelongsToCollection,
	TheOpenMovieDatabaseSpokenLanguages
} from 'src/movie/movie';
import { UtilsService } from 'src/utils/utils.service';

import {
	ICreditsQueryResponse,
	IExternalIdsQueryResponse,
	IKeywordsQueryResponse,
	IReviewQuery,
	IVdoesQueryResponse
} from './entertainment';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IEntertainmentCommonArguments {
	entertainmentType: ENTERTAINMENT_TYPES;
	entertainmentId: number;
}

@Injectable()
export class EntertainmentService {
	constructor(
		private readonly httpService: HttpService,
		private readonly utilService: UtilsService
	) {}

	async getReview({
		entertainmentType,
		entertainmentId
	}: IEntertainmentCommonArguments): Promise<Review | null> {
		const { data } = await firstValueFrom(
			this.httpService.get<IReviewQuery>(
				`https://api.themoviedb.org/3/${entertainmentType.toLowerCase()}/${entertainmentId}/reviews?language=en-U`,
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

		// Get the first review with a rating
		// TODO: Add additional logic around this so if there isn't one page through the data until one is found
		const selectedReview = data.results.find((el) => el.author_details.rating !== null);

		// For now if there is no rating available don't return the review
		if (typeof selectedReview === 'undefined') {
			return null;
		}

		return {
			author: {
				name: selectedReview.author_details.name,
				username: selectedReview.author_details.username,
				avatarUrl: this.utilService.getFullImageUrlPath(selectedReview.author_details.avatar_path),
				rating: this.utilService.getNumberAsPercentage(selectedReview.author_details.rating, 10)
			},
			isFeatured: false, // Not sure how to work this out yet...
			content: selectedReview.content,
			createdOn: new Intl.DateTimeFormat('en-GB', {
				dateStyle: 'medium'
			}).format(new Date(selectedReview.created_at))
		};
	}

	async getTopBilledCast({
		entertainmentType,
		entertainmentId
	}: IEntertainmentCommonArguments): Promise<Cast[] | null> {
		const { data } = await firstValueFrom(
			this.httpService.get<ICreditsQueryResponse>(
				`https://api.themoviedb.org/3/${entertainmentType.toLocaleLowerCase()}/${entertainmentId}/credits?language=en-U`,
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

		// Should already be in the correct order but just to be safe sort it ourselves
		const sortedCastByOrder = data.cast.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Return the first 9 cast members
		return sortedCastByOrder.slice(0, 9).map((el) => ({
			id: el.id,
			character: el.character,
			profileImageUrl: this.utilService.getFullImageUrlPath(el.profile_path),
			gender: el.gender === 2 ? GENDER.MALE : GENDER.FEMALE
		}));
	}

	async getFeaturedCrewMembers({
		entertainmentType,
		entertainmentId
	}: IEntertainmentCommonArguments): Promise<Crew[] | null> {
		const { data } = await firstValueFrom(
			this.httpService.get<ICreditsQueryResponse>(
				`https://api.themoviedb.org/3/${entertainmentType.toLowerCase()}/${entertainmentId}/credits?language=en-U`,
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

		// Get the the crew members we are interested in and only get the first 6
		const filteredCrewByJob = data.crew
			.filter((crew) => {
				return (
					crew.job === 'Director' ||
					crew.job === 'Screenplay' ||
					crew.job === 'Writer' ||
					crew.job === 'Story'
				);
			})
			.slice(0, 6);

		const featuredCrewMembers: Crew[] = [];

		/*

		******************************************
		Creating the featured crew members:
		******************************************

		- The filteredCrewByJob can contain duplicate crew

		- For each "job" assigned to the crew member it has it's own entry added

		- To ensure we only display one crew member at a time we created a new object and that has a "roles" property which
			gets all the roles for that user and joins them together e.g. "Writer, Directory, Story"

		*/

		filteredCrewByJob.forEach((member) => {
			if (featuredCrewMembers.find((element) => element.name === member.name) === undefined) {
				featuredCrewMembers.push({
					name: member.name,
					roles: [
						...new Set([...filteredCrewByJob.filter((i) => i.id === member.id).map((el) => el.job)])
					].join(', ')
				});
			}
		});

		return featuredCrewMembers;
	}

	async getKeywords({
		entertainmentType,
		entertainmentId
	}: IEntertainmentCommonArguments): Promise<Keyword[] | null> {
		const { data } = await firstValueFrom(
			this.httpService.get<IKeywordsQueryResponse>(
				`https://api.themoviedb.org/3/${entertainmentType.toLocaleLowerCase()}/${entertainmentId}/keywords?language=en-U`,
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

		return data.keywords;
	}

	async getSocials({
		entertainmentType,
		entertainmentId
	}: IEntertainmentCommonArguments): Promise<Social> {
		const { data } = await firstValueFrom(
			this.httpService.get<IExternalIdsQueryResponse>(
				`https://api.themoviedb.org/3/${entertainmentType.toLowerCase()}/${entertainmentId}/external_ids?language=en-U`,
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
			facebook: `https://www.facebook.com/${data.facebook_id}`,
			homepage: ``,
			instagram: `https://www.instagram.com/${data.facebook_id}`.toLowerCase(),
			twitter: `https://www.twitter.com/${data.twitter_id}`
		};
	}

	getCollection = (
		collection: undefined | null | TheOpenMovieDatabaseBelongsToCollection = null
	): BelongsToCollection | null => {
		if (collection !== null) {
			return {
				backgroundUrl: this.utilService.getFullImageUrlPath(collection.poster_path),
				id: collection.id,
				name: collection.name,
				posterUrl: collection.poster_path
			};
		}

		return collection;
	};

	getOriginalLanguage = ({
		originalLanguage,
		spokenLanguages
	}: {
		originalLanguage: string;
		spokenLanguages: TheOpenMovieDatabaseSpokenLanguages[];
	}) => {
		if (originalLanguage.length !== 0 && spokenLanguages.length === 0) {
			const foundFriendlyLanguage = spokenLanguages.find(
				(spokenLanguage) => spokenLanguage.iso_639_1 === originalLanguage
			);

			if (typeof foundFriendlyLanguage !== 'undefined') {
				return foundFriendlyLanguage.name;
			}

			return originalLanguage;
		}

		return originalLanguage;
	};

	async getTrailerUrl({
		entertainmentType,
		entertainmentId
	}: IEntertainmentCommonArguments): Promise<string | null> {
		const { data } = await firstValueFrom(
			this.httpService.get<IVdoesQueryResponse>(
				`https://api.themoviedb.org/3/${entertainmentType.toLowerCase()}/${entertainmentId}/videos?language=en-U`,
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

		if (data.results.length === 0) return null;

		// Get the first video which is a "YouTube" and has a type of "Trailer"
		const youtubeTrailerVideos = data.results.find(
			(el) => el.site === 'YouTube' && el.type === 'Trailer'
		);

		// If there is no trailer just return null
		if (typeof youtubeTrailerVideos === 'undefined') return null;

		return `https://www.youtube.com/watch?v=${youtubeTrailerVideos.key}`;
	}
}
