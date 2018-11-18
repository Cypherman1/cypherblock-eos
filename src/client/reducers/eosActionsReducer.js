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
} from '../actions/types';

const INNITAL_STATE = {
  islive: false,
  isrefetch: false,
  ismore: true,
  isbuttonloading: false,
  isAntiSpamed: true,
  limit: 50,
  refetch: null,
  isChecking: false,
  isFilterOthers: true,
  isFilterSmartContract: true,
  isFilterResources: true,
  isFilterSendReceiveTokens: true,
  isFilterSendReceiveEOS: true,
  memoTags: [],
  isSettingOpen: false,
  actionsLength: 0
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
    case SET_IS_ANTISPAM:
      return {...state, isAntiSpamed: action.payload};
    case SET_REFETCH_FUNC:
      return {...state, refetch: action.payload};
    case SET_LIMIT_VALUE:
      return {...state, limit: action.payload, actionsLength: action.payload};
    case SET_ACTION_CHECKING:
      return {...state, isChecking: action.payload};
    case SET_FILTER_OTHERS:
      return {...state, isFilterOthers: action.payload};
    case SET_FILTER_RESOURCES:
      return {...state, isFilterResources: action.payload};
    case SET_FILTER_SEND_RECEIVE_EOS:
      return {...state, isFilterSendReceiveEOS: action.payload};
    case SET_FILTER_SEND_RECEIVE_TOKEN:
      return {...state, isFilterSendReceiveTokens: action.payload};
    case SET_FILTER_SMART_CONTRACT:
      return {...state, isFilterSmartContract: action.payload};
    case SET_MEMO_TAG:
      return {...state, memoTags: action.payload};
    case SET_IS_SETTING_OPEN:
      return {...state, isSettingOpen: action.payload};
    case SET_ACTIONS_LENGTH:
      return {...state, actionsLength: action.payload};
    default:
      return state;
  }
}
