console.log("page loaded");

const apiKey = "3e5775f6559acd9fc0c12c6586928764";
const baseURL = "https://api.themoviedb.org/3/";

const movieForm = document.querySelector("#movieForm");
const movieContent = document.querySelector(".content");

movieForm.addEventListener("submit", getConfig);

async function getConfig(event) {
	event.preventDefault(); // prevents page from reloading

	const configURL = `${baseURL}configuration?api_key=${apiKey}`;

	const response = await fetch(configURL);
	const responseData = await response.json();

	console.log(responseData);

	const baseImageURL = responseData.images.secure_base_url;
	const configData = responseData.images;

	// console.log("config:", configData);
	console.log("config fetched");

	const movieInput = event.target.movieName;
	const movie = movieInput.value;

	console.log("running for movie:", movie);

	runSearch(movie, baseImageURL);
}

async function runSearch(movie, baseImageURL) {
	const searchURL = `${baseURL}search/movie?api_key=${apiKey}&language=en-US&query=${movie}`;

	const responseSearch = await fetch(searchURL);
	const searchData = await responseSearch.json();

	// movieContent.innerHTML = JSON.stringify(searchData, null, 4);

	movieContent.innerHTML = ``;

	searchData.results.forEach((element) => {
		let image = `${baseImageURL}original${element.poster_path}`;
		// console.log(image);
		movieContent.innerHTML += `
            <img class="moviePoster" src="${image}" alt="${element.title}" />
            <!-- <h3>${element.title}</h3> -->
    `;
	});
}

// document.addEventListener("DOMContentLoaded", getConfig);

window.onload = async function (event) {
	const configURL = `${baseURL}configuration?api_key=${apiKey}`;

	const configResponse = await fetch(configURL);
	const configResponseData = await configResponse.json();

	console.log(configResponseData);

	const baseImageURL = configResponseData.images.secure_base_url;

	const nowPlayingApiURL = `${baseURL}movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

	const response = await fetch(nowPlayingApiURL);
	const responseData = await response.json();

	console.log(responseData);

	responseData.results.forEach((element) => {
		let image = `${baseImageURL}original${element.poster_path}`;
		movieContent.innerHTML += `
        <img class="moviePoster" src="${image}" alt="${element.title}" />
        <!-- <h3>${element.title}</h3> -->
		`;
	});
};
