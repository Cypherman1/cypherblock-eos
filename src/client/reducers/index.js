import {combineReducers} from 'redux';
import authReducer from './authReducer';
import eosActionsReducer from './eosActionsReducer';

export default combineReducers({
  auth: authReducer,
  eosActions: eosActionsReducer
});
