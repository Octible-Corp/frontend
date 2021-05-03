import axios from 'axios';
const localhost = 'localhost:5000';
const serverIP = 'd26tn4f5yjcq1p.cloudfront.net';

const api = axios.create({
  baseURL: `http://${localhost}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
