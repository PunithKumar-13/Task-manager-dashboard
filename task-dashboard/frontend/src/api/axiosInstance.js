import axios from 'axios';

const USERNAME = 'admin';
const PASSWORD = 'password123';
const token = btoa(`${USERNAME}:${PASSWORD}`);

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

if (import.meta.env.DEV) {
  console.log('🔗 API Base URL:', baseURL);
}

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Basic ${token}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default instance;
