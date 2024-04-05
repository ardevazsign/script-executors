
const API_KEY = 'api_key=a51a9bb0cd5bc1ed985d30c82a20bd57';
const BASE_URL = 'https://api.themoviedb.org/3';

const API_URL = BASE_URL + '/dicover/movie?sort_by=papularity.desc&'
    + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
getMovies(API_URL);

function getMovies(url) {

    fetch(url)
    .then(res => res.json()).then(data => {
         console.log(data.res)
         showMovies(data.res);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, genre, poster_path,} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
               <img src="${IMG_URL + poster_path}" alt="${title}">

               <div class="movie-info">
                <h5>${title}</h5>
                <h5>${genre}</h5>
               </div>
        `
        main.appendChild(movieEl);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL+'&query='+searchTerm) 
    }


})
