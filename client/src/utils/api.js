import axios from 'axios';
const localhost = 'localhost:5000';
const serverIP = 'dmlud1ft180u3.cloudfront.net';

const api = axios.create({
  baseURL: `https://${serverIP}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
