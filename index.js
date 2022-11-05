let APIKey = 'AIzaSyDS0-Mo1eGlDIwfLyw_dekt8hUD40q7Rcc';
let container = document.getElementById('search_results');

let myLocation = () => {
	navigator.geolocation.getCurrentPosition(currentLocation);
};
window.onload = myLocation();
function currentLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	myArea(lat, lon);
}
let myArea = (lat, lon) => {
	fetch(
		`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&regionCode=IN&key=${APIKey}&maxResults=20&chart=mostPopular`
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

let getData = async () => {
	try {
		let query = document.getElementById('query').value;
		let res = await fetch(
			`https://youtube.googleapis.com/youtube/v3/search?regionCode=IN&q=${query}&key=${APIKey}&part=snippet&chart=mostPopular&maxResults=20`
		);
		// let data = await res.json();
		let { items } = await res.json(); //items -> data.items

		let array_of_videos = items;

		appendVideos(array_of_videos);
		console.log(array_of_videos);
	} catch (err) {
		console.log('err:', err);
	}
};

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
			let div = document.createElement('div');

			let img = document.createElement('img');

			img.src = url;
			img.width = width;
			img.height = height;
			img.allow = 'fullscreen';

			let name = document.createElement('h5');
			name.innerText = title;

			div.append(img, name);
			div.addEventListener('click', () => {
				localStorage.clear;
				let video = [title, videoId, channelId, APIKey];
				localStorage.setItem('videoId', JSON.stringify(video));
				window.location.href = 'videoPlayer.html';
			});
			container.append(div);

			//console.log(title, videoId);
		}
	);
};
