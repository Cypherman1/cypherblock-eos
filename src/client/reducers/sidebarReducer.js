import {SET_ACTIVE_LINK_ID, SET_SIDEBAR_STATUS, SET_IS_DARK_MODE, SET_MARKETCAP_UNIT} from '../actions/types';

const INNITAL_STATE = {
  activeLinkId: 1,
  sidebarStatus: false,
  isDarkMode: false,
  mcUnit: 1
};

export default function(state = INNITAL_STATE, action) {
  switch (action.type) {
    case SET_ACTIVE_LINK_ID:
      return {...state, activeLinkId: action.payload};
    case SET_SIDEBAR_STATUS:
      return {...state, sidebarStatus: action.payload};
    case SET_IS_DARK_MODE:
      return {...state, isDarkMode: action.payload};
    case SET_MARKETCAP_UNIT:
      console.log('aaa');
      return {...state, mcUnit: action.payload};
    default:
      return state;
  }
}
