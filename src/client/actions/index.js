import ScatterJS from 'scatter-js/dist/scatter.esm';

import {GET_SCATTER, SCATTER_FORGET_IDENTITY} from './types';

export const getScatter = () => async (dispatch) => {
  try {
    let connected = await ScatterJS.scatter.connect('blockinsider');
    if (!connected) return false;
    dispatch({type: GET_SCATTER, payload: ScatterJS.scatter});
  } catch (e) {
    console.log(e);
  }
  window.scatter = null;
};

export const getIdentity = (scatter) => async (dispatch) => {
  dispatch({type: SCATTER_FORGET_IDENTITY, payload: null});
};
