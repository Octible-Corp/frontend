import api from '../utils/api';
import data_api from '../utils/data_api';
import { setAlert } from './alert';
import { GET_MENUS } from './types';

// Get Menus
export const getMenus = (id) => async (dispatch) => {
  try {
    const body = { id: id };
    const res = await api.post('/posts/menus', body);
    dispatch({
      type: GET_MENUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Get menu error' },
    });
  }
};
