import {SET_ACTIVE_LINK_ID, SET_SIDEBAR_STATUS} from './types';

export function setActiveLinkID(activeLinkId) {
  return {
    type: SET_ACTIVE_LINK_ID,
    payload: activeLinkId
  };
}

export function setSidebarStatus(sidebarStatus) {
  return {
    type: SET_SIDEBAR_STATUS,
    payload: sidebarStatus
  };
}
