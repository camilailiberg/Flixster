//loading to console
console.log("page loaded");

//constant global variables
const apiKey = "3e5775f6559acd9fc0c12c6586928764";
const baseURL = "https://api.themoviedb.org/3/";

// global variables
let pageGeneral = 1;
let pageSpecific = 1;
let lookedUpMovie = "";

// html elements
const movieForm = document.querySelector("#movieForm");
const movieContent = document.querySelector(".content");
const typeShowing = document.querySelector(".type-showing");
const generalLoadMore = document.querySelector(".general"); // load more movies in the now playing view
const specificLoadMore = document.querySelector(".specific"); // load more movies in the specific search view

// event listeners
specificLoadMore.addEventListener("click", lodeMoreSpecific);
movieForm.addEventListener("submit", getConfig);

//load more movies in the specific search view
async function lodeMoreSpecific(event) {
	event.preventDefault(); // prevents page from reloading

	// updates the You Search For: text
	typeShowing.innerHTML = `
    You Searched For:  '${lookedUpMovie}'
    `;

	// printing in the console what movie the user search for
	console.log(lookedUpMovie);

	// setting page genereal back to 1 for when the page reloads
	pageGeneral = 1;

	// adding 1 to pageSpecific to load the correct number of movies
	pageSpecific = pageSpecific + 1;

	// getting the configuration base url to use to retrive the image
	const configURL = `${baseURL}configuration?api_key=${apiKey}`;

	// fetching the info fror config from API
	const response = await fetch(configURL);
	// putting info in JSON format
	const responseData = await response.json();

	// printing the JSON for the config in the console
	console.log(responseData);

	// getting congig base url for getting the image poster later on
	const baseImageURL = responseData.images.secure_base_url;

	// printing in th econcole that I am fetching from the specific search function
	console.log("config fetched in loading more specific movies");

	// getting the URL to use when fetching a movie with a specifik key word
	const searchURL = `${baseURL}search/movie?api_key=${apiKey}&language=en-US&query=${lookedUpMovie}&page=${pageSpecific}`;

	// fetching the info for movies with a specific key word
	const responseSearch = await fetch(searchURL);
	// puttin info for movies with a specific key word in JSON
	const searchData = await responseSearch.json();

	// for each movie
	searchData.results.forEach(async (element) => {
		let image = `${baseImageURL}original${element.poster_path}`; // get the poster image

		// getting the URL to use when fetching trailers
		let videoURL = `${baseURL}movie/${element.id}/videos?api_key=${apiKey}&language=en-US`;

		// fetching the info for trailer
		let videoResponse = await fetch(videoURL);
		// puttin info for trailer in JSON
		let videoResponseData = await videoResponse.json();

		// and display the image, title, and rating for the user to see
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
            <button class="btn btn-light more-info-btn">More Info</button>
        </div>
		<div class="pop-up" id="${element.id}">
			<div class="modal-header">
				<div class="modal-title">
					${element.title}
				</div>
				<button class="modal-close-btn">&times;</button>
			</div>
			<div class="modal-body">
				<img class="moviePosterPopUp" src="${image}" alt="${element.title}" />
				<div class="pop-up-details-minus-image">
					<p>${element.release_date}</p>
					<div class="star-and-rating">
						<img class="star-rating" src="/images/star.png" alt="star-rating" />
						<h3>${element.vote_average}</h3>
					</div>
					<p>${element.overview}</p>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoResponseData.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<div/>
			</div>
		</div>
    `;
	});
}

// shows initial playing now movies
// AND also handles the load more movies in the now playing view
async function loadMore() {
	// updates the You Search For: text
	typeShowing.innerHTML = `
    Now Playing
    `;

	// getting the configuration base url to use to retrive the image
	const configURL = `${baseURL}configuration?api_key=${apiKey}`;

	// fetching the info for config from API
	const configResponse = await fetch(configURL);
	// putting info in JSON format
	const configResponseData = await configResponse.json();

	// prnting to the console the JSON object for config
	console.log(configResponseData);

	// getting config base url for getting the image poster later on
	const baseImageURL = configResponseData.images.secure_base_url;

	// getting the URL to use when fetching now playing movies
	let nowPlayingApiURL = `${baseURL}movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageGeneral}`;

	// fetching the info for now playing movies
	let response = await fetch(nowPlayingApiURL);
	// puttin info for now playing movies in JSON
	let responseData = await response.json();

	// printing to the console the JSON object resturned for now playing movies
	console.log(responseData);

	// for each movie in results
	responseData.results.forEach(async (element) => {
		// get the poster
		let image = `${baseImageURL}original${element.poster_path}`;

		// getting the URL to use when fetching now playing movies
		let videoURL = `${baseURL}movie/${element.id}/videos?api_key=${apiKey}&language=en-US`;

		// fetching the info for video
		let videoResponse = await fetch(videoURL);
		// puttin info for video in JSON
		let videoResponseData = await videoResponse.json();

		// console.log(videoResponseData.results[0].key);

		//display the poster, title, and rating for each movie to the user
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
            <button class="btn btn-light more-info-btn" data-movie-id=${element.id}>More Info</button>
            <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/gmRKv7n2If8" frameborder="0" allow; encypted-media" allowfullscreen></iframe> -->
        </div>
		<div class="pop-up" id="${element.id}">
				<div class="modal-header">
					<div class="modal-title">
						${element.title}
					</div>
					<button class="modal-close-btn">&times;</button>
				</div>
				<div class="modal-body">
					
						<img class="moviePosterPopUp" src="${image}" alt="${element.title}" />
						<div class="pop-up-details-minus-image">
							<p>${element.release_date}</p>
							<div class="star-and-rating">
								<img class="star-rating" src="/images/star.png" alt="star-rating" />
								<h3>${element.vote_average}</h3>
							</div>
							<p>${element.overview}</p>
							<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoResponseData.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						<div/>
					
				</div>
		</div>
        `;
	});

	// increase pageGeneral so that when the user clicks on load more button it loads the next page movies into the FLIXTER app
	pageGeneral = pageGeneral + 1;
}

// gets the config part of the url for getting an image when searching for a specific movie
async function getConfig(event) {
	// prevents page from reloading
	event.preventDefault();

	// getting the configuration base url to use to retrive the image
	const configURL = `${baseURL}configuration?api_key=${apiKey}`;

	// fetching the info fror config from API
	const response = await fetch(configURL);
	// putting config info in JSON format
	const responseData = await response.json();

	// printing the JSON for the config in the console
	console.log(responseData);

	// getting config base url for getting the image poster later on
	const baseImageURL = responseData.images.secure_base_url;

	// printing in the console that I fetched the config info from getConfig function
	console.log("config fetched from getConfig function");

	// saving the name of the movie the user typed in the search bar
	const movieInput = event.target.movieName;
	const movie = movieInput.value;
	// saving the name of the movie the user typed in the search bar in the global variable lookedUpMovie that is used when more movies are loaded to display in the "You Searcg For:" section
	lookedUpMovie = movie;

	// updates the You Search For: text
	typeShowing.innerHTML = `
    You Searched For:  '${movie}'
    `;

	// printing to the console th ename of the movie the user typed in the search bar
	console.log("running for movie:", movie);

	// calling method runSearch
	runSearch(movie, baseImageURL);
}

// this handles the logic for searching a keyword
async function runSearch(movie, baseImageURL) {
	// if button for specific load is hidden, unhide it and hide now playing load more movies button
	if (specificLoadMore.classList.contains("hidden")) {
		specificLoadMore.classList.remove("hidden");
		generalLoadMore.classList.add("hidden");
	}

	// reset pageGeneral to 1
	pageGeneral = 1;
	// reset pageSpecific to 1 because if I am in this method is because the user clicked on the search button and not on hte load more button for specific movies
	pageSpecific = 1;

	// before showing more movies clear the content
	movieContent.innerHTML = ``;

	// getting the URL to use when fetching a movie with a specifik key word
	const searchURL = `${baseURL}search/movie?api_key=${apiKey}&language=en-US&query=${movie}&page=${pageSpecific}`;

	// fetching the info for movies with a specific key word
	const responseSearch = await fetch(searchURL);
	// puttin info for movies with a specific key word in JSON
	const searchData = await responseSearch.json();

	// for each movie
	searchData.results.forEach(async (element) => {
		let image = `${baseImageURL}original${element.poster_path}`; // get the poster

		// getting the URL to use when fetching now playing movies
		let videoURL = `${baseURL}movie/${element.id}/videos?api_key=${apiKey}&language=en-US`;

		// fetching the info for video
		let videoResponse = await fetch(videoURL);
		// puttin info for video in JSON
		let videoResponseData = await videoResponse.json();

		// and show the poster, the title, and the rating to the user
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
			<button class="btn btn-light more-info-btn">More Info</button>
        </div>
		<div class="pop-up" id="${element.id}">
				<div class="modal-header">
					<div class="modal-title">
						${element.title}
					</div>
					<button class="modal-close-btn">&times;</button>
				</div>
				<div class="modal-body">
					
						<img class="moviePosterPopUp" src="${image}" alt="${element.title}" />
						<div class="pop-up-details-minus-image">
							<p>${element.release_date}</p>
							<div class="star-and-rating">
								<img class="star-rating" src="/images/star.png" alt="star-rating" />
								<h3>${element.vote_average}</h3>
							</div>
							<p>${element.overview}</p>
							<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoResponseData.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						<div/>
					
				</div>
		</div>
    `;
	});
}

// document.addEventListener("DOMContentLoaded", getConfig);

//shows trailer
// Event Delegation
document.onclick = function (event) {
	const target = event.target;

	if (target.classList.contains("more-info-btn")) {
		// console.log("hello world");
		// console.log("Event: " + event);
		const divParentIndividualMovie = event.target.parentElement;
		const popUp = divParentIndividualMovie.nextElementSibling;
		const divParentContent = divParentIndividualMovie.parentElement;
		const overlay = divParentContent.nextElementSibling;
		// overlay.classList.add("active");
		popUp.classList.add("active");
	}

	if (target.classList.contains("modal-close-btn")) {
		const modalHeader = target.parentElement;
		const popUp = modalHeader.parentElement;
		const content = popUp.parentElement;
		const overlay = content.nextElementSibling;
		// overlay.classList.remove("active");
		popUp.classList.remove("active");
	}
};

// loads playing now movies when page loads
window.onload = async function (event) {
	// loads hids and shows the right load more button for the playing now view
	if (generalLoadMore.classList.contains("hidden")) {
		generalLoadMore.classList.remove("hidden");
		specificLoadMore.classList.add("hidden");
	}
	// calling the loadMore function
	loadMore();
};
