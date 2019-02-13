import {
  GET_SCATTER,
  SCATTER_FORGET_IDENTITY,
  SCATTER_GET_IDENTITY,
  GET_SCATTER_FAIL,
  GET_SCATTER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  connected: false,
  loggedin: false,
  scatter: null,
  account: null,
  eos: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SCATTER_FAIL:
      return {...state, connected: action.payload};
    case GET_SCATTER_SUCCESS:
      return {...state, connected: true, scatter: action.payload || false};
    case GET_SCATTER:
      return {...state, scatter: action.payload || false};
    case SCATTER_GET_IDENTITY:
      return {...state, account: action.payload.account, eos: action.payload.eos, loggedin: true};
    case SCATTER_FORGET_IDENTITY:
      return {...state, scatter: null, account: null, eos: null, loggedin: false};
    default:
      return state;
  }
}
