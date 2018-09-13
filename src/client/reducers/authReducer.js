import {GET_SCATTER, SCATTER_FORGET_IDENTITY} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_SCATTER:
      return action.payload || false;
    case SCATTER_FORGET_IDENTITY:
      return action.payload;
    default:
      return state;
  }
}
