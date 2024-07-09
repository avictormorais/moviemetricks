import axios from 'axios';
const baseURL = 'https://moviemetricks-server.vercel.app';

const api = axios.create({
  baseURL: baseURL,
});

export default api;