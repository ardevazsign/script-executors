import axios from 'axios';

const apiKey = 'a51a9bb0cd5bc1ed985d30c82a20bd57';
const movieContainer = document.getElementById('movie-container');
// const popularContainer = document.getElementById('popular-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchMovies();
  }
});

function searchMovies() {
  const query = searchInput.value;
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(response => {
      const movies = response.data.results;
      displayMovies(movies);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayMovies(movies) {
  movieContainer.innerHTML = '';
  

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieCard.appendChild(moviePoster);
 
       const movieTitle = document.createElement('h3');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;
    movieCard.appendChild(movieTitle);

    const movieReleaseYear = document.createElement('p');
    movieReleaseYear.classList.add('movie-release-year');
    movieReleaseYear.textContent = `Release Year: ${movie.release_date.slice(0, 4)}`;
    movieCard.appendChild(movieReleaseYear);

    // movieCard.addEventListener('click', () => {
    //   getRelatedMovies(movie.id);
    // });

    movieContainer.appendChild(movieCard);
  });
}

// function getRelatedMovies(movieId) {
//   axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`)
//     .then(response => {
//       const relatedMovies = response.data.results;
//       displayMovies(relatedMovies);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
