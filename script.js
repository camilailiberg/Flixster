console.log("page loaded");

const apiKey = "3e5775f6559acd9fc0c12c6586928764";

const movieForm = document.querySelector(".movieForm");
const movieContent = document.querySelector(".content");
const individualMovie = document.querySelector(".individual-movie");
const movieTitleAndRating = document.querySelector(".title-and-rating");

window.onload = async function (event) {
	const nowPlayingApiURL =
		"https://api.themoviedb.org/3/movie/now_playing?api_key=3e5775f6559acd9fc0c12c6586928764&language=en-US&page=1";

	const response = await fetch(nowPlayingApiURL);
	const responseData = await response.json();

	console.log(responseData);

	responseData.results.forEach((element) => {
		individualMovie.innerHTML += `
        <img class="moviePoster" src="${element.poster_path}" alt="${element.title}" />
        <h3>${element.title}</h3>
		`;
		movieTitleAndRating.innerHTML += `
        <h3>${element.title}</h3>
        <h3>Rating<h3>
        `;
	});
};

function loadAll() {}
