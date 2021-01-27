import api from '../utils/api';
import data_api from '../utils/data_api';
import { setAlert } from './alert';
import {
  POST_ERROR,
  DELETE_MENU,
  UPDATE_MENU,
  DELETE_PHOTO,
  GET_MENUS,
  ADD_MENU,
  TOGGLE,
  NEW_URL,
  EDIT_MENU,
  ADD_COURSE,
  SAVE_ITEM,
  SAVE_STEP_ONE,
  SAVE_STEP_TWO
} from './types';

// Get Menus
export const getMenus = (id) => async (dispatch) => {
  try {
    const body = { id: id };
    const res = await api.post('/posts/menus', body);
    dispatch({
      type: GET_MENUS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Get menu error' }
    });
  }
};

// Get Menus
export const getUpdate = (_id) => async (dispatch) => {
  try {
    const body = { id: _id };
    const res = await api.post('/posts/activate', body);

    const payload = res.data;
    dispatch({
      type: TOGGLE,
      payload: payload
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editMenu = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_MENU,
      payload: _id
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete menu
export const deleteMenu = (id) => async (dispatch) => {
  try {
    const body = { id: id };
    const res = await api.post('/posts/delete', body);

    dispatch({
      type: DELETE_MENU,
      payload: res.data
    });

    dispatch(setAlert('Menu Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Menu removal error' }
    });
  }
};

// Delete photo
export const deletePhoto = (src, menuId) => async (dispatch) => {
  try {
    if (!menuId) {
      //console.log('Error: No menu ID provided');
    }
    if (!src) {
      //console.log('Error: No photo provided');
    }
    const res = await api.delete(`/posts/deletePhoto/${menuId}/${src}`);
    dispatch({
      type: DELETE_PHOTO,
      payload: res.data
    });

    dispatch(setAlert('Photo Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Photo removal error' }
    });
  }
};

// Add photos (given a menus exists)
export const addPhotos = () => async (dispatch) => {
  try {
    const res = await api.get('/posts/newPhoto');
    //console.log(res.data);
    dispatch({
      type: UPDATE_MENU,
      payload: res.data
    });

    dispatch(setAlert('Photo added!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = () => async (dispatch) => {
  try {
    //console.log('trying');
    const res = await data_api.get('/posts/test');
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Send feedback
export const feedback = (text, request) => async (dispatch) => {
  try {
    const formData = { text: text };
    await api.post(`/posts/feedback/${request}`, formData);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Fire backend QR action
export const qrAction = () => async (dispatch) => {
  try {
    console.log('trying');
    const res = await data_api.get('/posts/test');
    if (res.data === null) {
      console.log('No PDF data ...?');
    } else {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'QR_CODES.pdf');
      document.body.appendChild(link);
      link.click();
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add new menu
export const getNewMenu = (id) => async (dispatch) => {
  try {
    const body = { menuId: id };
    const res = await api.post(`/posts/newMenu/`, body);

    if (id === 'New') {
      dispatch({
        type: ADD_MENU,
        payload: res.data.newMenu
      });
      if (res.data.user) {
        dispatch({
          type: NEW_URL,
          payload: res.data.user
        });
      }
    } else {
      dispatch({
        type: UPDATE_MENU,
        payload: res.data
      });
    }

    // Get pdf from server
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Get PDF error' }
    });
  }
};

export const addCourse = (course, _id) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_COURSE,
      payload: { course, _id }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Get menu error' }
    });
  }
};

export const saveItem = (item, id) => async (dispatch) => {
  console.log('SENDING ITEM TO REDUCER');
  console.log(id);
  try {
    dispatch({
      type: SAVE_ITEM,
      payload: { add: item, _id: id }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Get menu error' }
    });
  }
};

export const saveStepOne = (formData) => async (dispatch) => {
  try {
    const body = formData;

    const res = await api.post('/posts/step_one', body);
    console.log(res);
    dispatch({
      type: SAVE_STEP_ONE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Get menu error' }
    });
  }
};

export const saveStepTwo = (formData) => async (dispatch) => {
  try {
    const body = formData;
    const res = await api.post('/posts/step_two', body);
    console.log(res);
    dispatch({
      type: SAVE_STEP_TWO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'Get menu error' }
    });
  }
};
