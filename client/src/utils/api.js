import axios from 'axios';
//const serverIP = 'localhost:5000';
const serverIP = 'd26tn4f5yjcq1p.cloudfront.net';

const api = axios.create({
  baseURL: `https://${serverIP}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
