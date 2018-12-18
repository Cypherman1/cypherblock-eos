import {
  SET_TOKEN_PRICE_SEARCH,
  SET_TOKEN_BALANCE_UNIT,
  SET_REFETCH_WALLET_FUNC,
  SET_IS_WALLET_REFETCH,
  SET_MC_SEARCH_SYMBOL,
  SET_MC_SORT_BY
} from './types';

export function setMcSortBy(mc_sortby) {
  return {
    type: SET_MC_SORT_BY,
    payload: mc_sortby
  };
}

export function setMCSearchSymbol(mc_symbol) {
  return {
    type: SET_MC_SEARCH_SYMBOL,
    payload: mc_symbol
  };
}

export function setSearchSymbol(symbol) {
  return {
    type: SET_TOKEN_PRICE_SEARCH,
    payload: symbol
  };
}

export function setTokenBalanceUnitl(isEOSUnit) {
  return {
    type: SET_TOKEN_BALANCE_UNIT,
    payload: isEOSUnit
  };
}

export function setRefetchWalletFunc(refetchWallet) {
  return {
    type: SET_REFETCH_WALLET_FUNC,
    payload: refetchWallet
  };
}

export function setIsWalletRefetch(isWalletRefetch) {
  return {
    type: SET_IS_WALLET_REFETCH,
    payload: isWalletRefetch
  };
}
