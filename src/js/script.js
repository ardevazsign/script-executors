

import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio.js";
import {BASE_URL,trending_path, trend_options, imageUrl, API_KEY} from "./filmoteka-api.js";

window.addEventListener('load', loadMovieList);
const movieEl = document.querySelector('.movie-list');

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
async function createMovie(results){
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
            <div class ="movie-card" data-id="${id}">
            <image src="${imageUrl+poster_path}" alt ="${original_title}"/>
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
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            Notify.failure('Error fetching movie details');
        });
}

