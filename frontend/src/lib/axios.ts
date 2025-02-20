import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND,
  timeout: 1000,
  withCredentials: true,
});
