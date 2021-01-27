import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  VERIFY_SENT,
  PASSWORD_RESET,
  PASSWORDS_SET,
  SET_PASSWORD,
  UPDATE_STEP
} from './types';
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Load User
export const fire = async () => {
  try {
    let i;
    for (i = 0; i < 10000; i++) {
      const body = {
        num: i
      };
      const res = await api.post('auth/fire', body);
      console.log(res.data);
    }
    console.log('-------Done------');

    return;
  } catch (err) {
    console.log(err);
  }
};

//Verify User

export const verifier = ({ email }) => async (dispatch) => {
  //console.log(email);
  try {
    const res = await api.post('/auth/verify' + email);
    //console.log(res);
    dispatch({
      type: VERIFY_SENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Forgot password

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const dt = { email: email };

    const res = await api.post('/auth/forgot', dt);
    dispatch({
      type: PASSWORD_RESET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Button click to reset
export const resetPassword = (id, password) => async (dispatch) => {
  try {
    console.log('outgoing verifs');

    const body = { id: id, password: password };
    console.log(body);
    const res = await api.post('/auth/changepass', body);
    dispatch({
      type: PASSWORD_RESET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    console.log(register);
    const res = await api.post('auth/register', formData);
    console.log(res);
    dispatch({
      type: VERIFY_SENT,
      payload: res.data
    });
    dispatch(
      setAlert(
        'Please check your email and follow the link to create your account',
        'success'
      )
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post('auth/login', formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    //dispatch(loadUser());
    dispatch(setAlert("You're logged in!", 'success'));
  } catch (err) {
    if (err.response === undefined) {
      console.log('Login fail!');
    } else {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Login User
export const setPassword = (formData) => async (dispatch) => {
  try {
    const res = await api.post('auth/new_password', formData);
    dispatch({
      type: SET_PASSWORD,
      payload: res.data
    });
    console.log('Finiashed');

    //dispatch(loadUser());
    dispatch(setAlert("You're logged in!", 'success'));
  } catch (err) {
    if (err.response === undefined) {
      console.log('Login fail!');
    } else {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This CANNOT be undone!')) {
    try {
      await api.delete('/auth');
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

//Button click to reset
export const updateStep = (step) => async (dispatch) => {
  const body = {
    step: step
  };
  try {
    const res = await api.post('/auth/update_step', body);
    dispatch({
      type: UPDATE_STEP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
