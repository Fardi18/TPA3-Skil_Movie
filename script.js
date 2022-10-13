const api = "https://api.themoviedb.org/3/discover/movie?api_key=957a590ad79a9059d49d733ec0fb2c73"
const imgPath = "https://image.tmdb.org/t/p/w1280"
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

// akses pada html
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

// akses list film popular
getMovies(api);
async function getMovies(url) {
    const response = await fetch(url);
    //unboxing api 
    const respData = await response.json();
    console.log(respData);
    showMovies(respData.results);
}

// menampilkan list film 
function showMovies(movie) {
    main.innerHTML = "";
    movie.forEach((movie) => {
        const { poster_path, title, vote_average, release_date } = movie;
        const movies = document.createElement("div");
        movies.classList.add("movies");
        movies.innerHTML = `
        <div class="card-movie">
            <img src="${imgPath + poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <p>${vote_average}</p>
            </div>
            <p class="date">${release_date}</p>
        </div>`;
        main.append(movies);
    });
}

// search film
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchApi + searchTerm);
        search.value = "";
    }
});