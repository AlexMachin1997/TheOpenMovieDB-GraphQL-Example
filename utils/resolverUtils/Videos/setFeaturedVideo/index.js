const setFeaturedVideo = (videos) => {
	// Store the Videos in a variable, this allows them to be modified
	let availableVideos = videos;

	// Default Schema
	let Video = {
		id: '',
		name: '',
		url: '',
		type: 'Trailer',
		site: 'YouTube'
	};

	// Checks to see if any Videos exist
	if (availableVideos.length === 0) return Video;

	// Filter for YouTube and Trailer videos
	availableVideos = availableVideos.filter(
		(singleVideo) => singleVideo.site === 'YouTube' && singleVideo.type === 'Trailer'
	);

	// Get the first video (Not sure if this is right but whatever :D)
	const SelectedVideo = availableVideos[0];

	// Overwrite the default Video object
	Video = {
		...Video,
		id: String(SelectedVideo.id) ?? '',
		name: SelectedVideo.name ?? '',
		url: SelectedVideo.key ?? ''
	};

	// (Ths will be used when the YouTube iframe is embedded - https://trello.com/c/l4du1mQs/38-integrate-the-youtube-video-api)
	// Provided the the url isn't blank (ie no Key) then format the iframe url
	if (Video.url !== '') {
		Video.url = `https://www.youtube.com/watch?v=${Video.url}`;
	}

	// Return the new Video object
	return Video;
};

module.exports = setFeaturedVideo;
