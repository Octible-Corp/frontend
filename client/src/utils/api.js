import axios from 'axios';
const localhost = 'localhost:5000';
const serverIP = 'e63b8148c06d.ngrok.io';

const api = axios.create({
  baseURL: `http://${localhost}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
