import axios from 'axios';
const baseURL = 'https://projeto-gpm1-0.onrender.com/';

const api = axios.create({
  baseURL: baseURL,
});

export default api;