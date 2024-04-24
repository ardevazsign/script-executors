const apiKey = 'a51a9bb0cd5bc1ed985d30c82a20bd57';
// const popularContainer = document.getElementById('popular-container');

axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  .then(response => {
    const movies = response.data.results;
    displayMovies(movies);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function displayMovies(movies) {
  popularContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieCard.appendChild(moviePoster);

    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');

    const movieTitle = document.createElement('h3');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;
    movieDetails.appendChild(movieTitle);

    const movieGenre = document.createElement('p');
    movieGenre.classList.add('movie-genre');
    movieGenre.textContent = `${getGenreNames(movie.genre_ids).join(', ')}`;
    movieDetails.appendChild(movieGenre);

    const movieReleaseYear = document.createElement('p');
    movieReleaseYear.classList.add('movie-release-year');
    movieReleaseYear.textContent = `${getReleaseYear(movie.release_date)}`;
    movieDetails.appendChild(movieReleaseYear);

    movieCard.appendChild(movieDetails);
    popularContainer.appendChild(movieCard);
  });
}

function getGenreNames(genreIds) {
  const genreNames = {
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

  return genreIds.map(id => genreNames[id]);
}

function getReleaseYear(releaseDate) {
  return releaseDate.split('-')[0];
}