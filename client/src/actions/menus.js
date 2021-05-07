import api from '../utils/api';
import { GET_MENU, SET_ACTIVE_SECTION } from './types';
import { preLoadImg } from './workers';

// Get Menus
export const getMenu = (url) => async (dispatch) => {
  try {
    const dba_id = url.split(':').pop();
    const body = { dba_id: dba_id };
    const res = await api.post('/menus/get_menu', body);
    if (!res.data) {
      return;
    }
    preLoadImg(res.data);
    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    console.log('--GET MENU ERROR---');
    console.log(err);
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
