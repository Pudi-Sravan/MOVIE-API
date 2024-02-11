const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=35220158e40f259b13fe6b743e59de8e&page=1%22&query="';
const API_URL = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=35220158e40f259b13fe6b743e59de8e";
const Latest = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&api_key=35220158e40f259b13fe6b743e59de8e"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const Tv ="https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=35220158e40f259b13fe6b743e59de8e"
const MOVIE_DETAILS = "https://api.themoviedb.org/3/movie/";
const toprated = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=35220158e40f259b13fe6b743e59de8e"
const API_KEY = "?api_key=35220158e40f259b13fe6b743e59de8e";
const google_search = "https://www.google.com/search?q=";
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
let UrL=Latest;
let pagenum = document.getElementsByClassName("numbers");
let searchMovie;
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
        ` <div class="mov">
        <img src="${IMG_PATH+movie.poster_path}" alt="${movie.title}">
        <div class="overview">
        <h3 class="title">Overview</h3>
        <h2 class="title"><a href="${google_search+movie.title}" id="movielink">${movie.title}</a></h2>
        <p>${movie.overview}</p>
        </div>
        </div>
        <div class="info">
            <h3 class="title">${movie.title}</h3>   
            <div class="rating"><span>${movie.vote_average}</span></div>
        </div>`
        main.appendChild(movieEl)
    })
}
form.addEventListener("submit",(s)=>{
    s.preventDefault()
    searchMovie = search.value
    if(searchMovie && searchMovie!=""){ 
        UrL=SEARCH_API;
        presentvalue=1;
        getMovies(SEARCH_API+searchMovie)
        pagnore();
    }else{
        alert("Enter the movie or tv series")
    }
})
document.getElementById('popular').addEventListener('click', function(event) {
    event.preventDefault();
    UrL=API_URL;
    getMovies(API_URL); 
    presentvalue=1;
    pagnore();
});
document.getElementById('home').addEventListener('click', function(event) {
    event.preventDefault();
    UrL=Latest;
    getMovies(Latest);
    presentvalue = 1;
    pagnore();

});
document.getElementById('toprated').addEventListener('click', function(event) {
    event.preventDefault();
    UrL=toprated;
    getMovies(toprated);
    presentvalue = 1;
    pagnore();

});
document.getElementById('tv').addEventListener('click', function(event) {
    event.preventDefault();
    UrL=Tv;  
    presentvalue = 1;
    gettv(Tv);
    pagnore();

    
});
async function gettv(url){
    const result = await fetch(url)
    const data = await result.json();
    console.log(data.results)
    showtv(data.results)
}
async function showtv(tvshows){
    main.innerHTML = "";
    tvshows.forEach((tvS) => {
        const tvEl = document.createElement("div");
        tvEl.classList.add('movie');
        tvEl.innerHTML = `
        <div class="mov">
            <img src="${IMG_PATH}${tvS.poster_path}" alt="${tvS.name}">
            <div class="overview">
                <h3 class="title">Overview</h3>
                <h2 class="title"><a href="${google_search}${tvS.name}" id="movielink">${tvS.name}</a></h2>
                <p>${tvS.overview}</p>
            </div>
        </div>
            <div class="info">
                <h3 class="title">${tvS.name}</h3>   
                <div class="rating"><span>${tvS.vote_average}</span></div>
            </div>
            `;
        main.appendChild(tvEl);
    });
}
const nav = document.getElementById('nav');
const checkbox = document.getElementById('check');
const content = document.getElementById('content');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        nav.style.left = '-1%';
        content.style.display = 'none';
    } else {
        nav.style.left = '-200%'; 
        content.style.display = 'flex';
    }
    void nav.offsetWidth;
    void content.offsetWidth;

    if (this.checked) {
        nav.style.left = '-2%'; 
    } else {
        nav.style.left = '-200%'; 
    }
});
function pagnore(){
    for (let l of pagenum) {
        l.classList.remove("present");
    }
    let presePage = document.querySelector(`.numbers[value="${presentvalue}"]`);
        presePage.classList.add("present");
}
let presentvalue = 1;
function presentpage(event) {
    for (let l of pagenum) {
        l.classList.remove("present");
    }
    event.target.classList.add("present");
    presentvalue = event.target.value;
    if(UrL===Tv){
        UrLupdatetv(presentvalue);
    }
    else if(UrL===Latest){
        UrLupdatela(presentvalue);
    }
    else if(UrL===toprated){
        UrLupdatetop(presentvalue);
    }
    else if(UrL===API_URL){
        UrLupdatepo(presentvalue);
    }else if(UrL===SEARCH_API){
        UrLupdatese(presentvalue, searchMovie);

    }

}

for (let num of pagenum) {
    num.addEventListener('click', presentpage);
}
    function backward() {
        if (presentvalue < 6) {
            for (let l of pagenum) {
                l.classList.remove("present");
            }
            presentvalue--;
            if(UrL===Tv){
                UrLupdatetv(presentvalue);
            }
            else if(UrL===Latest){
                UrLupdatela(presentvalue);
            }
            else if(UrL===toprated){
                UrLupdatetop(presentvalue);
            }
            else if(UrL===API_URL){
                UrLupdatepo(presentvalue);
            }
            else if(UrL===SEARCH_API){
                UrLupdatese(presentvalue, searchMovie);

            }
            let prevPage = document.querySelector(`.numbers[value="${presentvalue}"]`);
            prevPage.classList.add("present");
        }
    }
    
    function forward() {
        if (presentvalue < 6) {
            for (let l of pagenum) {
                l.classList.remove("present");
            }
            presentvalue++;
            if(UrL===Tv){
                UrLupdatetv(presentvalue);
            }
            else if(UrL===Latest){
                UrLupdatela(presentvalue);
            }
            else if(UrL===toprated){
                UrLupdatetop(presentvalue);
            }
            else if(UrL===API_URL){
                UrLupdatepo(presentvalue);
            }
            else if(UrL===SEARCH_API){
                UrLupdatese(presentvalue, searchMovie);

            }
            let nextPage = document.querySelector(`.numbers[value="${presentvalue}"]`);
            nextPage.classList.add("present");
        }
    }
    
function UrLupdatetv(tvpag){
    const UrL = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${tvpag}&sort_by=popularity.desc&api_key=35220158e40f259b13fe6b743e59de8e`;
    gettv(UrL);
}
function UrLupdatepo(popag){
    const UrL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${popag}&sort_by=popularity.desc&api_key=35220158e40f259b13fe6b743e59de8e`;
    getMovies(UrL);
}
function UrLupdatela(lapag){
    const UrL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${lapag}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&api_key=35220158e40f259b13fe6b743e59de8e`;
    getMovies(UrL);
}
function UrLupdatetop(toppag){
    const UrL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${toppag}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=35220158e40f259b13fe6b743e59de8e`;
    getMovies(UrL);
}
function UrLupdatese(sepag, searchMovie){
    const UrL = `https://api.themoviedb.org/3/search/movie?api_key=35220158e40f259b13fe6b743e59de8e&page=${sepag}%22&query="`;
    getMovies(UrL + searchMovie);
}

