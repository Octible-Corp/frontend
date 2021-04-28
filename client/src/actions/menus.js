import api from '../utils/api';
import { GET_MENU, SET_ACTIVE_SECTION } from './types';

// Get Menus
export const getMenu = (url) => async (dispatch) => {
  try {
    const restaurant_id = url.split(':').pop();
    const body = { restaurant_id: 'o0wz8aizx2ax' };
    const res = await api.post('/menus/get_menu', body);
    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    throw new Error(err);
  }
};

// Set active section
export const setActiveSection = (section_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_ACTIVE_SECTION,
      payload: section_id,
    });
  } catch (err) {
    throw new Error(err);
  }
};
