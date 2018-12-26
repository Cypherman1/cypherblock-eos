import {
  SET_TOKEN_PRICE_SEARCH,
  SET_TOKEN_BALANCE_UNIT,
  SET_REFETCH_WALLET_FUNC,
  SET_IS_WALLET_REFETCH,
  SET_MC_SEARCH_SYMBOL,
  SET_MC_SORT_BY,
  SET_PERM_INFO_COLLAPSED,
  SET_VOTER_INFO_COLLAPSED,
  SET_MC_PG_OFFSET,
  SET_MC_PG_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
  symbol: '',
  isEOSUnit: true,
  refetchWallet: null,
  isWalletRefetch: false,
  mc_symbol: '',
  mc_sortby: 'MCAP_DEC',
  perm_collapsed: false,
  voter_collapsed: false,
  mcpg_offset: 0,
  mcpg_selected: 0
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
    case SET_PERM_INFO_COLLAPSED:
      return {...state, perm_collapsed: action.payload};
    case SET_VOTER_INFO_COLLAPSED:
      return {...state, voter_collapsed: action.payload};
    case SET_MC_PG_OFFSET:
      return {...state, mcpg_offset: action.payload};
    case SET_MC_PG_SELECTED:
      return {...state, mcpg_selected: action.payload};
    default:
      return state;
  }
}
