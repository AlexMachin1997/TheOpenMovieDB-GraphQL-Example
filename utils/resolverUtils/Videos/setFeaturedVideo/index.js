/**
 * @typedef {Object} InputVideos
 * @property {string} id Stores the id for the video
 * @property {string} iso_639_1 Stores something, not exactly sure though..
 * @property {string} iso_3166_1 Stores something, not exactly sure though..
 * @property {string} key Stores a video key, this can be used to create the embedded youtube video url
 * @property {string} name Stores the name of the url
 * @property {string} site Stores the source of the video
 * @property {number} size Stores the size of the video e.g. 1080, 720
 * @property {string} type Stores the type of video e.g. trailer, feature
 */

/**
 * @typedef {Object} Video
 * @property {number} [id] Stores the id for the video
 * @property {string} [name] Stores the name for the video e.g. BILL & TED FACE THE MUSIC Official Trailer #2 (2020)
 * @property {string} [url] Stores the url for the video, this can be used for embedding the featured video e.g. https://www.youtube.com/watch?v=1gPGeAYo3yU
 * @property {string} [type] Stores the type of video
 * @property {string} [site] Stores the type of video e.g. trailer, feature
 */

/**
 * @description A utility function for getting a featured video, this is going to be used for the single movie or show page.
 * @param {InputVideos[]} videos
 * @returns {Video}
 */
const setFeaturedVideo = (videos) => {
	// Checks to see if any Videos exist
	if (videos.length === 0) return {};

	// Store the Videos in a variable, this allows them to be modified
	const availableVideos = videos.filter(
		(video) => video.site === 'YouTube' && video.type === 'Trailer'
	);

	let selectedVideo;

	if (availableVideos.length !== 0) {
		// eslint-disable-next-line prefer-destructuring
		selectedVideo = availableVideos[0];
	}

	/**
	 * @type {Video}
	 * @description Stores the new featured video properties
	 */
	const Video = {
		id: selectedVideo.id ?? 0,
		name: selectedVideo.name ?? '',
		url: selectedVideo.key ? `https://www.youtube.com/watch?v=${selectedVideo.key}` : '',
		type: 'Trailer',
		site: 'YouTube'
	};

	// Return the new Video object
	return Video;
};

module.exports = setFeaturedVideo;
