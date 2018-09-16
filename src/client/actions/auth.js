import ScatterJS from 'scatter-js/dist/scatter.esm';
import Eos from 'eosjs';

import {GET_SCATTER, SCATTER_FORGET_IDENTITY, SCATTER_GET_IDENTITY} from './types';

import {network, expireInSeconds} from '../config/config';

export const getScatter = () => async (dispatch) => {
  try {
    let connected = await ScatterJS.scatter.connect('blockinsider');
    if (!connected) return false;
    dispatch({type: GET_SCATTER, payload: ScatterJS.scatter});
  } catch (e) {}
  window.scatter = null;
};

export const getIdentity = (scatter) => async (dispatch) => {
  try {
    let connected = await ScatterJS.scatter.connect('blockinsider');
    if (!connected) return false;

    const requiredFields = {accounts: [network]};
    const eosOptions = {expireInSeconds: expireInSeconds};

    let res = await scatter.getIdentity(requiredFields);
    if (!res) return false;

    const eos = scatter.eos(network, Eos, eosOptions);

    dispatch({
      type: SCATTER_GET_IDENTITY,
      payload: {account: scatter.identity.accounts.find((x) => x.blockchain === 'eos'), eos: eos}
    });
  } catch (e) {}
};

export const forgetIdentity = (scatter) => async (dispatch) => {
  dispatch({type: SCATTER_FORGET_IDENTITY, payload: null});
};
