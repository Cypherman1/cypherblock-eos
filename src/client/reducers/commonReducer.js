import {
  SET_TOKEN_PRICE_SEARCH,
  SET_TOKEN_BALANCE_UNIT,
  SET_REFETCH_WALLET_FUNC,
  SET_IS_WALLET_REFETCH,
  SET_MC_SEARCH_SYMBOL,
  SET_MC_SORT_BY
} from '../actions/types';

const INITIAL_STATE = {
  symbol: '',
  isEOSUnit: true,
  refetchWallet: null,
  isWalletRefetch: false,
  mc_symbol: '',
  mc_sortby: 'MCAP_DEC'
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
    case SET_MC_SEARCH_SYMBOL:
      return {...state, mc_symbol: action.payload};
    case SET_MC_SORT_BY:
      return {...state, mc_sortby: action.payload};
    default:
      return state;
  }
}
