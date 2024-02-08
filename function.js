const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=35220158e40f259b13fe6b743e59de8e&query="';
const API_URL = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=35220158e40f259b13fe6b743e59de8e";
const Latest = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&api_key=35220158e40f259b13fe6b743e59de8e"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const tv ="https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=35220158e40f259b13fe6b743e59de8e"
const MOVIE_DETAILS = "https://api.themoviedb.org/3/movie/";
const toprated = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=35220158e40f259b13fe6b743e59de8e"
const API_KEY = "?api_key=35220158e40f259b13fe6b743e59de8e";
const google_search = "https://www.google.com/search?q="
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(Latest)
async function getMovies(url){
    const result = await fetch(url)
    const data = await result.json();
    console.log(data.results)
    showMovies(data.results)
}
async function showMovies(movies){
    main.innerHTML=""
    movies.forEach((movie)=>{

        const movieEl = document.createElement("div")
        movieEl.classList.add('movie')
        movieEl.innerHTML=
        `<img src="${IMG_PATH+movie.poster_path}" alt="${movie.title}">
        <div class="info">
            <h3 class="title">${movie.title}</h3>   
            <div class="rating"><span>${movie.vote_average}</span></div>
        </div>
        <div class="overview">
            <h3 class="title">Overview</h3>
            <h2 class="title"><a href="${google_search+movie.title}" id="movielink">${movie.title}</a></h2>
            <p>${movie.overview}</p>
        </div>`
        main.appendChild(movieEl)
    })
}
form.addEventListener("submit",(s)=>{
    s.preventDefault()
    const searchMovie = search.value
    if(searchMovie && searchMovie!=""){
        getMovies(SEARCH_API+searchMovie)
    }else{
        alert("Enter the movie or tv series")
    }
})
document.getElementById('popular').addEventListener('click', function(event) {
    event.preventDefault();
    getMovies(API_URL);
});
document.getElementById('home').addEventListener('click', function(event) {
    event.preventDefault();
    getMovies(Latest);
});
document.getElementById('toprated').addEventListener('click', function(event) {
    event.preventDefault();
    getMovies(toprated);
});
document.getElementById('tv').addEventListener('click', function(event) {
    event.preventDefault();
    gettv(tv);
});
async function gettv(url){
    const result = await fetch(url)
    const data = await result.json();
    console.log(data.results)
    showtv(data.results)
}
async function showtv(tvshows){
    main.innerHTML = "";
    tvshows.forEach((tv) => {
        const tvEl = document.createElement("div");
        tvEl.classList.add('movie');
        tvEl.innerHTML = `
            <img src="${IMG_PATH}${tv.poster_path}" alt="${tv.name}">
            <div class="info">
                <h3 class="title">${tv.name}</h3>   
                <div class="rating"><span>${tv.vote_average}</span></div>
            </div>
            <div class="overview">
                <h3 class="title">Overview</h3>
                <h2 class="title"><a href="${google_search}${tv.name}" id="movielink">${tv.name}</a></h2>
                <p>${tv.overview}</p>
            </div>`;
        main.appendChild(tvEl);
    });
}

