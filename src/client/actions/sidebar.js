import {
  SET_ACTIVE_LINK_ID,
  SET_SIDEBAR_STATUS,
  SET_IS_DARK_MODE,
  SET_MARKETCAP_UNIT,
  SET_IS_SIDEBAR_HIDE,
  SET_ADDED_TO_HOMESCREEN,
  SET_DEFERRED_PROMPT,
  SET_SIDEBAR_MENU
} from './types';

// export function setSidebarMenu(is) {
//   return {
//     type: SET_SIDEBAR_MENU,
//     payload: isSidebarHide
//   };
// }
export function setDeferredPrompt(deferredPrompt) {
  return {
    type: SET_DEFERRED_PROMPT,
    payload: deferredPrompt
  };
}

export function setAddedToHomescreen(addedToHomesceen) {
  return {
    type: SET_ADDED_TO_HOMESCREEN,
    payload: addedToHomesceen
  };
}

export function setIsSidebarHide(isSidebarHide) {
  return {
    type: SET_IS_SIDEBAR_HIDE,
    payload: isSidebarHide
  };
}

export function setMarketcapUnit(mcUnit) {
  return {
    type: SET_MARKETCAP_UNIT,
    payload: mcUnit
  };
}

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

export function setIsDarkMode(isDarkMode) {
  return {
    type: SET_IS_DARK_MODE,
    payload: isDarkMode
  };
}
