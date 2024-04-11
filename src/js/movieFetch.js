import axios from 'axios';

const URL_KEY = 'a51a9bb0cd5bc1ed985d30c82a20bd57';

export default class movieFetch {
  constructor() {
    this.inputValue = '';
    this.page = 1;
    this.genres = '';
  }

  async fetchMovie() {
    try {
      const url = 'https://api.themoviedb.org/3/search/movie';
      
      const response = await axios.get(url, {
        params: {
          api_key: URL_KEY,
          query: this.inputValue,
          page: this.page,
        },
      });
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getGenre() {
    try {
      const url =
        'https://api.themoviedb.org/3/genre/movie/list?&language=en-US`';
    
      const response = await axios.get(url, {
        params: {
          api_key: URL_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get value() {
    return this.inputValue;
  }
  set value(newValue) {
    this.inputValue = newValue;
  }
}
