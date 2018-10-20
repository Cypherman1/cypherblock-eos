import {SET_TOKEN_PRICE_SEARCH} from './types';

export function setSearchSymbol(symbol) {
  return {
    type: SET_TOKEN_PRICE_SEARCH,
    payload: symbol
  };
}
