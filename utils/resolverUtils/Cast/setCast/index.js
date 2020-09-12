const { isEmpty } = require('lodash');
const generateAbsolutePath = require('../../../images/generateAbsolutePath');

const setCast = async (castMembers) => {
	let featuredCast = castMembers.filter((el) => el.order <= 9);

	featuredCast = featuredCast.sort((a, b) => (a.order > b.order ? 1 : -1));

	const updatedFeaturedCast = [];

	featuredCast.forEach((cast) => {
		const castMember = {
			id: cast.id ?? 0,
			character: cast.character ?? '',
			profileImageUrl: cast.profile_path ?? '',
			gender: cast.gender ?? 'Other',
			episodeCount: 0
		};

		// id
		if (isEmpty(cast.id) === true) {
			castMember.id = cast.id;
		}

		// character
		if (isEmpty(cast.character) === true) {
			castMember.character = cast.character;
		}

		// Profile image url
		if (isEmpty(cast.profile_path) === true) {
			castMember.profileImageUrl = generateAbsolutePath(cast.profile_path);
		}

		// gender
		if (cast.gender !== null || cast.gender !== null) {
			castMember.gender = cast.gender === 2 ? 'Male' : 'Female';
		}

		// Perform API Request to get the episode count - https://trello.com/c/RyPuIPSc/42-extra-tv-show-functionality-episode-count

		// Push the new castMember to the updatedFeaturedCast array
		updatedFeaturedCast.push(castMember);
	});

	return updatedFeaturedCast;
};

module.exports = setCast;
