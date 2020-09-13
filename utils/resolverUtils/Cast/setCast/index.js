const generateAbsolutePath = require('../../../images/generateAbsolutePath');

const setCast = async (castMembers) => {
	let featuredCast = castMembers.sort((a, b) => (a.order > b.order ? 1 : -1));

	featuredCast = featuredCast.slice(0, 9);

	const updatedFeaturedCast = [];

	featuredCast.forEach((cast) => {
		// Initial object for a cast member (Some attributes are updated if they meet certain conditions)
		const castMember = {
			id: cast.id ?? 0,
			character: cast.character ?? '',
			profileImageUrl: cast.profile_path ?? '',
			gender: cast.gender ?? '',
			episodeCount: cast.episodeCount ?? 0
		};

		// Profile image url
		if (castMember.profileImageUrl !== '') {
			castMember.profileImageUrl = generateAbsolutePath(cast.profile_path);
		}

		// Gender
		if (castMember.gender !== '') {
			castMember.gender = castMember.gender === 0 ? 'Male' : 'Female';
		}

		// Perform API Request to get the episode count - https://trello.com/c/RyPuIPSc/42-extra-tv-show-functionality-episode-count

		// Push the new castMember to the updatedFeaturedCast array
		updatedFeaturedCast.push(castMember);
	});

	return updatedFeaturedCast;
};

module.exports = setCast;
