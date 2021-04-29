import axios from 'axios';
const localhost = 'localhost:5000';
const serverIP = '54.176.187.141';

const api = axios.create({
  baseURL: `http://${serverIP}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
