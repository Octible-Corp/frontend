import axios from 'axios';
const localhost = 'localhost:5000';
//const serverIP = 'd26tn4f5yjcq1p.cloudfront.net';
const serverIP = 'f8582b411a53.ngrok.io';

const api = axios.create({
  baseURL: `https://${serverIP}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
