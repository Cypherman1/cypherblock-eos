import {SET_ACTIVE_LINK_ID, SET_SIDEBAR_STATUS} from '../actions/types';

const INNITAL_STATE = {
  activeLinkId: 1,
  sidebarStatus: false
};

export default function(state = INNITAL_STATE, action) {
  switch (action.type) {
    case SET_ACTIVE_LINK_ID:
      return {...state, activeLinkId: action.payload};
    case SET_SIDEBAR_STATUS:
      return {...state, sidebarStatus: action.payload};
    default:
      return state;
  }
}
