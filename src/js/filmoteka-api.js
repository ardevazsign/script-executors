export const BASE_URL="https://api.themoviedb.org/3";
export const trending_path="/trending/movie/day";
export const API_KEY ="acbe04d9b6826898170f4d9e0758e12a";

export const pathMovieDetails ="https://api.themoviedb.org/3/movie/";

//image URL
export const imageUrl = "https://image.tmdb.org/t/p/w500";

export const trend_options = {
    params:{
        language: 'en-US',
        page: 1,
        per_page: 20,

    },
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2JlMDRkOWI2ODI2ODk4MTcwZjRkOWUwNzU4ZTEyYSIsInN1YiI6IjY2MGQ2MjFiMTQ5NTY1MDE3ZGJjNmEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PUDKOldzNDJJ4hr2JxeieU4DQWjQnz7YAo5HpnJeNNY'
      }
}
