import api from '../utils/api';
import { GET_MENU } from './types';

// Get Menus
export const getMenu = (url) => async (dispatch) => {
  try {
    const restaurant_id = url.split(':').pop();
    const body = { restaurant_id: 'o0wz8aizx2ax' };
    const res = await api.post('/get_menu', body);
    console.log('--DATA--');
    console.log(res.data);
    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    throw new Error(err);
  }
};
