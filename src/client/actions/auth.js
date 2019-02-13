//import ScatterJS from 'scatter-js/dist/scatter.esm';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import {JsonRpc, Api} from 'eosjs';
// import Eos from 'eosjs';

const network1 = ScatterJS.Network.fromJson({
  blockchain: 'eos',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  host: 'eos.greymass.com',
  port: 443,
  protocol: 'https'
});

ScatterJS.plugins(new ScatterEOS());

import {
  GET_SCATTER,
  SCATTER_FORGET_IDENTITY,
  SCATTER_GET_IDENTITY,
  GET_SCATTER_FAIL,
  GET_SCATTER_SUCCESS
} from './types';

import {network, expireInSeconds} from '../config/config';

export const login = () => (dispatch) => {
  const requiredFields = {accounts: [network1]};
  const eosOptions = {expireInSeconds: expireInSeconds};
  try {
    ScatterJS.connect(
      'Cypherblock',
      {network1}
    ).then((connected) => {
      if (!connected) {
        dispatch({type: GET_SCATTER_FAIL, payload: false});
      } else {
        dispatch({type: GET_SCATTER_SUCCESS, payload: ScatterJS.scatter});
        ScatterJS.login(requiredFields).then((loggedin) => {
          const rpc = new JsonRpc(network1.fullhost());
          const eos = ScatterJS.eos(network1, Api, {rpc, beta3: true});
          dispatch({type: SCATTER_GET_IDENTITY, payload: {account: ScatterJS.account('eos'), eos: eos}});
        });
      }
    });
  } catch (e) {}
};

export const getScatter = () => async (dispatch) => {
  try {
    // let connected = await ScatterJS.scatter.connect('Cypherblock');
    // if (!connected) return false;

    let connected = ScatterJS.connect(
      'Cypherblock',
      {network1}
    );

    if (!connected) return false;

    dispatch({type: GET_SCATTER, payload: ScatterJS.scatter});
  } catch (e) {}
  window.ScatterJS = null;
  // console.log(ScatterJS);
};

export const getIdentity = (scatter) => async (dispatch) => {
  try {
    // let connected = await ScatterJS.scatter.connect('Cypherblock');
    // if (!connected) return false;
    const requiredFields = {accounts: [network]};
    const eosOptions = {expireInSeconds: expireInSeconds};
    // let res = await scatter.getIdentity(requiredFields);
    // if (!res) return false;
    // const eos = scatter.eos(network, Eos, eosOptions);
    // dispatch({
    //   type: SCATTER_GET_IDENTITY,
    //   payload: {account: scatter.identity.accounts.find((x) => x.blockchain === 'eos'), eos: eos}
    // });
    console.log(ScatterJS);
    let loggedin = await ScatterJS.login(requiredFields);

    dispatch({type: SCATTER_GET_IDENTITY, payload: {account: ScatterJS.account('eos')}, eos: null});
  } catch (e) {}
};

export const forgetIdentity = (scatter) => async (dispatch) => {
  try {
    let res = await scatter.forgetIdentity();

    dispatch({type: SCATTER_FORGET_IDENTITY, payload: null});
  } catch (e) {}
};
