import { GET_MENU, SET_ACTIVE_SECTION } from '../actions/types';
let initialState = {
  menu: { sections: [], items: [] },
  dba: { background_color: '' },
  loaded: false,
  active_section_id: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MENU:
      return {
        ...state,
        menu: { ...payload.menu },
        dba: payload.dba,
        loaded: true,
      };
    case SET_ACTIVE_SECTION:
      return {
        ...state,
        active_section_id: payload,
      };
    default:
      return state;
  }
}
