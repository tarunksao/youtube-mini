let video = JSON.parse(localStorage.getItem('videoId')) || [];
let container = document.getElementById('search_results');

let videoId = video[1];
let title = document.createElement('h3');
title.innerText = video[0];
let channelId = video[2];
let APIKey = video[3];
let div = document.createElement('div');
let div1 = document.createElement('div');
let iframe = document.createElement('iframe');
iframe.src = `https://www.youtube.com/embed/${videoId}`;
iframe.width = '100%';
iframe.height = '100%';
iframe.allow = 'fullscreen';
// console.log(channelId, APIKey);
div.append(iframe, title);

let appendVideos = (data) => {
	container.innerHTML = null;
	data.forEach(
		({
			snippet: {
				title,
				channelId,
				thumbnails: {
					medium: { url, height, width },
				},
			},
			id: { videoId },
		}) => {
			//let title = el.snippet.title;
			//   let div = document.createElement("div");

			let img = document.createElement('img');

			img.src = url;
			img.width = width;
			img.height = height;
			img.allow = 'fullscreen';

			let name = document.createElement('h5');
			name.innerText = title;

			div1.append(img, name);
			div1.addEventListener('click', () => {
				localStorage.clear;
				let video = [title, videoId, channelId];
				localStorage.setItem('videoId', JSON.stringify(video));
				window.location.href = 'videoPlayer.html';
			});
			//   container.append(div);
			//console.log(title, videoId);
		}
	);
};

//console.log(videoId, video[1]);

container.innerHTML = null;

container.append(div, div1);

let sortBy = () => {
	console.log('filter');
	fetch(
		`https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&channelId=${channelId}&key=${APIKey}`
	)
		.then(function (res) {
			return res.json();
		})
		.then(function (res) {
			console.log(res.items);
			appendVideos(res.items);
		})
		.catch(function (err) {
			console.log('err:', err);
		});
};
