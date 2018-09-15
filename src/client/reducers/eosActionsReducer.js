import {TOGGLE_LIVE_ACTIONS, SET_IS_REFETCH, SET_IS_BUTTON_LOADING, SET_IS_MORE} from '../actions/types';

const INNITAL_STATE = {
  islive: true,
  isrefetch: false,
  ismore: true,
  isbuttonloading: false
};

export default function(state = INNITAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_LIVE_ACTIONS:
      return {...state, islive: action.payload};
    case SET_IS_REFETCH:
      return {...state, isrefetch: action.payload};
    case SET_IS_BUTTON_LOADING:
      return {...state, isbuttonloading: action.payload};
    case SET_IS_MORE:
      return {...state, ismore: action.payload};
    default:
      return state;
  }
}
