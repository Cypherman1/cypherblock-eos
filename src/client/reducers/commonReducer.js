import {
  SET_TOKEN_PRICE_SEARCH,
  SET_TOKEN_BALANCE_UNIT,
  SET_REFETCH_WALLET_FUNC,
  SET_IS_WALLET_REFETCH
} from '../actions/types';

const INITIAL_STATE = {
  symbol: '',
  isEOSUnit: true,
  refetchWallet: null,
  isWalletRefetch: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN_PRICE_SEARCH:
      return {...state, symbol: action.payload};
    case SET_TOKEN_BALANCE_UNIT:
      return {...state, isEOSUnit: action.payload};
    case SET_REFETCH_WALLET_FUNC:
      return {...state, refetchWallet: action.payload};
    case SET_IS_WALLET_REFETCH:
      return {...state, isWalletRefetch: action.payload};
    default:
      return state;
  }
}
