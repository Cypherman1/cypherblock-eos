import {TOGGLE_LIVE_ACTIONS, SET_IS_REFETCH, SET_IS_BUTTON_LOADING, SET_IS_MORE} from './types';

export function setLiveActions(islive) {
  return {
    type: TOGGLE_LIVE_ACTIONS,
    payload: islive
  };
}

export function setIsRefetch(isrefetch) {
  return {
    type: SET_IS_REFETCH,
    payload: isrefetch
  };
}

export function setIsButtonLoading(isbuttonloading) {
  return {
    type: SET_IS_BUTTON_LOADING,
    payload: isbuttonloading
  };
}

export function setIsMore(ismore) {
  return {
    type: SET_IS_MORE,
    payload: ismore
  };
}
