import axios from 'axios';

const BASE_URL = 'http://localhost:3030';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 3000
});

export default API;