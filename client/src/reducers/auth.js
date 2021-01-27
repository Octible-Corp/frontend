import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  VERIFY_SENT,
  LOGOUT,
  ACCOUNT_DELETED,
  FORGOT_PASSWORD_SENT,
  PASSWORD_RESET,
  NEW_URL,
  SET_PASSWORD,
  UPDATE_STEP
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case VERIFY_SENT:
    case FORGOT_PASSWORD_SENT:
    case PASSWORD_RESET:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case SET_PASSWORD:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case UPDATE_STEP:
      return {
        ...state,
        user: payload
      };
    case NEW_URL:
      return {
        ...state,
        user: payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
