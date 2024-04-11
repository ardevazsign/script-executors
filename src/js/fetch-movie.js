export function getMovieById(id) {
  const KEY = 'a51a9bb0cd5bc1ed985d30c82a20bd57';

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=eng`
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
