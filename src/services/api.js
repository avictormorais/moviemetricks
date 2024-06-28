import axios from 'axios';
const baseURL = 'https://moviemetricks-server.onrender.com';

const api = axios.create({
  baseURL: baseURL,
});

export default api;