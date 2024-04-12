
/**const API_KEY = 'api_key=a51a9bb0cd5bc1ed985d30c82a20bd57';
const BASE_URL = 'https://api.themoviedb.org/3/';

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
})*/

import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio.js";
import {BASE_URL,trending_path, trend_options, imageUrl, API_KEY} from "./filmoteka-api.js";

window.addEventListener('load', loadMovieList);
const movieEl = document.querySelector('.movie-list');
const modalbody = document.querySelector('.modal');

async function loadMovieList() {
    try {
        // Fetch data
        const path = BASE_URL + trending_path;
        const res = await axios.get(path, trend_options);
        console.log(res.data);

        // Destructure movieList from the response data
        const { results } = res.data;
        // Call createMovie function with movieList as argument
        createMovie(results);
    } catch (e) {
        console.error('Error loading movie list:', e);
        Notify.failure(e);
    }
}

//create movie list
async function createMovie(results) {
    // Fetch genre information
    const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const genreData = await genreResponse.json();
    const genres = genreData.genres;
        let movieMarkup = 
        results.map((
            {
                id,
                title,
                original_title,
                poster_path,
                genre_ids,
                release_date,
            }
        )=> {

            // Map genre_ids to genre names
            const movieGenres = genre_ids.slice(0, 2).map(genreId => {
                const genre = genres.find(genre => genre.id === genreId);
                return genre ? genre.name : 'Unknown';
            }).join(', ');
            //Movie year
            const year = new Date(release_date).getFullYear();
            return `
            <div class ="movie-card" data-id="${id}" data-toggle="modal" data-target="#myModal">
            <image src="${imageUrl + poster_path}" alt ="${original_title}"/>
            <div class ="movieCardDesc">
                <h2 class="movie-title">${title}<h2/>
                <span class ="movie-preview">${movieGenres}|${year}</span>
            </div> 
            </div>
            `;
        }).join("");
        movieEl.insertAdjacentHTML('beforeend', movieMarkup);
        
        
        // Add click event listener to every movie card
        const movieCards = document.querySelectorAll('.movie-card');
    
        movieCards.forEach(movieCard => {
            movieCard.addEventListener('click', () => {
                // Retrieve the value of data-id attribute of the clicked movie card
                const movieId = movieCard.dataset.id;
                console.log('Clicked Movie ID:', movieId);
                // You can perform any action with the movieId here
                //add modal
                openModal(movieId);
            });
        });
}

function openModal(movieId) {
    // Fetch movie details using movieId
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    axios.get(movieDetailsUrl)
        .then(response => {
            const movieDetails = response.data;
            console.log(movieDetails);
            //insert modal here
            const rating = movieDetails.vote_average;
            const ratings = rating.toFixed(2);
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="movie-box">
                    <div class="div-img">
                    <image src="${imageUrl + movieDetails.poster_path}" alt ="${movieDetails.original_title}"/>
                    </div>
                    <div class="movie-details">
                        <h1>${movieDetails.original_title}</h1>
                        <div class="list">
                            <ul class="list-title">
                                <li>
                                    <p>vote&nbsp;&#47;&nbsp;votes</p>
                                </li>
                                <li>
                                    <p>popularity</p>
                                </li>
                                <li>
                                    <p>original title</p>
                                </li>
                                <li>
                                    <p>genre</p>
                                </li>
                            </ul>

                            <ul class="list-disc">
                                <li>
                                    <p><span class="vote-text">${ratings}</span>&nbsp;&#47;&nbsp;${movieDetails.vote_count}</p>
                                </li>
                                <li>
                                    <p>${movieDetails.popularity}</p>
                                </li>
                                <li>
                                    <p>${movieDetails.original_title}</p>
                                </li>
                            </ul>
                        </div>

                        <h4>about</h4>
                        <p>${movieDetails.overview}</p>

                        <div class=""btn-con>
                        <button type="submit" class="btn-addwatch btn-add">add to watch</button>
                        <button type="submit" class="btn-addqeue btn-add">add to qeue</button>
                        </div>
                    </div>
                </div>
            `;  
            const modalBody = document.querySelector('.modal-body');
			      modalBody.appendChild(div);

            // Add event listener to clear modal body when modal is closed
            $('#myModal').on('hidden.bs.modal', function (e) {
                clearModalBody();
            });

        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            Notify.failure('Error fetching movie details');
        });
}
function clearModalBody() {
    const modalBody = document.querySelector('.modal-body');
    // Clear the contents of the modal body
    modalBody.innerHTML = '';
}