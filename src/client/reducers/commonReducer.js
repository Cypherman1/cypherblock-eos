import {SET_TOKEN_PRICE_SEARCH} from '../actions/types';

const INITIAL_STATE = {
  symbol: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN_PRICE_SEARCH:
      return {...state, symbol: action.payload};

    default:
      return state;
  }
}
