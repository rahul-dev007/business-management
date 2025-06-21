// lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true, // ✅ So cookies are sent
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
