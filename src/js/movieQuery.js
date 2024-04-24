const apiKey = 'a51a9bb0cd5bc1ed985d30c82a20bd57'; 
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieContainer = document.getElementById('movie-container');

searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchMovies();
  }
});

function searchMovies() {
  const query = searchInput.value;

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
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

    const movieGenre = document.createElement('p');
    movieGenre.classList.add('movie-genre');
    movieGenre.textContent = getMovieGenres(movie.genre_ids);
    movieCard.appendChild(movieGenre);

    const movieReleaseYear = document.createElement('p');
    movieReleaseYear.classList.add('movie-release-year');
    movieReleaseYear.textContent = `Release Year:${movie.release_date.slice(0, 4)}`;
    movieCard.appendChild(movieReleaseYear);

    movieContainer.appendChild(movieCard);
  });
}

function getMovieGenres(genreIds) {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  const movieGenres = genreIds.map(id => genres[id]);
  return movieGenres.join(', ');
}