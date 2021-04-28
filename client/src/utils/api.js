import axios from 'axios';
const localhost = 'localhost:5000';
const serverIP = '7de6cec006e6.ngrok.io';

const api = axios.create({
  baseURL: `http://${serverIP}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
