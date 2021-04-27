import axios from 'axios';
const localhost = 'localhost:5000';
const serverIP = 'octible.io';

const api = axios.create({
  baseURL: `http://${localhost}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
