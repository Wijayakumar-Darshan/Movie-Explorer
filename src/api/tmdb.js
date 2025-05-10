// api/tmdb.js
import axios from 'axios';

const API_KEY = 'd0d79eb2a003c31938434d703d0cfc10';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export default tmdb;
