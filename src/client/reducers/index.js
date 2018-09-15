import {combineReducers} from 'redux';
import authReducer from './authReducer';
import eosActionsReducer from './eosActionsReducer';

export default combineReducers({
  scatter: authReducer,
  eosActions: eosActionsReducer
});
