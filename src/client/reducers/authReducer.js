import {GET_SCATTER, SCATTER_FORGET_IDENTITY, SCATTER_GET_IDENTITY} from '../actions/types';

const INITIAL_STATE = {
  scatter: null,
  account: null,
  eos: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SCATTER:
      return {...state, scatter: action.payload || false};
    case SCATTER_GET_IDENTITY:
      return {...state, account: action.payload.account, eos: action.payload.eos};
    case SCATTER_FORGET_IDENTITY:
      return action.payload;
    default:
      return state;
  }
}
