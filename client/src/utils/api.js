import axios from 'axios';
const localhost = 'localhost:5000';
const serverIP = '54.241.77.78';

const api = axios.create({
  baseURL: `http://${serverIP}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
