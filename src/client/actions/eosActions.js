import {
  TOGGLE_LIVE_ACTIONS,
  SET_IS_REFETCH,
  SET_IS_BUTTON_LOADING,
  SET_IS_MORE,
  SET_IS_ANTISPAM,
  SET_REFETCH_FUNC,
  SET_LIMIT_VALUE,
  SET_ACTION_CHECKING,
  SET_FILTER_OTHERS,
  SET_FILTER_RESOURCES,
  SET_FILTER_SEND_RECEIVE_EOS,
  SET_FILTER_SEND_RECEIVE_TOKEN,
  SET_FILTER_SMART_CONTRACT,
  SET_MEMO_TAG,
  SET_IS_SETTING_OPEN,
  SET_ACTIONS_LENGTH
} from './types';

export function setActionsLength(actionsLength) {
  return {
    type: SET_ACTIONS_LENGTH,
    payload: actionsLength
  };
}

export function setIsSettingOpen(isSettingOpen) {
  return {
    type: SET_IS_SETTING_OPEN,
    payload: isSettingOpen
  };
}

export function setMemoTag(memoTag) {
  return {
    type: SET_MEMO_TAG,
    payload: memoTag
  };
}

export function setFilterOthers(isFilterOthers) {
  return {
    type: SET_FILTER_OTHERS,
    payload: isFilterOthers
  };
}

export function setFilterSmartContract(isFilterSmartContract) {
  return {
    type: SET_FILTER_SMART_CONTRACT,
    payload: isFilterSmartContract
  };
}

export function setFilterResources(isFilterResources) {
  return {
    type: SET_FILTER_RESOURCES,
    payload: isFilterResources
  };
}

export function setFilterSendReceieTokens(isFilterSendReceiveTokens) {
  return {
    type: SET_FILTER_SEND_RECEIVE_TOKEN,
    payload: isFilterSendReceiveTokens
  };
}
export function setFilterSendReceieEOS(isFilterSendReceiveEOS) {
  return {
    type: SET_FILTER_SEND_RECEIVE_EOS,
    payload: isFilterSendReceiveEOS
  };
}
export function setActionChecking(isChecking) {
  return {
    type: SET_ACTION_CHECKING,
    payload: isChecking
  };
}

export function setLiveActions(islive) {
  return {
    type: TOGGLE_LIVE_ACTIONS,
    payload: islive
  };
}
export function setLimitValue(limit) {
  return {
    type: SET_LIMIT_VALUE,
    payload: limit
  };
}

export function setRefetchFunc(refetch) {
  return {
    type: SET_REFETCH_FUNC,
    payload: refetch
  };
}

export function setIsAntiSpam(isAntiSpamed) {
  return {
    type: SET_IS_ANTISPAM,
    payload: isAntiSpamed
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
