import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND,
  timeout: 5000,
  withCredentials: true,
});
