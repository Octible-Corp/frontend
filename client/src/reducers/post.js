import {
  POST_ERROR,
  DELETE_MENU,
  UPDATE_MENU,
  QR_ACTION,
  UPLOAD_SUBMIT,
  GET_MENUS,
  ADD_MENU,
  DELETE_PHOTO,
  TOGGLE,
  EDIT_MENU,
  ADD_COURSE,
  SAVE_ITEM,
  SAVE_STEP_ONE,
  SAVE_STEP_TWO
} from '../actions/types';

const initialState = {
  posts: [],
  menus: [],
  post: null,
  loading: true,
  saving: false,
  error: {},
  editMenuId: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MENUS:
      return {
        ...state,
        menus: payload,
        loading: false
      };
    case ADD_MENU:
      return {
        ...state,
        menus: [payload, ...state.menus],
        loading: false
      };
    case TOGGLE:
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu._id === payload._id && menu.active === false
            ? { ...menu, active: true }
            : menu._id === payload._id && menu.active === true
            ? { ...menu, active: false }
            : menu
        )
      };
    case UPDATE_MENU:
      return {
        ...state,
        posts: state.menus.map((menu) =>
          menu._id === payload.id
            ? Array.prototype.push.apply(menu.photos, payload.newImg)
            : menu
        ),
        loading: false
      };
    case DELETE_MENU:
      return {
        ...state,
        menus: state.menus.filter((menu) => menu._id !== payload.id),
        loading: false
      };
    case DELETE_PHOTO:
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu.menId === payload.menuId
            ? {
                ...menu,
                photos: menu.photos.filter((photo) => photo !== payload.src)
              }
            : menu
        ),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case QR_ACTION:
      return {
        ...state
      };
    case UPLOAD_SUBMIT:
      return {
        ...state,
        posts: payload
      };
    case EDIT_MENU:
      return {
        ...state,
        editMenuId: action.payload
      };
    case SAVE_STEP_ONE:
      return {
        ...state
      };
    case SAVE_STEP_TWO:
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu._id === action.payload._id ? action.payload : menu
        )
      };
    case SAVE_ITEM:
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu._id === action.payload._id
            ? {
                ...menu,
                sections: [action.payload.add, ...menu.items]
              }
            : menu
        )
      };
    case ADD_COURSE:
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu._id === action.payload._id
            ? {
                ...menu,
                sections: [...menu.sections, action.payload.course]
              }
            : menu
        )
      };
    default:
      return state;
  }
}
