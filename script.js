console.log("page loaded");

const apiKey = "3e5775f6559acd9fc0c12c6586928764";
const baseURL = "https://api.themoviedb.org/3/";

let pageGeneral = 1;
let pageSpecific = 1;

const movieForm = document.querySelector("#movieForm");
const movieContent = document.querySelector(".content");
const typeShowing = document.querySelector(".type-showing");
const generalLoadMore = document.querySelector(".general");
const specificLoadMore = document.querySelector(".specific");

movieForm.addEventListener("submit", getConfig);

async function loadMore() {
	typeShowing.innerHTML = `
    Now Playing
    `;

	const configURL = `${baseURL}configuration?api_key=${apiKey}`;

	const configResponse = await fetch(configURL);
	const configResponseData = await configResponse.json();

	console.log(configResponseData);

	const baseImageURL = configResponseData.images.secure_base_url;

	let nowPlayingApiURL = `${baseURL}movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageGeneral}`;

	let response = await fetch(nowPlayingApiURL);
	let responseData = await response.json();

	console.log(responseData);

	responseData.results.forEach((element) => {
		let image = `${baseImageURL}original${element.poster_path}`;
		movieContent.innerHTML += `
        <div class="individial-movie">
            <img class="moviePoster" src="${image}" alt="${element.title}" />
            <div class="name-rating">
                <h3>${element.title}</h3>
                <div class="star-and-rating">
                    <img class="star-rating" src="/images/star.png" alt="star-rating" />
                    <h3>${element.vote_average}</h3>
                </div>
            </div>
        </div>
		`;
	});

	pageGeneral = pageGeneral + 1;
}

async function getConfig(event) {
	event.preventDefault(); // prevents page from reloading

	const configURL = `${baseURL}configuration?api_key=${apiKey}`;

	const response = await fetch(configURL);
	const responseData = await response.json();

	console.log(responseData);

	const baseImageURL = responseData.images.secure_base_url;
	const configData = responseData.images;

	console.log("config fetched");

	const movieInput = event.target.movieName;
	const movie = movieInput.value;

	typeShowing.innerHTML = `
    You Searched For:  '${movie}'
    `;

	console.log("running for movie:", movie);

	runSearch(movie, baseImageURL);
}

async function loadMoreSpecific(movie) {
	pageSpecific = pageSpecific + 1;
}
async function runSearch(movie, baseImageURL) {
	if (specificLoadMore.classList.contains("hidden")) {
		specificLoadMore.classList.remove("hidden");
		generalLoadMore.classList.add("hidden");
	}

	const searchURL = `${baseURL}search/movie?api_key=${apiKey}&language=en-US&query=${movie}`;

	const responseSearch = await fetch(searchURL);
	const searchData = await responseSearch.json();

	movieContent.innerHTML = ``;

	searchData.results.forEach((element) => {
		let image = `${baseImageURL}original${element.poster_path}`;

		movieContent.innerHTML += `
        <div class="individial-movie">
            <img class="moviePoster" src="${image}" alt="${element.title}" />
            <div class="name-rating">
                <h3>${element.title}</h3>
                <div class="star-and-rating">
                    <img class="star-rating" src="/images/star.png" alt="star-rating" />
                    <h3>${element.vote_average}</h3>
                </div>
            </div>
        </div>
    `;
	});
}

// document.addEventListener("DOMContentLoaded", getConfig);

window.onload = async function (event) {
	loadMore();
};
