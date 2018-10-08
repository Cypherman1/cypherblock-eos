import {combineReducers} from 'redux';
import authReducer from './authReducer';
import eosActionsReducer from './eosActionsReducer';
import sidebarReducer from './sidebarReducer';
import antispamReducer from './antispamReducer';

export default combineReducers({
  auth: authReducer,
  eosActions: eosActionsReducer,
  sidebar: sidebarReducer,
  antispam: antispamReducer
});
