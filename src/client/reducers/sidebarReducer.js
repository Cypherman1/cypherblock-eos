import {
  SET_ACTIVE_LINK_ID,
  SET_SIDEBAR_STATUS,
  SET_IS_DARK_MODE,
  SET_MARKETCAP_UNIT,
  SET_IS_SIDEBAR_HIDE,
  SET_ADDED_TO_HOMESCREEN,
  SET_DEFERRED_PROMPT
} from '../actions/types';

const INNITAL_STATE = {
  activeLinkId: 1,
  sidebarStatus: false,
  isDarkMode: false,
  mcUnit: 2,
  isSidebarHide: true,
  addedToHomesceen: true,
  deferredPrompt: null,
  menu: [
    {
      id: 1,
      icon: 'cubes',
      label: 'Block Explorer',
      to: '/',
      tmp1: 'Block Explorer'
    },
    {
      id: 3,
      icon: 'bar-chart',
      label: 'Block Explorer',
      to: '/eosmarketcap',
      tmp1: 'EOS Marketcap'
    }
  ]
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
      return {...state, mcUnit: action.payload};
    case SET_ADDED_TO_HOMESCREEN:
      return {...state, addedToHomesceen: action.payload};
    case SET_DEFERRED_PROMPT:
      return {...state, deferredPrompt: action.payload};
    case SET_IS_SIDEBAR_HIDE:
      return {
        ...state,
        isSidebarHide: action.payload
      };
    default:
      return state;
  }
}
