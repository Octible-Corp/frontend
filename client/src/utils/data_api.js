import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

const localhost = 'localhost:5000';
const serverIP = 'octible.io';

const data_api = axios.create({
  baseURL: `http://${localhost}/api`,
  responseType: 'blob'
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

data_api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.msg === 'Token is not valid') {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default data_api;
